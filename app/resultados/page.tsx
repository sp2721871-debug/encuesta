"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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

  // Obtener resumen general de todas las respuestas
  const getResumenGeneral = () => {
    const allCounts: Record<string, number> = {};

    // Contar todas las respuestas de todas las preguntas
    resultados.forEach((r) => {
      for (let i = 1; i <= 40; i++) {
        const respuesta = r[`p${i}`];
        if (respuesta) {
          const respuestaKey = respuesta.startsWith("Otro:") ? "Otro" : respuesta;
          allCounts[respuestaKey] = (allCounts[respuestaKey] || 0) + 1;
        }
      }
    });

    // Ordenar por cantidad y tomar los top 15
    return Object.entries(allCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, value]) => ({
        name: name.length > 30 ? name.substring(0, 30) + "..." : name,
        fullName: name,
        value,
      }));
  };

  // Obtener la respuesta más votada de cada pregunta
  const getRespuestasMasVotadas = () => {
    const masVotadas: { pregunta: number; respuesta: string; votos: number }[] = [];

    for (let i = 1; i <= 40; i++) {
      const data = getDataForQuestion(i);
      if (data.length > 0) {
        const max = data.reduce((prev, current) =>
          prev.value > current.value ? prev : current
        );
        masVotadas.push({
          pregunta: i,
          respuesta: max.fullName,
          votos: max.value,
        });
      }
    }

    return masVotadas;
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
          <>
            {/* Gráficas individuales */}
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
                              label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
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

            {/* Resumen General */}
            <div className="mt-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-2">Resumen General</h2>
                <p className="text-blue-100">Análisis de todas las respuestas de la encuesta</p>
              </div>

              {/* Top 15 respuestas más votadas */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                  Top 15 Respuestas Más Frecuentes
                </h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getResumenGeneral()} layout="vertical" margin={{ left: 20, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={200} tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(value, _, props) => [
                          `${value} voto(s)`,
                          props.payload.fullName
                        ]}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfica de pastel general */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </span>
                  Distribución General de Respuestas
                </h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getResumenGeneral()}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      >
                        {getResumenGeneral().map((_, index) => (
                          <Cell key={`cell-general-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, _, props) => [
                          `${value} voto(s)`,
                          props.payload.fullName
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabla de respuestas más votadas por pregunta */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </span>
                  Respuesta Ganadora por Pregunta
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Pregunta</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Respuesta Más Votada</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Votos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getRespuestasMasVotadas().map((item, index) => (
                        <tr key={item.pregunta} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-3 px-4">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                              {item.pregunta}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {preguntas.find(p => p.numero === item.pregunta)?.texto}
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              {item.respuesta}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-purple-600">
                            {item.votos}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
