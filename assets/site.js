(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    els.forEach(function(e){ e.classList.add('in'); });
  } else {
    var fired = false;
    var io = new IntersectionObserver(function(entries){
      fired = true;
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
    els.forEach(function(e){ io.observe(e); });
    setTimeout(function(){ if (!fired) els.forEach(function(e){ e.classList.add('in'); }); }, 1500);
  }

  // Hero network: things people love, connecting
  var c = document.getElementById('net');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, pts = [], running = true, mouse = {x: -9999, y: -9999};
  function size(){
    var r = c.getBoundingClientRect(); W = r.width; H = r.height;
    c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(90, Math.max(28, W * H / 16000)));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() < .18 ? 3.2 : 1.4});
    }
  }
  function frame(){
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var link = Math.min(170, Math.max(110, W / 9));
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (!reduce) { p.x += p.vx; p.y += p.vy; }
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < link) {
          var a = (1 - d / link) * .38;
          ctx.strokeStyle = 'rgba(245,197,66,' + a.toFixed(3) + ')';
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      var md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      var glow = md < 160 ? 1 - md / 160 : 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + glow * 2, 0, Math.PI * 2);
      ctx.fillStyle = p.r > 2 ? 'rgba(245,197,66,' + (.75 + glow * .25) + ')' : 'rgba(245,245,247,' + (.45 + glow * .5) + ')';
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  size(); frame();
  window.addEventListener('resize', function(){ size(); if (reduce) frame(); });
  c.parentElement.addEventListener('pointermove', function(e){ var r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  c.parentElement.addEventListener('pointerleave', function(){ mouse.x = mouse.y = -9999; });
  if ('IntersectionObserver' in window && !reduce) {
    new IntersectionObserver(function(en){ var v = en[0].isIntersecting; if (v && !running) { running = true; frame(); } else if (!v) running = false; }).observe(c);
  }
})();
