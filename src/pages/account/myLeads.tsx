import { useEffect, useState } from "react";
import LeadCard from "../lead/LeadCard";
import Header from "../components/header";
import Footer from "../components/footer";
import { getInfoFields, getProfile, searchPurchasedLeads } from "../../api/api";
import type { Estabelecimento } from "../../types/types";
import { toast } from "react-toastify";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function SearchPurchased() {
  const [nomefantasia, setNomeFantasia] = useState("");
  const [cnae, setCnae] = useState("");
  const [situacaocadastral, setSituacaoCadastral] = useState("");
  const [uf, setUf] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [ddd, setDdd] = useState("");
  const [capitalSocial, setCapitalSocial] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [matrizFilial, setMatrizFilial] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const [leads, setLeads] = useState<Estabelecimento[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  });

  const [allCnaes, setAllCnaes] = useState([]);
  const [allMunicipios, setAllMunicipios] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await getInfoFields();
      setAllCnaes(result.data.cnaes);
      setAllMunicipios(result.data.municipios);
    };
    load();
  }, []);

  // Função para buscar TODOS os resultados (para download)
  const fetchAllLeadsForDownload = async (format: 'csv' | 'json') => {
    setDownloading(true);
    
    const filters: any = {};
    
    // Coleta todos os filtros atuais
    if (nomefantasia) filters.nomeFantasia = nomefantasia;
    if (cnae) filters.cnae = cnae;
    if (situacaocadastral) filters.situacaoCadastral = situacaocadastral;
    if (uf) filters.uf = uf;
    if (municipio) filters.municipio = municipio;
    if (bairro) filters.bairro = bairro;
    if (cep) filters.cep = cep;
    if (ddd) filters.ddd = ddd;
    if (capitalSocial) filters.capitalSocial = capitalSocial;
    if (dataAbertura) filters.dataAbertura = dataAbertura;
    if (matrizFilial) filters.matrizFilial = matrizFilial;

    // Para download, vamos buscar em lotes
    const allLeads: Estabelecimento[] = [];
    let currentPage = 1;
    const pageSize = 100; // Buscar 100 por vez para não sobrecarregar

    try {
      while (true) {
        filters.page = currentPage;
        filters.pageSize = pageSize;

        const result = await searchPurchasedLeads(filters);
        
        if (!result.data.success || !result.data.data || result.data.data.length === 0) {
          break;
        }

        allLeads.push(...result.data.data);
        
        // Se não tem mais páginas, para o loop
        if (currentPage >= (result.data.totalPages || 1)) {
          break;
        }
        
        currentPage++;
        
        // Pequeno delay para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (allLeads.length === 0) {
        toast.error("Nenhum dado encontrado para download");
        return;
      }

      // Gerar o arquivo
      if (format === 'csv') {
        downloadCSV(allLeads);
      } else {
        downloadJSON(allLeads);
      }

      toast.success(`Download realizado! ${allLeads.length} leads exportados.`);
      setShowDownloadModal(false);

    } catch (error: any) {
      console.error("Erro no download:", error);
      toast.error("Erro ao realizar download");
    } finally {
      setDownloading(false);
    }
  };

  // Função para gerar CSV
  const downloadCSV = (data: Estabelecimento[]) => {
    // Cabeçalhos do CSV
    const headers = [
      'CNPJ',
      'Nome Fantasia',
      'Razão Social',
      'Telefone',
      'Email',
      'Endereço',
      'Situação Cadastral',
      'CNAE Principal',
      'Município',
      'UF',
      'CEP',
      'Data Abertura',
      'Capital Social'
    ];

    // Converter dados para linhas CSV
    const csvRows = data.map(lead => [
      `"${lead.cnpjBase}${lead.cnpjOrdem}${lead.cnpjDV}"`,
      `"${lead.nomeFantasia || ''}"`,
      `"${lead.telefone1 ? `(${lead.ddd1}) ${lead.telefone1}` : ''}"`,
      `"${lead.correioEletronico || ''}"`,
      `"${lead.logradouro || ''}, ${lead.numero || ''} - ${lead.bairro || ''}, ${lead.municipio || ''}/${lead.uf || ''}"`,
      `"${lead.situacaoCadastral || ''}"`,
      `"${lead.cnaePrincipal || ''}"`,
      `"${lead.municipio || ''}"`,
      `"${lead.uf || ''}"`,
      `"${lead.cep || ''}"`,
      `"${lead.dataInicioAtividade ? new Date(lead.dataInicioAtividade).toLocaleDateString('pt-BR') : ''}"`,

    ].join(','));

    // Combinar cabeçalhos e dados
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // Criar e baixar arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para gerar JSON
  const downloadJSON = (data: Estabelecimento[]) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função principal de busca
  const handleBuscaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filters: any = {};
    
    // Coleta todos os filtros
    if (nomefantasia) filters.nomeFantasia = nomefantasia;
    if (cnae) filters.cnae = cnae;
    if (situacaocadastral) filters.situacaoCadastral = situacaocadastral;
    if (uf) filters.uf = uf;
    if (municipio) filters.municipio = municipio;
    if (bairro) filters.bairro = bairro;
    if (cep) filters.cep = cep;
    if (ddd) filters.ddd = ddd;
    if (capitalSocial) filters.capitalSocial = capitalSocial;
    if (dataAbertura) filters.dataAbertura = dataAbertura;
    if (matrizFilial) filters.matrizFilial = matrizFilial;

    // Paginação
    filters.page = pagination.page;
    filters.pageSize = pagination.pageSize;

    try {
      setLoading(true);

      // Usa o endpoint search-purchased
      const result = await searchPurchasedLeads(filters);

      console.log("API Purchased:", result);

      if (!result.data.success) {
        toast.error(result.data.message || "Erro na busca");
        setLeads([]);
        setSearchError(true);
        return;
      }

      // Sucesso - atualiza os dados com a resposta da API
      setLeads(result.data.data || []);
      setSearchError(false);
      
      // Atualiza a paginação com os dados da API
      setPagination(prev => ({
        ...prev,
        totalItems: result.data.totalItems || 0,
        totalPages: result.data.totalPages || 0,
        page: result.data.page || 1,
        pageSize: result.data.pageSize || 20
      }));

      toast.success(`Busca realizada com sucesso! Encontrados ${result.data.data?.length || 0} leads dos seus CNPJs comprados.`);

    } catch (error: any) {
      console.error("Erro ao buscar:", error);
      toast.error(error?.response?.data?.message || "Erro ao buscar leads comprados");
      setLeads([]);
      setSearchError(true);
    } finally {
      setLoading(false);
    }
  };

  // Função para mudar de página
  const fetchPage = async (pageNumber: number) => {
    setPagination(prev => ({ ...prev, page: pageNumber }));
    
    // Recria os filtros atuais
    const filters: any = {};
    if (nomefantasia) filters.nomeFantasia = nomefantasia;
    if (cnae) filters.cnae = cnae;
    if (situacaocadastral) filters.situacaoCadastral = situacaocadastral;
    if (uf) filters.uf = uf;
    if (municipio) filters.municipio = municipio;
    if (bairro) filters.bairro = bairro;
    if (cep) filters.cep = cep;
    if (ddd) filters.ddd = ddd;
    if (capitalSocial) filters.capitalSocial = capitalSocial;
    if (dataAbertura) filters.dataAbertura = dataAbertura;
    if (matrizFilial) filters.matrizFilial = matrizFilial;

    filters.page = pageNumber;
    filters.pageSize = pagination.pageSize;

    try {
      setLoading(true);
      const result = await searchPurchasedLeads(filters);
      
      if (result.data.success) {
        setLeads(result.data.data || []);
        setPagination(prev => ({
          ...prev,
          totalItems: result.data.totalItems || 0,
          totalPages: result.data.totalPages || 0
        }));
      }
    } catch (error) {
      console.error("Erro ao mudar página:", error);
      toast.error("Erro ao carregar página");
    } finally {
      setLoading(false);
    }
  };

  // Paginação - agora chama a API
  const goToNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchPage(pagination.page + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.page > 1) {
      fetchPage(pagination.page - 1);
    }
  };

  const goToFirstPage = () => {
    fetchPage(1);
  };

  const goToLastPage = () => {
    fetchPage(pagination.totalPages);
  };

  // Botão de download no header da tabela
  const DownloadButton = () => (
    <button 
      onClick={() => setShowDownloadModal(true)}
      disabled={leads.length === 0 || downloading}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      {downloading ? 'Baixando...' : 'Exportar'}
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-l from-primary to-[#090814]">
        <Header />
        <h4 className="flex flex-row justify-center mt-10">Busque nos seus Leads Comprados:</h4>

        {/* FORM DE FILTROS */}
        <form onSubmit={handleBuscaSubmit} className="color-indigo flex flex-col gap-8 border border-gray-600 m-10 p-14 pt-10 pb-10 rounded-lg">
          <h2 className="flex flex-row justify-center">Filtros</h2>

          <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
            <input 
              type="text" 
              className="w-full block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              placeholder="Nome Fantasia" 
              value={nomefantasia}
              onChange={(e) => setNomeFantasia(e.target.value)} 
            />

            <select className="text-gray-400 border-white-400 w-[60%] focus:outline-none" value={cnae} onChange={(e) => setCnae(e.target.value)}>
              <option value="">Cnae</option>
              {allCnaes.map((singleCnae:any) => {
                return (
                  <option value={singleCnae._id}>{`${singleCnae._id} | ${singleCnae.descricao}`}</option>
                )
              })}
            </select>

            <input 
              type="text" 
              className="w-full block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              placeholder="CEP (apenas números)" 
              maxLength={8} 
              value={cep}
              onChange={(e) => setCep(e.target.value)} 
            />
          </div>  
          
          <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
            <select 
              className="text-gray-400 border-white-400 w-[20%] focus:outline-none" 
              value={uf} 
              onChange={(e) => setUf(e.target.value)}
            >
              <option value="">UF</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>

            <select 
              className="text-gray-400 border-white-400 w-[40%] focus:outline-none" 
              value={situacaocadastral} 
              onChange={(e) => setSituacaoCadastral(e.target.value)}
            >
              <option value="">Situação Cadastral</option>
              <option value="ativa">Ativa</option>
              <option value="inapta">Inapta</option>
              <option value="nula">Nula</option>
              <option value="baixada">Baixada</option>
              <option value="suspensa">Suspensa</option>
            </select>

            <select className="text-gray-400 border-white-400 w-[60%] focus:outline-none" value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
              <option value="">Municipio</option>
              {allMunicipios.map((singleMunicipio:any) => {
                return (
                  <option value={singleMunicipio._id}>{singleMunicipio.descricao}</option>
                )
              })}
            </select>

            <input 
              type="text" 
              className="w-[55%] block rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              placeholder="Bairro" 
              value={bairro}
              onChange={(e) => setBairro(e.target.value)} 
            />          
          </div>

          <div className="max-w-[100%] text-lg justify-start gap-20 flex">
            <input 
              className="w-[70%] block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              type="text" 
              placeholder="Capital Social (ex: 10000)" 
              value={capitalSocial}
              onChange={(e) => setCapitalSocial(e.target.value)} 
            />

            <input 
              className="w-[70%] block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              type="text" 
              placeholder="Data de Abertura (dd/mm/yyyy)" 
              value={dataAbertura}
              onChange={(e) => setDataAbertura(e.target.value)} 
            />
          </div>

          <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
            <select 
              className="text-gray-400 border-white-400 w-full focus:outline-none" 
              value={matrizFilial} 
              onChange={(e) => setMatrizFilial(e.target.value)}
            >
              <option value="">Matriz / Filial</option>
              <option value="matriz">Matriz</option>
              <option value="filial">Filial</option>
            </select>

            <input 
              type="text" 
              className="block rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" 
              placeholder="DDD" 
              value={ddd}
              onChange={(e) => setDdd(e.target.value)} 
            />

            <button id="botao-principal" className="mx-auto block py-2 px-1 rounded max-w-[10%] justify-center flex w-full" type="submit">
              Buscar
            </button>
          </div>
        </form>

        {/* RESULTADOS */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden m-10 p-6 max-w-4xl mx-auto">
          {/* Cabeçalho da "tabela" com botão de download */}
          <div className="flex bg-gray-100 p-3 rounded-t-lg font-bold text-gray-700 items-center justify-between">
            <div className="flex-1 text-center">Razão Social</div>
            <div className="flex-1 text-center">CNPJ</div>
            <div className="w-32">
              <DownloadButton />
            </div>
          </div>

          {/* Lista de cards */}
          <div className="flex flex-col divide-y divide-gray-200">
            {leads.map((element: Estabelecimento) => (
              <LeadCard
                key={element._id}
                cnpj={`${element.cnpjBase}${element.cnpjOrdem}${element.cnpjDV}`}
                razao_social={element.nomeFantasia ? element.nomeFantasia : "Não informado"}
                telefone={element.telefone1 ? `(${element.ddd1}) ${element.telefone1}` : ""}
                email={element.correioEletronico}
                endereco={`${element.logradouro}, ${element.numero} - ${element.bairro}, ${element.municipio}/${element.uf}`}
                situacao_cadastral={element.situacaoCadastral}
              />
            ))}
          </div>
        </div>
                  
        {/* Nenhum resultado */}
        {searchError && (
          <p style={{ textAlign: "center", margin: "20px 0", color: "#F55151" }}>Nenhum resultado encontrado</p>
        )}

        {/* PAGINAÇÃO */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mb-5 flex-wrap">
            <button onClick={goToFirstPage} disabled={pagination.page === 1} className="px-5 py-2 text-sm rounded bg-gray-800 
            text-gray-200 disabled:bg-gray-900 disabled:text-gray-500 hover:bg-gray-700 transition">
              Início
            </button>

            <button onClick={goToPrevPage} disabled={pagination.page === 1} className="px-3 py-2 text-sm rounded bg-gray-800 
            text-gray-100 disabled:bg-gray-900 disabled:text-gray-500 hover:bg-gray-700 transition">
              Anterior
            </button>

            <span className="text-gray-300 text-base px-2 py-1">
              {pagination.page} de {pagination.totalPages} ({pagination.totalItems} total)
            </span>

            <button onClick={goToNextPage} disabled={pagination.page === pagination.totalPages} className="px-3 py-2 text-sm rounded 
            bg-gray-800 text-gray-200 disabled:bg-gray-900 disabled:text-gray-500 hover:bg-gray-700 transition">
              Próximo
            </button>

            <button onClick={goToLastPage} disabled={pagination.page === pagination.totalPages} className="px-3 py-2 text-sm rounded bg-gray-800 
            text-gray-200 disabled:bg-gray-900 disabled:text-gray-500 hover:bg-gray-700 transition">
              Último
            </button>
          </div>
        )}

        {/* MODAL DE DOWNLOAD */}
        {showDownloadModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#25263b] text-gray-100 px-16 py-12 rounded-lg w-[550px] max-w-[80%] shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Exportar Leads</h2>
              <p className="mb-6">Escolha o formato para exportar todos os resultados da busca atual:</p>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => fetchAllLeadsForDownload('csv')}
                  disabled={downloading}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  CSV
                </button>
                <button 
                  onClick={() => fetchAllLeadsForDownload('json')}
                  disabled={downloading}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  JSON
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowDownloadModal(false)}
                  disabled={downloading}
                  className="px-5 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>

              {downloading && (
                <div className="mt-4 text-center">
                  <p>Buscando e preparando dados para download...</p>
                  <span className="loading loading-spinner loading-lg ml-2"></span>
                </div>
              )}
            </div>
          </div>
        )}

        {loading && (
          <p className="fixed z-2 bottom-[5px] right-[5px]">
            Buscando Leads <span className="loading loading-spinner loading-lg ml-2"></span>
          </p>
        )}
      </div>
        
      <Footer />
    </>
  );
}