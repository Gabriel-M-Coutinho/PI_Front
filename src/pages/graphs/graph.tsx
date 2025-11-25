import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { graphLeads } from "../../api/api";
import type { MunicipioData, GraphData } from "../../types/types";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Graph() {
  const [graphData, setGraphData] = useState<GraphData>({ categorias: [], valores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const hasData = graphData.categorias.length > 0 && graphData.valores.length > 0;

  const [totalLeads, setTotalLeads] = useState(0);
  const [maiorMunicipio, setMaiorMunicipio] = useState("");

  const optionsPie = {
    series: graphData.valores,
    chart: { height: 400, type: 'pie' as const },
    labels: graphData.categorias,
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 300 }, legend: { position: 'bottom' as const } }
    }],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
    legend: { position: 'bottom' as const, fontSize: '14px' },
    title: {
      text: 'Estabelecimentos por Município',
      align: 'center' as const,
      style: { fontSize: '20px', fontWeight: 'bold', color: '#333' }
    },
    plotOptions: { pie: { donut: { size: '45%' }, dataLabels: { offset: -5 } }},
    dataLabels: { enabled: true, style: { fontSize: '12px', fontWeight: 'bold' }},
    tooltip: { y: { formatter: (value: number) => `${value} estabelecimentos` }}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await graphLeads({});
        const data = response.data as MunicipioData[];

        if (Array.isArray(data)) 
        {
          const categorias = data.map(item => item.municipio);
          const valores = data.map(item => Number(item.quantidade) || 0);

          setGraphData({ categorias, valores });

          const total = valores.reduce((sum, v) => sum + v, 0);
          setTotalLeads(total);

          if (data.length > 0) {
            const maior = data.reduce((prev, curr) => {
              const prevQtd = Number(prev.quantidade) || 0;
              const currQtd = Number(curr.quantidade) || 0;
              return currQtd > prevQtd ? curr : prev;
            }, data[0]);
            setMaiorMunicipio(maior.municipio);
          }
      } else {
        setGraphData({ categorias: [], valores: [] });
      }
    } catch (error: any) {
        setError(true);
        console.error("Erro ao buscar os dados:", error);
        setGraphData({ categorias: [], valores: [] });
    } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-white text-lg">Carregando gráfico...</div>
        <Footer />
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen text-gray-900 flex flex-col">
      <Header />
      
      <div className="max-w-5xl w-full mx-auto px-4 py-8">
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col justify-between">
            <span className="text-sm text-gray-500">Total de Leads</span>
            <span className="text-3xl font-bold text-gray-800">{totalLeads || 0}</span>
          </div>
          <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col justify-between">
            <span className="text-sm text-gray-500">Município com mais Estabelecimentos</span>
            <span className="text-2xl font-bold text-gray-800">{maiorMunicipio || "-"}</span>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-gray-300 rounded-lg shadow-md p-6">
          {hasData ? (
            <Chart options={optionsPie} series={optionsPie.series} type="pie" height={400} />
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-500 text-lg">
              Sem dados
            </div>
          )}
        </div>
      </div>

      
    </div>
    <Footer />
    </>
  );
}
