"use client";
import { useState } from "react";

// Definir las preguntas fuera del componente
const preguntas = [
  { numero: 1, texto: "¿Qué procesos académicos le gustaría que estuvieran completamente digitalizados?", opciones: ["Registro de calificaciones", "Control de asistencia", "Planeación didáctica", "Evaluaciones en línea", "Todos los anteriores"], conOtro: true },
  { numero: 2, texto: "¿Le gustaría que el sistema permitiera realizar todo el ciclo de evaluación digitalmente?", opciones: ["Sí, completamente", "Solo parcialmente", "Procesos básicos", "Prefiero método tradicional"], conOtro: false },
  { numero: 3, texto: "¿En cuánto tiempo le gustaría poder registrar calificaciones de 30 alumnos?", opciones: ["Menos de 10 minutos", "10-20 minutos", "20-30 minutos", "El tiempo no es importante"], conOtro: false },
  { numero: 4, texto: "¿Le gustaría poder registrar calificaciones desde cualquier dispositivo?", opciones: ["Sí, desde cualquiera", "Solo desde computadora", "Solo en la escuela", "No es necesario"], conOtro: false },
  { numero: 5, texto: "¿Le gustaría que el sistema calculara automáticamente los promedios?", opciones: ["Sí, instantáneamente", "Sí, aunque tarde un poco", "Prefiero calcular manualmente", "No es importante"], conOtro: false },
  { numero: 6, texto: "¿Qué tipos de cálculos esperaría que realizara automáticamente?", opciones: ["Promedios parciales", "Promedios finales", "Estadísticas del grupo", "Todas las anteriores"], conOtro: true },
  { numero: 7, texto: "¿Qué tipos de reportes le gustaría que generara el sistema?", opciones: ["Boletas de calificaciones", "Listas de asistencia", "Reportes de aprovechamiento", "Kardex académico", "Todos los anteriores"], conOtro: true },
  { numero: 8, texto: "¿En qué formatos preferiría recibir los reportes?", opciones: ["PDF", "Excel", "Word", "Todos los anteriores"], conOtro: true },
  { numero: 9, texto: "¿Cómo preferiría que se registrara la asistencia?", opciones: ["Lista digital manual", "Código QR", "Reconocimiento facial", "Método tradicional"], conOtro: true },
  { numero: 10, texto: "¿Le gustaría que el sistema enviara alertas automáticas por inasistencias?", opciones: ["Sí, siempre", "Solo casos críticos", "Informes periódicos", "No es necesario"], conOtro: false },
  { numero: 11, texto: "¿Qué procesos administrativos le gustaría que estuvieran automatizados?", opciones: ["Inscripciones", "Generación de horarios", "Control de pagos", "Expedición de documentos", "Todos los anteriores"], conOtro: true },
  { numero: 12, texto: "¿Preferiría que el proceso de reinscripción fuera completamente en línea?", opciones: ["Sí, 100% digital", "Mayormente digital", "Combinado", "Prefiero presencial"], conOtro: false },
  { numero: 13, texto: "¿En cuánto tiempo le gustaría obtener una constancia de estudios?", opciones: ["Menos de 1 minuto", "1-5 minutos", "5-15 minutos", "No es prioritario"], conOtro: false },
  { numero: 14, texto: "¿Necesitaría que los documentos tuvieran validez oficial con firma digital?", opciones: ["Indispensable", "Preferible", "No es necesario", "Prefiero firma física"], conOtro: false },
  { numero: 15, texto: "¿Le gustaría que el sistema estuviera integrado con plataforma de pagos?", opciones: ["Sí, completamente", "Para algunos servicios", "No es prioritario", "Prefiero pago tradicional"], conOtro: false },
  { numero: 16, texto: "¿Qué métodos de pago preferiría que aceptara el sistema?", opciones: ["Tarjeta crédito/débito", "Transferencia bancaria", "Efectivo con registro", "Todos los anteriores"], conOtro: true },
  { numero: 17, texto: "¿Le gustaría que el sistema controlara el inventario de materiales?", opciones: ["Sí, completamente", "Solo materiales importantes", "Básicamente", "No es necesario"], conOtro: false },
  { numero: 18, texto: "¿Le sería útil recibir alertas sobre materiales faltantes?", opciones: ["Muy útil", "Algo útil", "Poco útil", "No necesario"], conOtro: false },
  { numero: 19, texto: "¿Le gustaría que el sistema gestionara horarios automáticamente?", opciones: ["Sí, optimización completa", "Con sugerencias", "Apoyo básico", "Prefiero hacerlo manual"], conOtro: false },
  { numero: 20, texto: "¿Consideraría útil un sistema de evaluación docente integrado?", opciones: ["Muy útil", "Algo útil", "Poco útil", "No necesario"], conOtro: false },
  { numero: 21, texto: "¿En cuánto tiempo le gustaría que se verificaran los documentos?", opciones: ["Menos de 1 minuto", "1-3 minutos", "3-5 minutos", "El necesario"], conOtro: false },
  { numero: 22, texto: "¿Preferiría que el sistema validara documentos automáticamente?", opciones: ["Sí, instantáneamente", "Con revisión posterior", "Validación manual", "Combinado"], conOtro: false },
  { numero: 23, texto: "¿Le gustaría que el sistema detectara documentos faltantes automáticamente?", opciones: ["Sí, inmediatamente", "Al finalizar el proceso", "Con revisión manual", "No es necesario"], conOtro: false },
  { numero: 24, texto: "¿Preferiría que la asignación de grupos fuera automática?", opciones: ["Totalmente automática", "Semi-automática", "Con revisión manual", "Prefiero asignación manual"], conOtro: false },
  { numero: 25, texto: "¿Le gustaría que el sistema balanceara grupos automáticamente?", opciones: ["Por múltiples criterios", "Solo por cantidad", "Con sugerencias", "Prefiero hacerlo manual"], conOtro: false },
  { numero: 26, texto: "¿Qué tan rápido esperaría la generación de matrícula?", opciones: ["Instantáneo", "Menos de 5 segundos", "5-10 segundos", "No es prioritario"], conOtro: false },
  { numero: 27, texto: "¿Qué tan importante es evitar duplicación de matrículas?", opciones: ["Crítico", "Muy importante", "Algo importante", "Se puede verificar manual"], conOtro: false },
  { numero: 28, texto: "¿Cuántos alumnos esperaría poder inscribir en un día?", opciones: ["Más de 100", "50-100", "20-50", "Los necesarios"], conOtro: false },
  { numero: 29, texto: "¿Esperaría que el sistema mantuviera velocidad con muchos usuarios?", opciones: ["Sí, sin degradación", "Pequeña ralentización aceptable", "Entiendo las limitaciones", "No es crítico"], conOtro: false },
  { numero: 30, texto: "¿Qué estabilidad esperaría en temporada alta de inscripciones?", opciones: ["100% estable", "Mínimas interrupciones", "Algunas fallas aceptables", "Proceso escalonado"], conOtro: false },
  { numero: 31, texto: "¿Qué tan rápido le gustaría enviar mensajes a grupos?", opciones: ["Menos de 2 segundos", "2-5 segundos", "5-10 segundos", "El necesario"], conOtro: false },
  { numero: 32, texto: "¿Consideraría importante la confirmación de entrega?", opciones: ["Muy importante", "Algo importante", "Poco importante", "No necesario"], conOtro: false },
  { numero: 33, texto: "¿En qué tiempo esperaría respuesta a las consultas?", opciones: ["Menos de 2 horas", "2-6 horas", "Mismo día", "24-48 horas"], conOtro: false },
  { numero: 34, texto: "¿Le sería útil ver el estado del mensaje (leído/no leído)?", opciones: ["Muy útil", "Algo útil", "Poco útil", "No necesario"], conOtro: false },
  { numero: 35, texto: "¿Cuántos mensajes esperaría poder gestionar diariamente?", opciones: ["Más de 100", "50-100", "20-50", "Los necesarios"], conOtro: false },
  { numero: 36, texto: "¿Le gustaría que el sistema organizara mensajes automáticamente?", opciones: ["Por prioridad y tema", "Solo por prioridad", "Solo por tema", "Orden cronológico"], conOtro: true },
  { numero: 37, texto: "¿A qué porcentaje de padres esperaría llegar con comunicados?", opciones: ["90-100%", "70-90%", "50-70%", "Los interesados"], conOtro: false },
  { numero: 38, texto: "¿Qué canales de comunicación preferiría usar?", opciones: ["App, email y SMS", "App y email", "Solo app del sistema", "Un solo canal"], conOtro: true },
  { numero: 39, texto: "¿Qué porcentaje de lectura esperaría en las notificaciones?", opciones: ["Más del 80%", "60-80%", "40-60%", "Los interesados"], conOtro: false },
  { numero: 40, texto: "¿Qué tan importante es que las notificaciones sean claras?", opciones: ["Crítico", "Muy importante", "Importante", "Básico está bien"], conOtro: false },
];

export default function Home() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [otroTexto, setOtroTexto] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (pregunta: string, valor: string) => {
    setForm((prev) => ({
      ...prev,
      [pregunta]: valor,
    }));
  };

  const handleOtroTexto = (pregunta: string, texto: string) => {
    setOtroTexto((prev) => ({
      ...prev,
      [pregunta]: texto,
    }));
    setForm((prev) => ({
      ...prev,
      [pregunta]: `Otro: ${texto}`,
    }));
  };

  const enviar = async () => {
    const res = await fetch("/api/encuesta", {
      method: "POST",
      body: JSON.stringify(form),
    });

    await res.json();
    setEnviado(true);
  };

  const totalPreguntas = 40;
  const preguntasContestadas = Object.keys(form).length;
  const progreso = Math.round((preguntasContestadas / totalPreguntas) * 100);

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Gracias por contestar la encuesta!
          </h1>
          <p className="text-gray-600 mb-8">
            Tu opinión es muy valiosa y nos ayudará a mejorar el sistema digital escolar.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <p className="text-sm text-gray-500">
              Tus respuestas han sido guardadas correctamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header fijo con progreso */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Encuesta Sistema Digital Escolar
            </h1>
            <span className="text-sm font-medium text-gray-500">
              {preguntasContestadas}/{totalPreguntas}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Introducción */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">¡Tu opinión es importante!</h2>
          <p className="text-blue-100 leading-relaxed">
            Ayúdanos a mejorar el sistema digital escolar respondiendo esta encuesta.
            Tus respuestas nos permitirán crear una herramienta que realmente se adapte a tus necesidades.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-blue-100">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ~10 minutos
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              40 preguntas
            </span>
          </div>
        </div>

        {/* Preguntas */}
        <div className="space-y-4">
          {preguntas.map((p) => (
            <div key={p.numero} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <p className="text-gray-800 font-medium mb-4 flex gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {p.numero}
                </span>
                <span className="pt-1">{p.texto}</span>
              </p>
              <div className="space-y-2 ml-11">
                {p.opciones.map((op, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      form[`p${p.numero}`] === op
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`p${p.numero}`}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      onChange={() => handleChange(`p${p.numero}`, op)}
                      checked={form[`p${p.numero}`] === op}
                    />
                    <span className="text-gray-700">{op}</span>
                  </label>
                ))}
                {p.conOtro && (
                  <div
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border-2 ${
                      form[`p${p.numero}`]?.startsWith("Otro")
                        ? "border-blue-500 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`p${p.numero}`}
                      id={`p${p.numero}_otro`}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      onChange={() => handleChange(`p${p.numero}`, `Otro: ${otroTexto[`p${p.numero}`] || ""}`)}
                      checked={form[`p${p.numero}`]?.startsWith("Otro")}
                    />
                    <label htmlFor={`p${p.numero}_otro`} className="text-gray-700 cursor-pointer">Otro:</label>
                    <input
                      type="text"
                      className="flex-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1 bg-transparent transition-colors"
                      placeholder="Especifique..."
                      value={otroTexto[`p${p.numero}`] || ""}
                      onFocus={() => {
                        if (!form[`p${p.numero}`]?.startsWith("Otro")) {
                          handleChange(`p${p.numero}`, `Otro: ${otroTexto[`p${p.numero}`] || ""}`);
                        }
                      }}
                      onChange={(e) => handleOtroTexto(`p${p.numero}`, e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botón de envío */}
        <div className="mt-10 text-center">
          <button
            onClick={enviar}
            disabled={preguntasContestadas < totalPreguntas}
            className={`px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
              preguntasContestadas >= totalPreguntas
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {preguntasContestadas >= totalPreguntas ? (
              <span className="flex items-center gap-2">
                Enviar Encuesta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            ) : (
              `Faltan ${totalPreguntas - preguntasContestadas} preguntas`
            )}
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Responde todas las preguntas para enviar la encuesta
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm pb-8">
          <p>Gracias por tu participación</p>
        </div>
      </div>
    </div>
  );
}
