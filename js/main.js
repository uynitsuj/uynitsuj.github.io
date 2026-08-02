$(document).ready(function() {
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.pub-toggle').forEach(function (toggle) {
    var list = toggle.nextElementSibling;
    if (!list || !list.classList.contains('pub-list')) return;
    toggle.querySelectorAll('.pub-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggle.querySelectorAll('.pub-toggle-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        list.setAttribute('data-view', btn.getAttribute('data-pub-view'));
      });
    });
  });
});
