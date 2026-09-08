# Repo notes for agents

Jekyll site (GitHub Pages, `uynitsuj.github.io`). Built/deployed by GitHub on push to `master` — there is usually **no local Ruby/Jekyll**, so you generally cannot run a real build locally; verify template changes by reasoning + the live build after push.

## ⚠️ Media optimization — REQUIRED before adding any image/video/GIF

Media is the heaviest thing on this site. The portfolio/home page once eagerly loaded **~215 MB** of media; it was cut to **~21 MB** by re-encoding. **Any new media asset must be optimized the same way before it is committed.** Do not commit raw screen-recordings, phone videos, or GIFs.

Targets: video clips ≤ ~5 MB, project/blog thumbnails ≤ ~0.5 MB. If a new asset is much larger, re-encode it. Always re-encode from the **original source**, never from an already-compressed copy (generational loss), and keep the original in `~/portfolio-media-originals/` before overwriting anything in the repo.

### Display sizes (encode to ~2× these, never the source resolution)
- **Research videos** (`_includes/sections/research.html`) render in a **320px-wide** `.pub-thumb` → encode **≤ 640px wide**.
- **Project clips** (`_includes/sections/projects.html`) render in a ~580px-wide, 235px-tall `.proj-img` → encode **≤ 720px wide**.
- A 1080p source in these thumbnails is ~6× wasted pixels — downscaling is the biggest single win, more than CRF.

### Recipes (ffmpeg)
Re-encode/compress a video (drop audio — all site videos are muted; web-optimize):
```bash
ffmpeg -i in.mp4 -vf "scale='min(640,iw)':-2" \
  -c:v libx264 -crf 26 -preset slow -an -movflags +faststart -pix_fmt yuv420p out.mp4
```
Convert a GIF → muted autoplay MP4 (≈90–99% smaller; use 720 for project clips):
```bash
ffmpeg -i in.gif -vf "scale='min(720,iw)':-2:flags=lanczos" \
  -c:v libx264 -crf 28 -preset slow -an -movflags +faststart -pix_fmt yuv420p out.mp4
```
After encoding, verify: `ffprobe out.mp4` (expect h264, capped width, no audio) and confirm it's smaller than the source. Keep H.264 MP4 only — do **not** add WebM/AV1 dual-sources (doubles stored bytes; H.264 is universal and the repo is already large).

### Conventions
- **Prefer MP4 over GIF everywhere.** GIF is a terrible codec here (e.g. a 32 MB GIF → 0.33 MB MP4).
- **Project grid** (`_data/index/projects.yml`): set `image:` to a `.mp4`/`.webm` and the template auto-emits `<video autoplay loop muted playsinline>`; any other extension renders as `<img>`. CSS for both lives in the `.proj-img img, .proj-img video` rule in `_layouts/home.html`.
- **Blog post thumbnails** (`post.image` front-matter) are rendered inside a plain `<img>` (`_layouts/post_listing.html`), so they **must be a still image** (`.jpg`/`.png`), never an mp4. If the source is a clip, extract a poster frame:
  `ffmpeg -ss 2 -i clip.mp4 -frames:v 1 -vf scale=-2:560 -q:v 4 poster.jpg`
- Keep originals **outside the repo** (e.g. `~/portfolio-media-originals/`); commit only the optimized finals. In-place re-encode + commit keeps the old blob in git history forever, and GitHub Pages soft-caps *published* sites at 1 GB (the repo is already ~950 MB — `recordings/` alone is 605 MB).

### Don't ship a broken deploy
When you delete/rename a media file or convert a GIF, `git add` the **new** files (e.g. `git add img/robots/*.mp4`). `git commit -am` stages tracked deletions/edits but **not** untracked new assets — committing without adding them ships a site that 404s on the new media.

## Interactive viser demos
Four scenes in a 2×2 `.demo-grid`, driven by `_data/index/demos.yml` and rendered by
`_includes/sections/about.html` (shared by `_layouts/home.html` and `_layouts/about.html`;
the CSS is duplicated in both those layouts). To add a scene: drop the `.viser` in
`recordings/`, add a YAML entry with its real `size:`, done.

Tiles embed the client **directly** in `<iframe loading="lazy">`. Because a 2×2 grid puts
all four in the viewport at once, they load together: **~147 MB of `.viser` on scroll**,
far and away the heaviest thing on the site. This is a deliberate choice (click-to-load was
tried and removed); if page weight becomes a problem again, click-to-load is the fix —
swap the iframe for a button and create the iframe in a click handler.

Per-demo camera framing is a raw query fragment in `camera:`. To capture one: open the
scene with `&logCamera`, orbit to the view you want, copy what the console prints.

`kind:` sets the provenance badge under each tile — `real` (green: "Real-world · 1× speed ·
autonomous") or `synthetic` (purple: "Synthetic · rendered"). Set it on every new demo so
viewers can tell a robot rollout from rendered data; `tag:` overrides the badge text.

### ⚠️ `.viser` files are NOT cross-version compatible
Two container formats are in play, and each client reads only its own:

| container | magic bytes | client dir |
|---|---|---|
| legacy gzip | starts `1f 8b` | `viser-client/` (uses `DecompressionStream("gzip")`) |
| zstd, 8-byte size header | `28 b5 2f fd` at offset 8 | `viser-client-1.0.22/` |

Mismatches fail at load with a blank viewer: legacy client on a zstd file logs
`TypeError: The compressed data was not valid: incorrect header check`; the 1.0.22 client
on a gzip file logs `RangeError: Offset is outside the bounds of the DataView`.

So **both clients are hosted**, and every entry in `demos.yml` sets `client:` to the one
matching its file. When you add a recording, check its magic bytes and wire it to the right
client — do not "upgrade" `viser-client/`, that would break the 12 legacy recordings.
Regenerate the client with `viser-build-client --out-dir <dir>` (note: `--out-dir`, not
`--output-dir`). The newer client also supports `initialCameraFov/Near/Far`, which the
legacy one does not; both support `playbackPath`, `initialCameraPosition/LookAt/Up`,
and `logCamera`.

## Known remaining heavy media (optimize opportunistically, not yet done)
- `recordings/*.viser` (~639 MB) — no longer fetched on page load (click-to-load), but
  still the bulk of the published bytes. **Publishable size is now ~893 MB against
  GitHub Pages' 1 GB soft cap**; prune unused recordings before adding more large ones.
  9 of the 14 `.viser` files in `recordings/` (~523 MB) are referenced by no template —
  they may still be deep-linked externally, so check before deleting.

