import cover1 from "@/assets/ebook-1.png";
import cover2 from "@/assets/ebook-2.png";
import cover3 from "@/assets/ebook-3.png";
import cover4 from "@/assets/ebook-4.png";
import cover5 from "@/assets/ebook-5.png";
import cover6 from "@/assets/ebook-6.png";

export const OFFER_PRICE = 22000;
export const MAIN_PRICE = 35000;
export const TOTAL_VALUE = 120000;
export const BONUS_VALUE = 85000;

export const formatARS = (value: number) =>
  `$${value.toLocaleString("es-AR", { maximumFractionDigits: 0 })} ARS`;

export type Ebook = {
  id: string;
  title: string;
  cover: string;
  pages: string;
  value: number;
  isMain?: boolean;
  chapters: string[];
};

export const ebooks: Ebook[] = [
  {
    id: "verdad-agridulce",
    title: "La Verdad Agridulce de Perder Peso",
    cover: cover1,
    pages: "30 páginas",
    value: MAIN_PRICE,
    isMain: true,
    chapters: [
      "Por qué el déficit calórico solo no alcanza",
      "Cortisol, estrés y grasa abdominal",
      "La trampa de los ultraprocesados “fit”",
      "El mito del metabolismo roto",
    ],
  },
  {
    id: "nutricion-consciente",
    title: "Guía de Nutrición Consciente y Matriz de Alimentos",
    cover: cover2,
    pages: "26 páginas",
    value: 17000,
    chapters: [
      "Matriz de alimentos: qué priorizar y qué limitar",
      "Saciedad real vs. antojo emocional",
      "Armado de platos sin pesar comida",
    ],
  },
  {
    id: "entrenamiento-casa",
    title: "Entrenamiento Eficiente en Casa sin Equipo",
    cover: cover3,
    pages: "24 páginas",
    value: 17000,
    chapters: [
      "Rutinas de 20 minutos con peso corporal",
      "Progresiones sin mancuernas",
      "Plan semanal para principiantes",
    ],
  },
  {
    id: "hipertrofia-gimnasio",
    title: "Manual de Acondicionamiento e Hipertrofia en Gimnasio",
    cover: cover4,
    pages: "28 páginas",
    value: 17000,
    chapters: [
      "Volumen, intensidad y frecuencia explicados simple",
      "Rutinas full body y torso/pierna",
      "Técnica en los 8 ejercicios clave",
    ],
  },
  {
    id: "cardio-salud",
    title: "Optimización Cardio y Salud Cardiovascular",
    cover: cover5,
    pages: "22 páginas",
    value: 17000,
    chapters: [
      "Zona 2: la herramienta más subestimada",
      "HIIT sin destruir tu recuperación",
      "Cuánto cardio necesitás realmente",
    ],
  },
  {
    id: "sueno-estres",
    title: "Ajustes de Estilo de Vida: Sueño, Estrés y Hormonas",
    cover: cover6,
    pages: "24 páginas",
    value: 17000,
    chapters: [
      "Protocolo de sueño en 7 pasos",
      "Ansiedad nocturna por comer: qué hacer",
      "Hormonas, insulina y adherencia",
    ],
  },
];

export const painPoints = [
  {
    icon: "scale",
    title: "Contás calorías pero la balanza no baja",
    text: "Comés “poco” y aun así el peso queda clavado hace meses.",
  },
  {
    icon: "moon",
    title: "Ansiedad por comer a la noche",
    text: "Aguantás todo el día y a las 22 hs se te descontrola todo.",
  },
  {
    icon: "dumbbell",
    title: "Te matás en el gimnasio sin ver cambios",
    text: "Entrenás duro, pero el espejo no muestra ninguna diferencia.",
  },
  {
    icon: "repeat",
    title: "Efecto rebote constante",
    text: "Bajás 5 kilos, recuperás 7. Y arrancás de cero otra vez.",
  },
];

export const testimonials = [
  {
    name: "Carolina M.",
    city: "Rosario",
    messages: [
      "Hola! Terminé el primer libro en dos noches 😅",
      "Nunca nadie me había explicado el tema del cortisol así. Dejé de contar calorías y bajé 4 kilos en 6 semanas sin pasar hambre.",
    ],
  },
  {
    name: "Diego F.",
    city: "CABA",
    messages: [
      "Entreno en casa, sin equipo, pensaba que era imposible",
      "La rutina de 20 min la puedo sostener. Tercer mes seguido entrenando, récord personal jaja",
    ],
  },
  {
    name: "Vanina R.",
    city: "Córdoba",
    messages: [
      "Lo que más me cambió fue la parte de sueño y ansiedad",
      "Bajé la ansiedad nocturna casi por completo. Se me aclaró la cabeza, y ahí empezó a bajar el peso.",
    ],
  },
];

export const faqs = [
  {
    q: "¿Cómo recibo los libros?",
    a: "Al instante. Después de aprobar el pago te redirigimos a una página de descarga con los 6 PDF y además te los enviamos por email. Podés leerlos en el celular, la compu o la tablet.",
  },
  {
    q: "¿Sirve si entreno en casa y no tengo equipo?",
    a: "Sí. Uno de los libros está dedicado 100% a entrenamiento en casa sin equipamiento, con progresiones y rutinas de 20 minutos. Si además vas al gimnasio, tenés el manual de hipertrofia incluido.",
  },
  {
    q: "¿Tengo que seguir una dieta estricta?",
    a: "No. El sistema está pensado para que no dependas de dietas de hambre. Trabajamos con matriz de alimentos, saciedad y hábitos sostenibles.",
  },
  {
    q: "¿El pago es único o una suscripción?",
    a: "Es un pago único de $22.000 ARS. No hay cargos recurrentes ni renovaciones.",
  },
  {
    q: "¿Puedo pagar con Mercado Pago en cuotas?",
    a: "Sí. El checkout es de Mercado Pago, así que podés pagar con tarjeta de crédito o débito, dinero en cuenta y las cuotas disponibles según tu banco.",
  },
  {
    q: "¿Y si no me gusta?",
    a: "Tenés 7 días de garantía. Escribinos y te devolvemos el 100% del dinero, sin preguntas incómodas.",
  },
];
