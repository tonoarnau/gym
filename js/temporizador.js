/* Temporizador de la sesión (v2): la lista de pasos y un único reloj.
   NUEVO en la v2: un paso de PREPARACIÓN de 15 s antes del primer ejercicio (en la v1, el play entraba directo). */
import { PREP_SECONDS, WORK_SECONDS, REST_SECONDS, SETS_PER_EXERCISE } from './datos.js';

export function construirPasos(ejercicios) {
  const pasos = [{ tipo: 'prep', ex: 0, serie: 0, duracion: PREP_SECONDS }];
  for (let serie = 0; serie < SETS_PER_EXERCISE; serie++) {
    ejercicios.forEach((_, ex) => {
      pasos.push({ tipo: 'trabajo', ex, serie, duracion: WORK_SECONDS });
      const ultimo = serie === SETS_PER_EXERCISE - 1 && ex === ejercicios.length - 1;
      if (!ultimo) pasos.push({ tipo: 'descanso', ex, serie, duracion: REST_SECONDS });
    });
  }
  return pasos;
}

/* Reloj: avanza paso a paso y avisa en cada tic. Se basa en el reloj real (performance.now), no en contar intervalos:
   así no se desvía aunque el navegador frene los temporizadores. */
export class Reloj {
  constructor(pasos, { alTic, alCambio, alTerminar }) {
    Object.assign(this, { pasos, alTic, alCambio, alTerminar });
    this.i = 0; this.restante = pasos[0].duracion; this.corriendo = false;
  }
  empezar() { if (this.corriendo) return; this.corriendo = true; this._ultimo = performance.now(); this._bucle(); this.alCambio?.(this.paso, this); }
  pausar() { this.corriendo = false; cancelAnimationFrame(this._raf); }
  alternar() { this.corriendo ? this.pausar() : this.empezar(); }
  saltar() { this._siguiente(); }
  get paso() { return this.pasos[this.i]; }
  _bucle() {
    const ahora = performance.now(); const dt = (ahora - this._ultimo) / 1000; this._ultimo = ahora;
    const antes = Math.ceil(this.restante); this.restante -= dt;
    if (this.restante <= 0) { this._siguiente(); }
    else if (Math.ceil(this.restante) !== antes) this.alTic?.(Math.ceil(this.restante), this);
    if (this.corriendo) this._raf = requestAnimationFrame(() => this._bucle());
  }
  _siguiente() {
    if (this.i >= this.pasos.length - 1) { this.pausar(); this.alTerminar?.(); return; }
    this.i++; this.restante = this.paso.duracion; this.alCambio?.(this.paso, this);
  }
}
