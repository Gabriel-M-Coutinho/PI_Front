import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { establishmentsGraph, ordersGraph } from "../../api/api";
import type { MunicipioData, GraphData } from "../../types/types";
import Cookies from "js-cookie";
import Header from "../components/header";
import Footer from "../components/footer";
import { getProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Graph() {
  const [establishmentsGraphData, setEstablishmentsGraphData] = useState<GraphData>({ categorias: [], valores: [] });
  const [ordersGraphData, setOrdersGraphData] = useState<GraphData>({ categorias: [], valores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const hasEstablishmentsData = establishmentsGraphData.categorias.length > 0 && establishmentsGraphData.valores.length > 0;
  const hasOrderData = ordersGraphData.categorias.length > 0 && ordersGraphData.valores.length > 0;

  const [totalEstabelecimentos, setTotalEstabelecimentos] = useState(0);
   const [totalPedidos, setTotalPedidos] = useState(0);
  const [maiorMunicipio, setMaiorMunicipio] = useState("");

  // Opções de Gráfico dos Estabelecimentos
  const establishmentsOptionsPie = {
    series: establishmentsGraphData.valores,
    chart: { height: 400, type: 'pie' as const, toolbar: { show: true } },
    labels: establishmentsGraphData.categorias,
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

  // Opções de Gráfico dos Pedidos
  const ordersOptionsBar = {
    series: [{ name: "Pedidos", data: ordersGraphData.valores }],
    chart: { height: 400, type: 'bar' as const },
    xaxis: { categories: ordersGraphData.categorias },
    title: {
      text: "Pedidos feitos nas últimas 24h",
      align: 'center' as const,
      style: { fontSize: '20px', fontWeight: 'bold', color: '#333' }
    },
    dataLabels: { enabled: true },
    tooltip: { y: { formatter: (value: number) => `${value} pedidos` } }
  };

  // UseEffect dos Estabelecimentos
  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await establishmentsGraph();
        const data = response.data as MunicipioData[];

        if (Array.isArray(data)) 
        {
          const categorias = data.map(item => item.municipio);
          const valores = data.map(item => Number(item.quantidade) || 0);

          setEstablishmentsGraphData({ categorias, valores });

          const total = valores.reduce((sum, v) => sum + v, 0);
          setTotalEstabelecimentos(total);

          if (data.length > 0) {
            const maior = data.reduce((prev, curr) => {
              const prevQtd = Number(prev.quantidade) || 0;
              const currQtd = Number(curr.quantidade) || 0;
              return currQtd > prevQtd ? curr : prev;
            }, data[0]);
            setMaiorMunicipio(maior.municipio);
          }
      } else {
        setEstablishmentsGraphData({ categorias: [], valores: [] });
      }
    } catch (error: any) {
        setError(true);
        console.error("Erro ao buscar os dados:", error);
        setEstablishmentsGraphData({ categorias: [], valores: [] });
    } finally {
        setLoading(false);
      }
    };

    fetchEstablishments();
  }, []);

  // Opções de Gráfico dos Pedidos
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await ordersGraph();
      const data = response.data as { hora: string; quantidade: number }[];

      console.log(`DATA: ${data}`);

      if (Array.isArray(data)) {
        const categorias = data.map(item => item.hora);
        const valores = data.map(item => Number(item.quantidade) || 0);
        setOrdersGraphData({ categorias, valores });

        const total = valores.reduce((sum, v) => sum + v, 0);
        setTotalPedidos(total);

      } else {
        setOrdersGraphData({ categorias: [], valores: [] });
      }
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar pedidos:", error);
      setOrdersGraphData({ categorias: [], valores: [] });
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

useEffect(() => {
    const checkAuth = async () => {
        const cookie = Cookies.get("token");
        if (cookie) {
            try {
                const user = await getProfile();

                if (user.roles && user.role == 0) {
                    setIsAdmin(true);
                    console.log("Usuário é ADMIN");
                } else {
                    setIsAdmin(false);
                    console.log("Usuário NÃO é admin");
                }
            } catch (err) {
                console.log(err);
                Cookies.remove("token");
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }

    checkAuth();
}, []);

  if (!isAdmin) {
    navigate("/unauthorized");
  }

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
            <span className="text-3xl font-bold text-gray-800">{totalEstabelecimentos || 0}</span>
          </div>
          <div className="bg-gray-300 rounded-lg shadow-md p-6 flex flex-col justify-between">
            <span className="text-sm text-gray-500">Município com mais Estabelecimentos</span>
            <span className="text-2xl font-bold text-gray-800">{maiorMunicipio || "-"}</span>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-gray-300 rounded-lg shadow-md p-6">
          {hasEstablishmentsData ? (
            <Chart options={establishmentsOptionsPie} series={establishmentsOptionsPie.series} type="pie" height={400} />
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-500 text-lg">
              Sem dados
            </div>
          )}
        </div>

        <div className="bg-gray-300 rounded-lg shadow-md p-6 mt-8">
          {hasOrderData ? (
            <Chart options={ordersOptionsBar} series={ordersOptionsBar.series} type="bar" height={400} />
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-500 text-lg">
              Sem pedidos nas últimas 24h
            </div>
          )}
        </div>
      </div>

      
    </div>
    <Footer />
    </>
  );
}
