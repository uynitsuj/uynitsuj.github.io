// Idle camera sway for the hosted viser clients (viser-client/, viser-client-1.0.22/).
//
// Opt-in: does nothing unless the client URL has `idleSway` in its query string, so
// deep links to the clients are unchanged. The about-page demo tiles pass it.
// `idleSway=<k>` scales the swing (default 1): tight, close-in framings (a camera inside a
// robot cell) need a small k or the sway swings the view onto the cell walls.
//
// Each client's bundled camera-controls has a one-line patch at the top of its
// update(dt) method: `window.__viserIdleSway&&window.__viserIdleSway(this,dt);`
// (search the bundle for __viserIdleSway). This file supplies that hook.
//
// Behaviour: after a short random delay (0.2-0.5 s) the camera drifts on a slow Lissajous path in
// azimuth and elevation around its initial pose (look-at target and distance unchanged).
// Any drag or wheel pauses it; after 4 s without input the camera glides back to the
// initial pose (peak speed = the sway's) and the sway restarts. Every iframe picks its
// own amplitudes, periods, directions and delay, so neighbouring tiles never move in step.
//
// viser-client-1.0.22 renders on demand (update() only runs when something invalidates the
// scene), so timers use wall-clock time and a poll "kicks" a frame by dispatching the
// controls' own `update` event, which the client's CameraControls wrapper turns into an
// invalidate. Once the camera is moving each frame requests the next. The sway freezes
// while the tile is scrolled off-screen, so hidden tiles cost nothing.
//
// Also here (independent of idleSway): `clipAbove=<height>,<hex>` cuts away every mesh of
// material colour <hex> above world height <height> m (z-up, as in the .viser file). Used
// to drop the YAM cell's top 8020 rails, which sit at camera height (1.64-1.68 m) and swing
// into view during the sway. The whole 8020 frame is ONE mesh (#999ead), so a clip plane
// is the only way to remove just its top. The scene and renderer are captured through
// three.js's `__THREE_DEVTOOLS__` "observe" events, which is why this file must load
// before the client bundle.
//
// `hideLines=<hex>[,<hex>...]` hides line objects (e.g. camera-frustum wireframes) whose
// material colour matches, or every line object with `hideLines=all`; the frustum's image
// plane is a mesh and stays.
//
// And `pinDpr[=<ratio>]` pins the render resolution (default min(devicePixelRatio, 2)).
// Both clients use drei's PerformanceMonitor, which drops the pixel ratio whenever the
// frame rate dips, so several tiles on one page go blocky. We wrap the renderer's
// setPixelRatio so every request is replaced by the pinned value.
(function () {
  var query = new URLSearchParams(location.search);
  var spec = query.get('clipAbove'), pin = query.has('pinDpr');
  var hideLines = (query.get('hideLines') || '').toLowerCase().replace(/#/g, '').split(',').filter(Boolean);
  if (!spec && !pin && !hideLines.length) return;
  var dpr = parseFloat(query.get('pinDpr'));
  if (!(dpr > 0)) dpr = Math.min(window.devicePixelRatio || 1, 2);
  var parts = (spec || '').split(','), height = parseFloat(parts[0]), color = (parts[1] || '').toLowerCase().replace('#', '');
  var clip = !!spec && isFinite(height) && !!color;
  var dev = window.__THREE_DEVTOOLS__ = window.__THREE_DEVTOOLS__ || new EventTarget();
  var scenes = [];
  dev.addEventListener('observe', function (e) {
    var o = e.detail;
    if (!o) return;
    if (o.isScene) scenes.push(o);
    if (o.isWebGLRenderer) {
      if (clip) o.localClippingEnabled = true;
      if (pin && !o.__pinnedDpr) {
        var set = o.setPixelRatio.bind(o);
        o.setPixelRatio = function () { set(dpr); };
        o.__pinnedDpr = true;
        set(dpr);
      }
    }
  });
  if (!clip && !hideLines.length) return;
  // three.js only ever copies .normal (x,y,z) and .constant out of a clipping plane, so a
  // plain object works; THREE.Plane itself isn't reachable from outside the bundle.
  // Fragments with normal.p + constant < 0 are clipped: here, world y (file z) > height.
  // viser's root group turns the file's z-up into three's y-up, hence the y normal.
  var plane = { normal: { x: 0, y: -1, z: 0 }, constant: height };
  // Meshes stream in with the recording and materials can be rebuilt: re-check each second.
  setInterval(function () {
    scenes.forEach(function (scene) {
      scene.traverse(function (m) {
        if (hideLines.length && (m.isLine || m.isLineSegments || m.isLine2 || m.isLineSegments2) &&
            (hideLines[0] === 'all' || (m.material && m.material.color && hideLines.indexOf(m.material.color.getHexString()) >= 0))) {
          m.visible = false;
          return;
        }
        if (!clip) return;
        var mat = m.isMesh && m.material;
        if (!mat || !mat.color || mat.color.getHexString() !== color) return;
        if (mat.clippingPlanes && mat.clippingPlanes.length) return;
        mat.clippingPlanes = [plane];
        mat.needsUpdate = true;
      });
    });
  }, 1000);
})();

(function () {
  var query = new URLSearchParams(location.search);
  if (!query.has('idleSway')) return;
  var scale = parseFloat(query.get('idleSway'));
  if (!(scale > 0)) scale = 1;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var r = Math.random, TAU = 2 * Math.PI, IDLE = 4;
  var SPEEDUP = 1.75;                    // sway tempo; the glide home scales with it
  var P = {
    azAmp: scale * (0.18 + 0.12 * r()),    // rad
    polAmp: scale * (0.035 + 0.035 * r()), // rad
    azT: (17 + 7 * r()) / SPEEDUP,       // s  (~9.7-13.7 s)
    polT: (10 + 5 * r()) / SPEEDUP,      // s  (~5.7-8.6 s)
    azDir: r() < 0.5 ? -1 : 1,
    polDir: r() < 0.5 ? -1 : 1
  };
  var speed = P.azAmp * TAU / P.azT;     // sway's peak azimuth speed, reused for the glide home
  function now() { return performance.now() / 1000; }
  var S = { mode: 'wait', until: now() + 0.2 + 0.3 * r(),   // starts within 0.5 s
            t: 0, home: null, drag: false, bound: null,
            from: null, to: null, dur: 0, c: null, visible: true, last: 0 };
  window.__viserIdleSwayState = S;   // for debugging from the console
  function due() { return (S.mode === 'wait' || (S.mode === 'off' && !S.drag)) && now() >= S.until; }
  function kick() { if (S.c && S.visible) S.c.dispatchEvent({ type: 'update' }); }
  setInterval(function () { if (due()) kick(); }, 250);
  // implicit-root IntersectionObserver inside an iframe tracks the top-level viewport
  if (window.IntersectionObserver) new IntersectionObserver(function (es) {
    S.visible = es[0].isIntersecting;
    if (S.visible && (S.mode === 'on' || S.mode === 'return')) kick();
  }).observe(document.documentElement);

  function pose(c) {
    return { az: c.azimuthAngle, polar: c.polarAngle, dist: c.distance, target: c.getTarget(c._target.clone()) };
  }
  function interact(c) {
    if (!S.home) S.home = pose(c);       // user got there first: home is where the camera was
    S.mode = 'off'; S.until = now() + IDLE;
  }
  function bind(c) {
    var el = c._domElement;
    if (!el || S.bound === el) return;
    S.bound = el;
    el.addEventListener('pointerdown', function () { S.drag = true; interact(c); });
    el.addEventListener('pointermove', function () { if (S.drag) interact(c); });
    el.addEventListener('wheel', function () { interact(c); }, { passive: true });
    window.addEventListener('pointerup', function () { if (S.drag) { S.drag = false; interact(c); } });
    window.addEventListener('pointercancel', function () { S.drag = false; });
  }
  function smooth(k) { return k * k * (3 - 2 * k); }

  window.__viserIdleSway = function (c, dt) {
    S.c = c;
    bind(c);
    // Wall-clock step, not the client's dt: the on-demand client renders sporadically, and
    // summing capped dts made its sway run at a fraction of real speed. Cap only real gaps.
    var clock = now(), step = Math.min(0.5, clock - (S.last || clock));
    S.last = clock;
    if (!(dt > 0) || !S.visible) return;
    dt = step;

    if (due() && !S.home) {
      // first start: the camera is already home, so skip the glide and sway right away
      S.home = pose(c);
      S.mode = 'on'; S.t = 0; S.base = { az: S.home.az, polar: S.home.polar };
    }
    if (due()) {
      var f = pose(c), h = S.home;
      var daz = (h.az - f.az) % TAU;
      if (daz > Math.PI) daz -= TAU;
      if (daz < -Math.PI) daz += TAU;
      S.from = f;
      S.to = { az: f.az + daz, polar: h.polar, dist: h.dist, target: h.target };
      // smoothstep peaks at 1.5x its average speed, so 1.5 * distance / speed matches the sway
      S.dur = Math.min(12, Math.max(0.3,
        1.5 * Math.abs(daz) / speed,
        1.5 * Math.abs(h.polar - f.polar) / speed,
        1.5 * Math.abs(Math.log(h.dist / f.dist)) / 0.12,
        1.5 * f.target.distanceTo(h.target) / 0.05));
      S.mode = 'return'; S.t = 0;
    }

    if (S.mode === 'return') {
      S.t += dt;
      var k = Math.min(1, S.t / S.dur), e = smooth(k), a = S.from, b = S.to;
      var t = a.target.clone().lerp(b.target, e);
      c.setTarget(t.x, t.y, t.z, false);
      c.rotateTo(a.az + (b.az - a.az) * e, a.polar + (b.polar - a.polar) * e, false);
      c.dollyTo(a.dist + (b.dist - a.dist) * e, false);
      if (k >= 1) { S.mode = 'on'; S.t = 0; S.base = { az: b.az, polar: b.polar }; }
    }

    if (S.mode === 'on') {
      S.t += dt;
      var ramp = smooth(Math.min(1, S.t / 1.2));   // ease in: no velocity jump at the hand-off
      c.rotateTo(
        S.base.az + ramp * P.azDir * P.azAmp * Math.sin(TAU * S.t / P.azT),
        S.base.polar + ramp * P.polDir * P.polAmp * Math.sin(TAU * S.t / P.polT),
        false);
    }
  };
})();
