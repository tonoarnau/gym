/* Pantalla del ejercicio (v2): muñeco en bucle a un lado y el tiempo grande al otro; barras por serie con sus colores.
   Durante la PREPARACIÓN y los DESCANSOS el muñeco ya muestra el SIGUIENTE ejercicio, para saber qué viene. */
import { DAYS, SETS_PER_EXERCISE } from './datos.js';
import { construirPasos, Reloj } from './temporizador.js';
import { preparar, pitido } from './audio.js';

const SERIE_COLORES = ['var(--serie-1)', 'var(--serie-2)', 'var(--serie-3)', 'var(--serie-4)', 'var(--serie-5)'];
const FASE = { prep: ['PREPÁRATE', 'var(--prep)'], trabajo: ['TRABAJO', 'var(--trabajo)'], descanso: ['DESCANSO', 'var(--descanso)'] };
// Músculo que se enciende en cada ejercicio (se completará con los 21 bucles)
const MUSCULO = { row: 'DORSAL', press: 'HOMBRO', squat: 'CUÁDRICEPS', kbswing: 'GLÚTEO', plank: 'CORE' };

export function montar(raiz, diaClave) {
  const dia = DAYS[diaClave]; const ejercicios = dia.exercises; const pasos = construirPasos(ejercicios);
  raiz.innerHTML = `
    <div class="series">${Array.from({ length: SETS_PER_EXERCISE }, (_, s) => `
      <div class="serie" style="--c:${SERIE_COLORES[s % 5]}"><div class="titulo">SERIE ${s + 1} DE ${SETS_PER_EXERCISE}</div>
        <div class="tramos">${ejercicios.map(() => '<div class="tramo"><i></i></div>').join('')}</div></div>`).join('')}</div>
    <div class="columnas">
      <figure class="muneco"><video muted loop playsinline autoplay></video><div class="proximo">A CONTINUACIÓN</div>
        <figcaption class="etiquetas"><span class="nombre"></span><span class="musculo"></span></figcaption></figure>
      <section class="reloj"><div class="fase"></div>
        <div class="anillo"><svg viewBox="0 0 260 260"><circle class="pista" cx="130" cy="130" r="123"/><circle class="avance" cx="130" cy="130" r="123"/></svg>
          <div class="segundos cifra"></div></div>
        <div class="detalle"></div></section>
    </div>
    <div class="controles"><button class="boton principal" data-a="play">▶ Empezar</button><button class="boton" data-a="saltar">⏭ Saltar</button>
      <button class="boton" data-a="lado">⇄ Cambiar lado</button></div>`;
  const $ = (s) => raiz.querySelector(s);
  const video = $('video'), avance = $('.avance'), C = 2 * Math.PI * 123; avance.style.strokeDasharray = C;

  function pinta(paso, reloj) {
    const [fase, color] = FASE[paso.tipo]; raiz.style.setProperty('--fase', color);
    const mostrar = paso.tipo === 'descanso' ? Math.min(paso.ex + 1, ejercicios.length - 1) + (paso.ex + 1 >= ejercicios.length ? 0 : 0) : paso.ex;
    const sig = paso.tipo === 'descanso' ? (paso.ex + 1) % ejercicios.length : paso.ex;
    const ej = ejercicios[paso.tipo === 'trabajo' ? paso.ex : sig];
    $('.fase').textContent = fase;
    $('.muneco').classList.toggle('siguiente', paso.tipo !== 'trabajo');
    $('.nombre').textContent = ej.name; $('.musculo').textContent = MUSCULO[ej.icon] ?? '';
    const src = `../assets/bucles/${ej.icon}.mp4`;
    if (!video.src.endsWith(src.slice(2))) { video.src = src; video.poster = `../assets/ejercicios/${ej.icon}.jpg`; video.play().catch(() => {}); }
    $('.detalle').innerHTML = paso.tipo === 'prep' ? `Primer ejercicio: <b>${ej.name}</b>`
      : `Serie <b>${paso.serie + 1}</b> de ${SETS_PER_EXERCISE} · ejercicio <b>${(paso.tipo === 'trabajo' ? paso.ex : sig) + 1}</b> de ${ejercicios.length} · ${ej.reps}`;
    tic(Math.ceil(reloj.restante), reloj); void mostrar;
  }
  function tic(s, reloj) {
    const p = reloj.paso; $('.segundos').textContent = s;
    avance.style.strokeDashoffset = C * (1 - (p.duracion - reloj.restante) / p.duracion);
    if (s <= 3 && s >= 1) pitido(550, .08, .1);
    raiz.querySelectorAll('.serie').forEach((el, si) => el.querySelectorAll('.tramo i').forEach((barra, ei) => {
      let f = 0; if (si < p.serie) f = 1; else if (si === p.serie && p.tipo !== 'prep') f = ei < p.ex ? 1 : ei === p.ex ? (p.tipo === 'trabajo' ? 1 - reloj.restante / p.duracion : 1) : 0;
      barra.style.width = `${f * 100}%`; el.classList.toggle('activa', si === p.serie); el.classList.toggle('hecha', si < p.serie);
    }));
  }
  const reloj = new Reloj(pasos, { alTic: tic, alCambio: (p, r) => { pitido(p.tipo === 'trabajo' ? 880 : 440, .18, .18); pinta(p, r); }, alTerminar: () => { $('.fase').textContent = '¡HECHO!'; } });
  pinta(reloj.paso, reloj);
  raiz.addEventListener('click', (e) => {
    const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return;
    if (a === 'play') { preparar(); reloj.alternar(); e.target.textContent = reloj.corriendo ? '⏸ Pausa' : '▶ Seguir'; }
    if (a === 'saltar') reloj.saltar();
    if (a === 'lado') $('.columnas').classList.toggle('invertidas');
  });
  return reloj;
}
