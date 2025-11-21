import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { graphLeads } from "../../api/api";
import type { MunicipioData, GraphData } from "../../types/types";
import styles from './graph.module.css';
import Header from "../components/header";
import Footer from "../components/footer";

export default function Graph()
{
    const [graphData, setGraphData] = useState<GraphData>({
        categorias: [],
        valores: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Configurações do Gráfico
    const optionsPie = {
        series: graphData.valores,
        chart: {
            height: 400,
            type: 'pie' as const, // gráfico de pizza
        },
        labels: graphData.categorias,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom' as const
                }
            }
        }],
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
        legend: {
            position: 'bottom' as const,
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif'
        },
        title: {
            text: 'Estabelecimentos por Município',
            align: 'center' as const,
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '45%'
                },
                dataLabels: {
                    offset: -5
                }
            }
        },
         dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontWeight: 'bold'
            },
            dropShadow: {
                enabled: false
            }
        },
        tooltip: {
            y: {
                formatter: function (value: number){
                    return `${value} estabelecimentos`
                }
            }
        }
    };

    // Buscar dados da API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await graphLeads({});
                const data = response.data as MunicipioData[];

                console.log('Dados recebidos: ', data);

                const categorias = data.map(item => item.municipio);
                const valores = data.map(item => item.quantidade);

                setGraphData({
                    categorias,
                    valores
                });
            }
            catch(erro: any) 
            {
                console.error(`Erro ao buscar os dados: ${erro}`);
                setError(erro.message || 'Erro ao carregar dados');
            }
            finally 
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Tela de carregamento
    if (loading) 
    {
        return (
            <div className={styles.loading}>
                <div>Carregando gráfico...</div>
            </div>
        );
    }

    // Em caso de inexistência de dados
    if (!graphData.categorias.length || !graphData.valores.length) {
        return (
            <div className={styles.emptyData}>
                <div>Nenhum dado disponível para exibição</div>
            </div>
        );
    }

    // Retorno padrão
    return (
        <>
        <div className="min-h-screen">
            <Header />
            <div className={styles.container}>
                <div className={styles.box}>
                    <Chart options={optionsPie} series={optionsPie.series} type="pie" height={400} />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}