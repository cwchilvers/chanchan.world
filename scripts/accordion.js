(function () {
  const btn = document.getElementById('moreLinksBtn');
  const panel = document.getElementById('more-links');
  if (!btn || !panel) return;

  function openPanel() {
    panel.hidden = false;
    panel.style.height = '0px';
    const end = panel.scrollHeight;
    panel.offsetHeight;
    panel.style.height = end + 'px';
    btn.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    const start = panel.scrollHeight; 
    panel.style.height = start + 'px';
    panel.offsetHeight;
    panel.style.height = '0px';
    btn.setAttribute('aria-expanded', 'false');
  }

  panel.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'height') return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      panel.style.height = 'auto';
    } else {
      panel.hidden = true;
    }
  });

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closePanel() : openPanel();
  });

  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closePanel();
      btn.focus();
    }
  });
})();