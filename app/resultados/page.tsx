"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#6366F1", "#EF4444", "#14B8A6"];

const preguntas = [
  { numero: 1, texto: "¿Qué procesos académicos le gustaría que estuvieran completamente digitalizados?" },
  { numero: 2, texto: "¿Le gustaría que el sistema permitiera realizar todo el ciclo de evaluación digitalmente?" },
  { numero: 3, texto: "¿En cuánto tiempo le gustaría poder registrar calificaciones de 30 alumnos?" },
  { numero: 4, texto: "¿Le gustaría poder registrar calificaciones desde cualquier dispositivo?" },
  { numero: 5, texto: "¿Le gustaría que el sistema calculara automáticamente los promedios?" },
  { numero: 6, texto: "¿Qué tipos de cálculos esperaría que realizara automáticamente?" },
  { numero: 7, texto: "¿Qué tipos de reportes le gustaría que generara el sistema?" },
  { numero: 8, texto: "¿En qué formatos preferiría recibir los reportes?" },
  { numero: 9, texto: "¿Cómo preferiría que se registrara la asistencia?" },
  { numero: 10, texto: "¿Le gustaría que el sistema enviara alertas automáticas por inasistencias?" },
  { numero: 11, texto: "¿Qué procesos administrativos le gustaría que estuvieran automatizados?" },
  { numero: 12, texto: "¿Preferiría que el proceso de reinscripción fuera completamente en línea?" },
  { numero: 13, texto: "¿En cuánto tiempo le gustaría obtener una constancia de estudios?" },
  { numero: 14, texto: "¿Necesitaría que los documentos tuvieran validez oficial con firma digital?" },
  { numero: 15, texto: "¿Le gustaría que el sistema estuviera integrado con plataforma de pagos?" },
  { numero: 16, texto: "¿Qué métodos de pago preferiría que aceptara el sistema?" },
  { numero: 17, texto: "¿Le gustaría que el sistema controlara el inventario de materiales?" },
  { numero: 18, texto: "¿Le sería útil recibir alertas sobre materiales faltantes?" },
  { numero: 19, texto: "¿Le gustaría que el sistema gestionara horarios automáticamente?" },
  { numero: 20, texto: "¿Consideraría útil un sistema de evaluación docente integrado?" },
  { numero: 21, texto: "¿En cuánto tiempo le gustaría que se verificaran los documentos?" },
  { numero: 22, texto: "¿Preferiría que el sistema validara documentos automáticamente?" },
  { numero: 23, texto: "¿Le gustaría que el sistema detectara documentos faltantes automáticamente?" },
  { numero: 24, texto: "¿Preferiría que la asignación de grupos fuera automática?" },
  { numero: 25, texto: "¿Le gustaría que el sistema balanceara grupos automáticamente?" },
  { numero: 26, texto: "¿Qué tan rápido esperaría la generación de matrícula?" },
  { numero: 27, texto: "¿Qué tan importante es evitar duplicación de matrículas?" },
  { numero: 28, texto: "¿Cuántos alumnos esperaría poder inscribir en un día?" },
  { numero: 29, texto: "¿Esperaría que el sistema mantuviera velocidad con muchos usuarios?" },
  { numero: 30, texto: "¿Qué estabilidad esperaría en temporada alta de inscripciones?" },
  { numero: 31, texto: "¿Qué tan rápido le gustaría enviar mensajes a grupos?" },
  { numero: 32, texto: "¿Consideraría importante la confirmación de entrega?" },
  { numero: 33, texto: "¿En qué tiempo esperaría respuesta a las consultas?" },
  { numero: 34, texto: "¿Le sería útil ver el estado del mensaje (leído/no leído)?" },
  { numero: 35, texto: "¿Cuántos mensajes esperaría poder gestionar diariamente?" },
  { numero: 36, texto: "¿Le gustaría que el sistema organizara mensajes automáticamente?" },
  { numero: 37, texto: "¿A qué porcentaje de padres esperaría llegar con comunicados?" },
  { numero: 38, texto: "¿Qué canales de comunicación preferiría usar?" },
  { numero: 39, texto: "¿Qué porcentaje de lectura esperaría en las notificaciones?" },
  { numero: 40, texto: "¿Qué tan importante es que las notificaciones sean claras?" },
];

interface ResultData {
  [key: string]: string;
}

export default function ResultadosPage() {
  const [resultados, setResultados] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await fetch("/api/resultados");
        const json = await res.json();
        setResultados(json.data || []);
      } catch (error) {
        console.error("Error al cargar resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

  const getDataForQuestion = (numeroP: number) => {
    const key = `p${numeroP}`;
    const counts: Record<string, number> = {};

    resultados.forEach((r) => {
      const respuesta = r[key];
      if (respuesta) {
        // Agrupar las respuestas "Otro: ..." como "Otro"
        const respuestaKey = respuesta.startsWith("Otro:") ? "Otro" : respuesta;
        counts[respuestaKey] = (counts[respuestaKey] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name: name.length > 25 ? name.substring(0, 25) + "..." : name,
      fullName: name,
      value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Resultados de la Encuesta
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Total de respuestas: {resultados.length}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {resultados.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No hay respuestas aún</h2>
            <p className="text-gray-500">Las gráficas aparecerán cuando se reciban respuestas de la encuesta.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preguntas.map((p) => {
              const data = getDataForQuestion(p.numero);

              return (
                <div key={p.numero} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {p.numero}
                    </span>
                    <p className="text-gray-800 font-medium text-sm">{p.texto}</p>
                  </div>

                  {data.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {data.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, _, props) => [
                              `${value} respuesta(s)`,
                              props.payload.fullName
                            ]}
                          />
                          <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            wrapperStyle={{ fontSize: "12px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      Sin datos
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
