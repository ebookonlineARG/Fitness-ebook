import verdadPdf from "@/assets/verdad-agridulce.pdf.asset.json";
import nutricionPdf from "@/assets/nutricion-consciente.pdf.asset.json";
import casaPdf from "@/assets/entrenamiento-casa.pdf.asset.json";
import gimnasioPdf from "@/assets/hipertrofia-gimnasio.pdf.asset.json";
import cardioPdf from "@/assets/cardio-salud.pdf.asset.json";
import suenoPdf from "@/assets/sueno-estres.pdf.asset.json";

export type EbookFile = { id: string; title: string; url: string; pages: string };

export const ebookFiles: EbookFile[] = [
  {
    id: "verdad-agridulce",
    title: "La Verdad Agridulce de Perder Peso",
    url: verdadPdf.url,
    pages: "16 páginas",
  },
  {
    id: "nutricion-consciente",
    title: "Guía de Nutrición Consciente y Matriz de Alimentos",
    url: nutricionPdf.url,
    pages: "16 páginas",
  },
  {
    id: "entrenamiento-casa",
    title: "Entrenamiento Eficiente en Casa",
    url: casaPdf.url,
    pages: "14 páginas",
  },
  {
    id: "hipertrofia-gimnasio",
    title: "Manual de Acondicionamiento e Hipertrofia en Gimnasio",
    url: gimnasioPdf.url,
    pages: "21 páginas",
  },
  {
    id: "cardio-salud",
    title: "Optimización Cardio y Salud Cardiovascular",
    url: cardioPdf.url,
    pages: "14 páginas",
  },
  {
    id: "sueno-estres",
    title: "Ajustes de Estilo de Vida: Sueño, Estrés y Hormonas",
    url: suenoPdf.url,
    pages: "14 páginas",
  },
];
