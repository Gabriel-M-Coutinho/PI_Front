import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import Header from "../components/header";
import Footer from "../components/footer";
import { searchLeads } from "../../api/api";
import type { Estabelecimento } from "../../types/types";

export default function Home() {
  const [nomefantasia, setNomeFantasia] = useState("");
  const [cnae, setCnae] = useState("");
  const [situacaocadastral, setSituacaoCadastral] = useState("");
  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState("");

  const [leads, setLeads] = useState<Estabelecimento[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  });

  // Função para buscar dados (reutilizável)
  const fetchLeads = async (pageNumber: number = 1) => {
    const filters: any = {};

    if (nomefantasia) filters.nomeFantasia = nomefantasia;
    if (cnae) filters.cnae = cnae;
    if (situacaocadastral) filters.situacaoCadastral = situacaocadastral;
    if (pageSize) filters.pageSize = parseInt(pageSize);
    
    // Sempre usa a página especificada
    filters.page = pageNumber;

    try {
      const result = await searchLeads(filters);
      console.log("Resposta completa:", result);
      
      if (result.data.success && result.data.data) {
        setLeads(result.data.data);
        
        // Atualizando informações de paginação
        setPagination({
          page: result.data.page || 1,
          pageSize: result.data.pageSize || 20,
          totalItems: result.data.totalItems || 0,
          totalPages: result.data.totalPages || 0
        });
      } else {
        setLeads([]);
        console.log("Nenhum resultado encontrado");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      setLeads([]);
    }
  };

  const handleFilter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Sempre começa na página 1 quando faz uma nova busca
    await fetchLeads(1);
  };

  // Funções de paginação
  const goToPage = async (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      await fetchLeads(pageNumber);
    }
  };

  const goToNextPage = async () => {
    if (pagination.page < pagination.totalPages) {
      await fetchLeads(pagination.page + 1);
    }
  };

  const goToPrevPage = async () => {
    if (pagination.page > 1) {
      await fetchLeads(pagination.page - 1);
    }
  };

  const goToFirstPage = async () => {
    await fetchLeads(1);
  };

  const goToLastPage = async () => {
    await fetchLeads(pagination.totalPages);
  };



  return (
    <>
    <div className="min-h-screen">
      <Header />

      <form onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Nome Fantasia"
          value={nomefantasia}
          onChange={(e) => setNomeFantasia(e.target.value)}
        />

        <input
          type="text"
          placeholder="CNAE Principal"
          value={cnae}
          onChange={(e) => setCnae(e.target.value)}
        />

        <input
          type="text"
          placeholder="Situação Cadastral (ATIVA, INAPTA, etc)"
          value={situacaocadastral}
          onChange={(e) => setSituacaoCadastral(e.target.value)}
        />

        <input
          type="number"
          placeholder="Página"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />

        <input
          type="number"
          placeholder="Itens por página"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        />

        <button type="submit">Pesquisar</button>
      </form>

      {/* Mapeando os leads */}
      {leads.map((element: Estabelecimento) => (
        <LeadCard
          key={element._id}
          cnpj={`${element.cnpjBase}${element.cnpjOrdem}${element.cnpjDV}`}
          razao_social={element.nomeFantasia}
          telefone={element.telefone1 ? `(${element.ddd1}) ${element.telefone1}` : ''}
          email={element.correioEletronico}
          endereco={`${element.logradouro}, ${element.numero} - ${element.bairro}, ${element.municipio}/${element.uf}`}
          situacao_cadastral={element.situacaoCadastral}
        />
      ))}

      {/* Mensagem quando não há resultados */}
      {leads.length === 0 && (
        <p style={{ textAlign: 'center', margin: '20px 0' }}>Nenhum resultado encontrado</p>
      )}

      {/* Botões de paginação também no final */}
      {pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
          <button onClick={goToFirstPage} disabled={pagination.page === 1}>
            Primeira
          </button>
          <button onClick={goToPrevPage} disabled={pagination.page === 1}>
            Anterior
          </button>
          
          <span style={{ padding: '8px 12px' }}>
            Página {pagination.page} de {pagination.totalPages}
          </span>
          
          <button onClick={goToNextPage} disabled={pagination.page === pagination.totalPages}>
            Próxima
          </button>
          <button onClick={goToLastPage} disabled={pagination.page === pagination.totalPages}>
            Última
          </button>
        </div>
      )}
    </div>
      <Footer />
    </>
  );
}