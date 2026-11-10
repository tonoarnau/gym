/* Pitidos sin archivos (como en la v1): Web Audio, que el navegador solo deja arrancar tras un toque del usuario. */
let ctx = null;
export function preparar() { ctx ??= new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); }
export function pitido(freq = 880, dur = .12, vol = .16) {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
  o.frequency.value = freq; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur);
}
