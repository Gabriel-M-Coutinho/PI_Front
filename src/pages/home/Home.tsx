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

  const [uf, setUf] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [ddd, setDdd] = useState("");
  const [capitalSocial, setCapitalSocial] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [matrizFilial, setMatrizFilial] = useState("");

  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState("");

  const [leads, setLeads] = useState<Estabelecimento[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  });

  // Função para chamar a API
  const fetchLeads = async (pageNumber: number = 1) => {
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
    if (dataAbertura) filters.dataAbertura = dataAbertura; // dd/mm/yyyy ou dd/mm/yyyy:dd/mm/yyyy
    if (matrizFilial) filters.matrizFilial = matrizFilial;

    if (pageSize) filters.pageSize = parseInt(pageSize);
    filters.page = pageNumber;

    try {
      const result = await searchLeads(filters);
      console.log("API:", result);

      if (result.data.success && result.data.data) {
        setLeads(result.data.data);

        setPagination({
          page: result.data.page || 1,
          pageSize: result.data.pageSize || 20,
          totalItems: result.data.totalItems || 0,
          totalPages: result.data.totalPages || 0
        });
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Erro ao buscar:", error);
      setLeads([]);
    }
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchLeads(1);
  };

  // Paginação
  const goToPage = async (num: number) => {
    if (num >= 1 && num <= pagination.totalPages) {
      await fetchLeads(num);
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

  const goToFirstPage = async () => fetchLeads(1);
  const goToLastPage = async () => fetchLeads(pagination.totalPages);

  return (
    <>
      <div className="min-h-screen">
        <Header />

        {/* LOGO */}
        <div className="flex mt-10 flex-row justify-center items-center gap-2">
          <div className="w-16 md:w-24">
            <svg
              width="auto"
              height="auto"
              viewBox="0 0 110 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M101.75 33.8H81.3416C83.5227 38.9782 82.5653 45.21 78.4197 49.431L55 73.2765V81.4C55 86.0392 58.6936 89.8 63.25 89.8H101.75C106.306 89.8 110 86.0392 110 81.4V42.2C110 37.5607 106.306 33.8 101.75 33.8ZM82.5 66C80.2227 66 78.375 64.1187 78.375 61.8C78.375 59.4795 80.2227 57.6 82.5 57.6C84.7773 57.6 86.625 59.4795 86.625 61.8C86.625 64.1187 84.7773 66 82.5 66ZM74.5302 33.3275L44.4641 2.7147C41.1709 -0.638299 35.8308 -0.638299 32.5377 2.7147L2.46984 33.3275C-0.823281 36.6805 -0.823281 42.1177 2.46984 45.4707L32.5359 76.0852C35.8291 79.4382 41.1692 79.4382 44.4623 76.0852L74.5302 45.4725C77.8233 42.1177 77.8233 36.6805 74.5302 33.3275ZM16.5 43.6C14.2227 43.6 12.375 41.7187 12.375 39.4C12.375 37.0795 14.2227 35.2 16.5 35.2C18.7773 35.2 20.625 37.0795 20.625 39.4C20.625 41.7187 18.7773 43.6 16.5 43.6ZM38.5 66C36.2227 66 34.375 64.1187 34.375 61.8C34.375 59.4795 36.2227 57.6 38.5 57.6C40.7773 57.6 42.625 59.4795 42.625 61.8C42.625 64.1187 40.7773 66 38.5 66ZM38.5 43.6C36.2227 43.6 34.375 41.7187 34.375 39.4C34.375 37.0795 36.2227 35.2 38.5 35.2C40.7773 35.2 42.625 37.0795 42.625 39.4C42.625 41.7187 40.7773 43.6 38.5 43.6ZM38.5 21.2C36.2227 21.2 34.375 19.3187 34.375 17C34.375 14.6795 36.2227 12.8 38.5 12.8C40.7773 12.8 42.625 14.6795 42.625 17C42.625 19.3187 40.7773 21.2 38.5 21.2ZM60.5 43.6C58.2227 43.6 56.375 41.7187 56.375 39.4C56.375 37.0795 58.2227 35.2 60.5 35.2C62.7773 35.2 64.625 37.0795 64.625 39.4C64.625 41.7187 62.7773 43.6 60.5 43.6Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 id="logo-texto" className="mt-6">LeadSearch</h3>
        </div>
        <h1 className="flex flex-row justify-center">Busque os Leads:</h1>

        {/* FORM DE FILTROS */}
        <form onSubmit={handleFilter} className="flex flex-col gap-8 border border-gray-600 m-10 p-14 pt-10 pb-10 rounded-lg">

        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
          <input type="text" className="w-full" placeholder="Nome Fantasia" value={nomefantasia}
            onChange={(e) => setNomeFantasia(e.target.value)} />

          <input type="text" className="w-full" placeholder="CNAE Principal" value={cnae}
            onChange={(e) => setCnae(e.target.value)} />

            <input type="text" className="w-full" placeholder="CEP (sem máscara)" value={cep}
            onChange={(e) => setCep(e.target.value)} />
          </div>  
          
        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
            <select className="text-gray-400 border-white-400 w-[20%] focus:outline-none" value={uf} onChange={(e) => setUf(e.target.value)}>
              <option value="">UF (SP, RJ,...)</option>
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
              <option value="inativa">Inativa</option>
              <option value="nula">Nula</option>
              <option value="baixada">Baixada</option>
              <option value="suspensa">Suspensa</option>
            </select>

          <input type="text" placeholder="Município" value={municipio}
            onChange={(e) => setMunicipio(e.target.value)} />

          <input type="text" className="w-[30%]" placeholder="Bairro" value={bairro}
            onChange={(e) => setBairro(e.target.value)} />          
            </div>

        <div className="max-w-[100%] text-lg justify-start gap-20 flex">
          <input className="w-[70%]" type="text" placeholder="Capital Social (ex: 10000:50000)" value={capitalSocial}
            onChange={(e) => setCapitalSocial(e.target.value)} />

          <input className="w-[70%]" type="text" placeholder="Data Abertura (dd/mm/yyyy)" value={dataAbertura}
            onChange={(e) => setDataAbertura(e.target.value)} />
        </div>

        <div className="max-w-[100%] text-lg justify-start gap-20 w-full flex">
          <select className="text-gray-400 border-white-400 w-full focus:outline-none" value={matrizFilial} onChange={(e) => setMatrizFilial(e.target.value)}>
            <option value="">Matriz / Filial</option>
            <option value="matriz">Matriz</option>
            <option value="filial">Filial</option>
          </select>

          <input type="text" placeholder="DDD" value={ddd}
            onChange={(e) => setDdd(e.target.value)} />

          <button id="botao-principal" className="mx-auto block py-2 px-1 rounded max-w-[10%] justify-center flex w-full" type="submit">Buscar</button>
          </div>

        </form>
                  {/* LISTA DE LEADS */}
                  {leads.map((element: Estabelecimento) => (
                    <LeadCard
                      key={element._id}
                      cnpj={`${element.cnpjBase}${element.cnpjOrdem}${element.cnpjDV}`}
                      razao_social={element.nomeFantasia}
                      telefone={element.telefone1 ? `(${element.ddd1}) ${element.telefone1}` : ""}
                      email={element.correioEletronico}
                      endereco={`${element.logradouro}, ${element.numero} - ${element.bairro}, ${element.municipio}/${element.uf}`}
                      situacao_cadastral={element.situacaoCadastral}
                    />
                  ))}

        

        {/* Nenhum resultado */}
        {leads.length === 0 && (
          <p style={{ textAlign: "center", margin: "20px 0", color: "#F55151" }}>Nenhum resultado encontrado</p>
        )}

        {/* PAGINAÇÃO */}
        {pagination.totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0", flexWrap: "wrap" }}>
            <button onClick={goToFirstPage} disabled={pagination.page === 1}>Primeira</button>
            <button onClick={goToPrevPage} disabled={pagination.page === 1}>Anterior</button>

            <span>Página {pagination.page} de {pagination.totalPages}</span>

            <button onClick={goToNextPage} disabled={pagination.page === pagination.totalPages}>Próxima</button>
            <button onClick={goToLastPage} disabled={pagination.page === pagination.totalPages}>Última</button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
