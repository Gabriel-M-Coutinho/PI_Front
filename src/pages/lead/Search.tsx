import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";
import Header from "../components/header";
import Footer from "../components/footer";
import { getInfoFields, getProfile, searchLeads } from "../../api/api";
import type { Estabelecimento } from "../../types/types";
import Home from "../home/Home";
import { toast } from "react-toastify";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function Search() {
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
  const [quantity,setQuantity] = useState(0)

  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState("");
  const [searchError, setSearchError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<any>({});
  const [quantidadeLeadsModal, setQuantidadeLeadsModal] = useState(false);

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

 const handleBuscaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const quantity = formData.get("quantidade-leads")?.toString().trim();
  filters.quantity = quantity ? quantity : 0;

  try {
    setLoading(true);

    const result = await searchLeads(filters);

    console.log("API:", result);
    setQuantidadeLeadsModal(false);

    if (!result.data.success) {
      // ⬅️ Aqui trata erro vindo do backend mesmo sendo status 200
      toast.error(result.data.message || "Erro na busca");
      setLeads([]);
      setSearchError(true);
      return;
    }

    // Sucesso:
    setLeads(result.data.data || []);
    setSearchError(false);
    setPagination({
      page: 1,
      pageSize: 20,
      totalItems: result.data.data.length,
      totalPages: Math.ceil(result.data.data.length / 20)
    });

    toast.success("Busca Realizada com Sucesso");

  } catch (error: any) {
    console.error("Erro ao buscar:", error);

    // Mensagem de erro HTTP/axios
    toast.error(error?.response?.data?.message || "Erro ao buscar leads");

    setLeads([]);
    setSearchError(true);

  } finally {
    setLoading(false);
  }
};
  // Função para chamar a API
  const fetchLeads = async (pageNumber: number = 1) => {
    //const filters: any = {};
    if (nomefantasia) filters.nomeFantasia = nomefantasia;
    if (cnae) filters.cnae = cnae;
    if (situacaocadastral) filters.situacaoCadastral = situacaocadastral;

    if (uf) filters.uf = uf;
    if (municipio) filters.municipio = municipio;
    if (bairro) filters.bairro = bairro;
    if (cep) filters.cep = cep;
    if (ddd) filters.ddd = ddd;

    if (capitalSocial) filters.capitalSocial = capitalSocial;
    if (dataAbertura) filters.dataAbertura = dataAbertura; // dd/mm/yyyy ou dd/mm/yyyy:dd/mm/yyyy
    if (matrizFilial) filters.matrizFilial = matrizFilial;

    if (pageSize) filters.pageSize = parseInt(pageSize);
    filters.page = pageNumber;

    setFilters(filters);
    setQuantidadeLeadsModal(true);
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLeads(1);
  };

  // Paginação
  const goToNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const goToPrevPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const goToFirstPage = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const goToLastPage = () => {
    setPagination(prev => ({ ...prev, page: prev.totalPages }));
  };

  const paginatedLeads = leads.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );



  return (
    <>
      <div className="min-h-screen bg-gradient-to-l from-primary to-[#090814]">
        <Header />
<       h4 className="flex flex-row justify-center mt-10">Busque os Leads:</h4>

        {/* FORM DE FILTROS */}
        <form onSubmit={handleFilter} className="color-indigo flex flex-col gap-8 border border-gray-600 m-10 p-14 pt-10 pb-10 rounded-lg">
            <h2 className="flex flex-row justify-center">Filtros</h2>

        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
          <input type="text" className="w-full block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="Nome Fantasia" value={nomefantasia}
            onChange={(e) => setNomeFantasia(e.target.value)} />

          {/*<input type="text" className="w-full block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="CNAE Principal" value={cnae}
            onChange={(e) => setCnae(e.target.value)} />*/}

            <select className="text-gray-400 border-white-400 w-[60%] focus:outline-none" value={cnae} onChange={(e) => setCnae(e.target.value)}>
              <option value="">Cnae</option>
              {allCnaes.map((singleCnae:any) => {
                return (
                  <option value={singleCnae._id}>{`${singleCnae._id} | ${singleCnae.descricao}`}</option>
                )
              })}
            </select>

            <input type="text" className="w-full block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="CEP (apenas números)" maxLength={8} value={cep}
            onChange={(e) => setCep(e.target.value)} />
          </div>  
          
        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
            <select className="text-gray-400 border-white-400 w-[20%] focus:outline-none" value={uf} onChange={(e) => setUf(e.target.value)}>
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

          <select className="text-gray-400 border-white-400 w-[40%] focus:outline-none" value={situacaocadastral} onChange={(e) => setSituacaoCadastral(e.target.value)}>
              <option value="">Situação Cadastral</option>
              <option value="ativa">Ativa</option>
              <option value="inapta">Inapta</option>
              <option value="nula">Nula</option>
              <option value="baixada">Baixada</option>
              <option value="suspensa">Suspensa</option>
            </select>

          <input type="text" className="w-[40%] block rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="Município" value={municipio}
            onChange={(e) => setMunicipio(e.target.value)} />

          <select className="text-gray-400 border-white-400 w-[60%] focus:outline-none" value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
              <option value="">Municipio</option>
              {allMunicipios.map((singleMunicipio:any) => {
                return (
                  <option value={singleMunicipio._id}>{singleMunicipio.descricao}</option>
                )
              })}
            </select>

          <input type="text" className="w-[55%] block rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="Bairro" value={bairro}
            onChange={(e) => setBairro(e.target.value)} />          
            </div>

        <div className="max-w-[100%] text-lg justify-start gap-20 flex">
          <input className="w-[70%] block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" type="text" placeholder="Capital Social (ex: 10000)" value={capitalSocial}
            onChange={(e) => setCapitalSocial(e.target.value)} />

          <input className="w-[70%] block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" type="text" placeholder="Data de Abertura (dd/mm/yyyy)" value={dataAbertura}
            onChange={(e) => setDataAbertura(e.target.value)} />
        </div>

        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
          <select className="text-gray-400 border-white-400 w-full focus:outline-none" value={matrizFilial} onChange={(e) => setMatrizFilial(e.target.value)}>
            <option value="">Matriz / Filial</option>
            <option value="matriz">Matriz</option>
            <option value="filial">Filial</option>
          </select>

          <input type="text" className="block rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" placeholder="DDD" value={ddd}
            onChange={(e) => setDdd(e.target.value)} />

          <button id="botao-principal" className="mx-auto block py-2 px-1 rounded max-w-[10%] justify-center flex w-full" type="submit">Buscar</button>
          </div>
        </form>

        <div className="bg-white shadow-md rounded-lg overflow-hidden m-10 p-6 max-w-4xl mx-auto">
          {/* Cabeçalho da "tabela" */}
          <div className="flex bg-gray-100 p-3 rounded-t-lg font-bold text-gray-700">
            <span className="flex-1 text-center">Razão Social</span>
            <span className="flex-1 text-center">CNPJ</span>
          </div>

          {/* Lista de cards */}
          <div className="flex flex-col divide-y divide-gray-200">
            {paginatedLeads.map((element: Estabelecimento) => (
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
        {searchError == true && (
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

            <span className="text-gray-300 text-base px-2 py-1">{pagination.page} de {pagination.totalPages}</span>
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
        {quantidadeLeadsModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-1">
              <div className="bg-[#25263b] text-gray-100 px-16 py-12 rounded-lg w-[550px] max-w-[80%] shadow-xl">
                  <h2 className="text-xl font-semibold mb-4">Busca</h2>
                  <p className="mt-8">Quantos Leads gostaria de buscar?</p>
                  <div className="flex">
                    <p className="flex">(
                    <span>1 lead = </span>
                    <CurrencyDollarIcon className="w-6 color-coin ml-1"/>
                    <span>1</span>
                    )</p>
                  </div>
                  <form action="" onSubmit={handleBuscaSubmit}>
                      <div className="flex my-12 justify-between">
                          <label htmlFor="quantidade-leads" className="flex items-center text-lg font-semibold">Quantidade de Leads:</label>
                          <input type="number" name="quantidade-leads" min="0" className="px-4 rounded-md bg-white/5 border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" />
                      </div>
                      <div>
                      <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setQuantidadeLeadsModal(false)} className="rounded-lg py-2 px-5 rounded bg-gray-600 hover:bg-gray-500">
                          Cancelar
                      </button>
                      <button id="botao-principal" type="submit" className="py-2 px-5 rounded bg-blue-600 hover:bg-blue-500">
                          Confirmar
                      </button>
                      </div>
                  </div>
                  </form>                  
              </div>
          </div>
        )}
        {loading && (
            <p className="fixed z-2 bottom-[5px] right-[5px]">Buscando Leads <span className="loading loading-spinner loading-lg ml-2"></span></p>
        )}
      </div>
        
      <Footer />
    </>
  );
}
