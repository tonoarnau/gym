/* Datos de la app (extraídos de la v1 con herramientas/extraer_de_v1.py): tiempos, series y los días con sus ejercicios. */
export const PREP_SECONDS = 15;   // v2: cuenta atrás antes del primer ejercicio
export const WORK_SECONDS = 40;
export const REST_SECONDS = 15;
export const SETS_PER_EXERCISE = 3;
export const DAYS = {
    A: {
        shortLabel: "DÍA A",
        label: "Tren superior + Core",
        tagline: "Kettlebell y mancuernas",
        color: "#5B8CFF",
        exercises: [
            {
                id: "kb-swing",
                name: "Kettlebell swing",
                reps: "3 × 15",
                tip: "Bisagra de cadera explosiva. Empuja las caderas hacia atrás y balancea la pesa hasta la altura del pecho con el impulso de las piernas, no de los brazos.",
                icon: "kbswing",
            },
            {
                id: "squat-pesa",
                name: "Sentadilla con pesa",
                reps: "3 × 12",
                tip: "Pies al ancho de hombros y pecho arriba. Baja como si te sentaras en una silla y empuja el suelo con los talones al subir.",
                icon: "squat",
            },
            {
                id: "press-mancuerna",
                name: "Press con mancuerna",
                reps: "3 × 10",
                tip: "De pie o sentado, empuja las mancuernas desde los hombros hacia arriba sin arquear la espalda baja.",
                icon: "press",
            },
            {
                id: "remo-mancuerna",
                name: "Remo con mancuerna",
                reps: "3 × 10",
                tip: "Inclina el torso manteniendo la espalda recta y tira de la mancuerna hacia la cadera apretando el omóplato.",
                icon: "row",
            },
            {
                id: "plancha",
                name: "Plancha frontal",
                reps: "3 × 30–40 s",
                tip: "Cuerpo en línea recta de la cabeza a los talones. Aprieta abdomen y glúteos para que la cadera no caiga.",
                icon: "plank",
            },
        ],
    },
    B: {
        shortLabel: "DÍA B",
        label: "Pierna, espalda y core",
        tagline: "Mancuernas y peso corporal",
        color: "#FFB020",
        exercises: [
            {
                id: "peso-muerto",
                name: "Peso muerto",
                reps: "3 × 12",
                tip: "Bisagra de cadera con la espalda neutra. Baja el peso pegado a las piernas y empuja el suelo con fuerza al subir.",
                icon: "deadlift",
            },
            {
                id: "zancadas",
                name: "Zancadas",
                reps: "3 × 12",
                tip: "Da un paso largo, baja la rodilla trasera casi al suelo y empuja con el talón delantero para volver arriba.",
                icon: "lunge",
            },
            {
                id: "curl-press",
                name: "Curl bíceps + press hombro",
                reps: "3 × 10",
                tip: "Sube las mancuernas en curl hasta los hombros y, sin bajarlas del todo, empújalas hacia arriba en press.",
                icon: "curlpress",
            },
            {
                id: "russian-twist",
                name: "Russian twist",
                reps: "3 × 15",
                tip: "Sentado con el tronco inclinado y los pies elevados, gira el torso de lado a lado tocando el suelo.",
                icon: "twist",
            },
        ],
    },
    C: {
        shortLabel: "DÍA C",
        label: "Aeróbico TV",
        tagline: "Cardio libre por tu cuenta (bici, correr, baile...)",
        color: "#9B6BFF",
        freeform: true,
        nominalSeconds: 20 * 60,
        exercises: [],
    },
    D: {
        shortLabel: "DÍA D",
        label: "Brazos: bíceps y tríceps",
        tagline: "Mancuernas y kettlebell",
        color: "#2FD4B8",
        exercises: [
            {
                id: "curl-mancuernas",
                name: "Curl de bíceps con mancuernas",
                reps: "3 × 12",
                tip: "De pie, codos pegados al cuerpo, sube las mancuernas contrayendo el bíceps sin balancear el torso ni mover los hombros.",
                icon: "curl-db",
            },
            {
                id: "triceps-kettlebell",
                name: "Extensión de tríceps con kettlebell",
                reps: "3 × 12",
                tip: "Sujeta la kettlebell con ambas manos por el asa por encima de la cabeza, baja detrás de la nuca flexionando solo los codos y extiende arriba sin abrirlos.",
                icon: "triceps-kb",
            },
            {
                id: "curl-martillo",
                name: "Curl martillo con mancuernas",
                reps: "3 × 12",
                tip: "Igual que el curl de bíceps, pero con las palmas mirándose entre sí durante todo el recorrido, para trabajar también el antebrazo.",
                icon: "hammer-curl",
            },
            {
                id: "flexiones-diamante",
                name: "Flexiones de tríceps (agarre cerrado)",
                reps: "3 × 12",
                tip: "Manos juntas bajo el pecho formando un diamante con los dedos, baja controlado pegando los codos al cuerpo y empuja arriba.",
                icon: "diamond-pushup",
            },
        ],
    },
    E: {
        shortLabel: "DÍA E",
        label: "Pecho",
        tagline: "Mancuernas y peso corporal",
        color: "#FF6B6B",
        exercises: [
            {
                id: "floor-press",
                name: "Press de pecho en el suelo",
                reps: "3 × 12",
                tip: "Tumbado boca arriba con las rodillas flexionadas, empuja las mancuernas hacia arriba desde el pecho hasta extender los brazos, sin arquear la zona lumbar.",
                icon: "floor-press",
            },
            {
                id: "floor-flyes",
                name: "Aperturas de pecho en el suelo",
                reps: "3 × 12",
                tip: "Tumbado, brazos ligeramente flexionados, abre los brazos hacia los lados bajando las mancuernas hasta sentir el estiramiento en el pecho y vuelve a juntarlas arriba.",
                icon: "floor-flyes",
            },
            {
                id: "flexiones-anchas",
                name: "Flexiones de pecho (agarre ancho)",
                reps: "3 × 12",
                tip: "Manos más separadas que los hombros, baja el pecho controlado hacia el suelo y empuja arriba manteniendo el cuerpo recto.",
                icon: "wide-pushup",
            },
            {
                id: "pullover",
                name: "Pullover con mancuerna",
                reps: "3 × 12",
                tip: "Tumbado, sujeta una mancuerna con ambas manos por encima del pecho y llévala hacia atrás sobre la cabeza sin despegar la zona lumbar del suelo, luego vuelve al punto inicial.",
                icon: "pullover",
            },
        ],
    },
    F: {
        shortLabel: "DÍA F",
        label: "Hombros",
        tagline: "Mancuernas y kettlebell",
        color: "#FF4FA3",
        exercises: [
            {
                id: "elevacion-lateral",
                name: "Elevaciones laterales con mancuernas",
                reps: "3 × 12",
                tip: "De pie con las mancuernas a los lados, sube los brazos hasta la altura de los hombros con un ligero codo flexionado, sin impulso ni balanceo del torso.",
                icon: "lateral-raise",
            },
            {
                id: "press-arnold",
                name: "Press Arnold con mancuernas",
                reps: "3 × 12",
                tip: "Comienza con las mancuernas frente a los hombros y palmas hacia ti; al empujar hacia arriba, rota las muñecas hasta que las palmas miren al frente en la posición final.",
                icon: "arnold-press",
            },
            {
                id: "pajaros",
                name: "Pájaros (elevación posterior)",
                reps: "3 × 12",
                tip: "Inclina el torso hacia delante con las rodillas ligeramente flexionadas y abre los brazos hacia los lados apretando los omóplatos, sin usar impulso.",
                icon: "rear-delt-fly",
            },
            {
                id: "kb-halo",
                name: "Kettlebell halo",
                reps: "3 × 12",
                tip: "Sujeta la kettlebell \"boca abajo\" por los cuernos cerca del pecho y dibuja círculos completos alrededor de la cabeza, alternando el sentido cada serie.",
                icon: "kb-halo",
            },
        ],
    },
};
/* ---------------------------------------------------------
   ILUSTRACIONES — recortes reales del mosaico cartoon/superhéroe
   futurista generado a partir de nuestro prompt, uno por
   ejercicio, incrustados como data URI (sin dependencias
   externas ni enlaces rotos).
--------------------------------------------------------- */
