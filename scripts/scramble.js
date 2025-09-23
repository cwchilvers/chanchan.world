(() => {
  const pool = {
    o: ['o','0','O','°','ø','ö','õ','ō','○','●'],
    l: ['l','1','|','¦','ł']
  };

  const el = document.querySelector('.scramble');
  if (!el) return;

  const text = el.textContent;
  el.textContent = '';
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'glyph';
    s.dataset.base = ch;
    s.textContent = ch;
    el.appendChild(s);
  });

  const glyphs = [...el.querySelectorAll('.glyph')];

  const pick = (arr, current) => {
    if (!arr || arr.length === 0) return current;
    let next = current;
    while (arr.length > 1 && next === current) {
      next = arr[(Math.random() * arr.length) | 0];
    }
    return next;
  };

  const schedule = node => {
    const base = node.dataset.base.toLowerCase();
    const choices = pool[base];
    if (!choices) return; 

    const jitter = 100;
    setTimeout(() => {
      node.textContent = pick(choices, node.textContent);
      schedule(node);
    }, jitter);
  };

  glyphs.forEach(schedule);


  el.addEventListener('mouseenter', () => {
    glyphs.forEach(g => {
      const base = g.dataset.base.toLowerCase();
      if (!pool[base]) return;
      for (let i = 0; i < 6; i++) {
        setTimeout(() => g.textContent = pick(pool[base], g.textContent), i * 40);
      }
    });
  });
})();