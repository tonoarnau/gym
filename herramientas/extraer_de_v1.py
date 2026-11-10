#!/usr/bin/env python3
"""Saca de la v1 (index.html, todo en un archivo) lo que la v2 tiene por separado:
  · las 21 ilustraciones en base64 → assets/ejercicios/<icono>.jpg
  · los datos de los días (DAYS, tiempos y series) → js/datos.js (módulo ES)
Uso: python3 herramientas/extraer_de_v1.py   (desde la raíz del repo; lee el index.html de la rama main)"""
import base64, re, subprocess
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
v1 = subprocess.run(['git', 'show', 'main:index.html'], cwd=RAIZ, capture_output=True, text=True, check=True).stdout
imgs = re.findall(r'^\s*"?([\w-]+)"?: "data:image/jpeg;base64,([^"]+)"', v1, re.M)
for nombre, b64 in imgs:
    (RAIZ / 'assets/ejercicios' / f'{nombre}.jpg').write_bytes(base64.b64decode(b64))
print(len(imgs), 'ilustraciones')
a = v1.index('const WORK_SECONDS'); b = v1.index('const EXERCISE_IMAGES')
datos = v1[a:b].rstrip()
datos = re.sub(r'^const (WORK_SECONDS|REST_SECONDS|SETS_PER_EXERCISE|DAYS)', r'export const \1', datos, flags=re.M)
cab = '/* Datos de la app (extraídos de la v1 con herramientas/extraer_de_v1.py): tiempos, series y los días con sus ejercicios. */\n'
(RAIZ / 'js/datos.js').write_text(cab + 'export const PREP_SECONDS = 15;   // v2: cuenta atrás antes del primer ejercicio\n' + datos + '\n')
print('js/datos.js', len(datos), 'caracteres')
