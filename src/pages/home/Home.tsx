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

        {/* FORM DE FILTROS */}
        <form onSubmit={handleFilter} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>

          <input type="text" placeholder="Nome Fantasia" value={nomefantasia}
            onChange={(e) => setNomeFantasia(e.target.value)} />

          <input type="text" placeholder="CNAE Principal" value={cnae}
            onChange={(e) => setCnae(e.target.value)} />

          <input type="text" placeholder="Situação Cadastral (ATIVA, INAPTA...)" value={situacaocadastral}
            onChange={(e) => setSituacaoCadastral(e.target.value)} />

          <input type="text" placeholder="UF (SP, RJ...)" value={uf}
            onChange={(e) => setUf(e.target.value)} />

          <input type="text" placeholder="Município" value={municipio}
            onChange={(e) => setMunicipio(e.target.value)} />

          <input type="text" placeholder="Bairro" value={bairro}
            onChange={(e) => setBairro(e.target.value)} />

          <input type="text" placeholder="CEP" value={cep}
            onChange={(e) => setCep(e.target.value)} />

          <input type="text" placeholder="DDD" value={ddd}
            onChange={(e) => setDdd(e.target.value)} />

          <input type="text" placeholder="Capital Social (ex: 10000:50000)" value={capitalSocial}
            onChange={(e) => setCapitalSocial(e.target.value)} />

          <input type="text" placeholder="Data Abertura (dd/mm/yyyy ou intervalo)" value={dataAbertura}
            onChange={(e) => setDataAbertura(e.target.value)} />

          <select value={matrizFilial} onChange={(e) => setMatrizFilial(e.target.value)}>
            <option value="">Matriz / Filial</option>
            <option value="matriz">Matriz</option>
            <option value="filial">Filial</option>
          </select>

          <input type="number" placeholder="Página" value={page}
            onChange={(e) => setPage(e.target.value)} />

          <input type="number" placeholder="Itens por página" value={pageSize}
            onChange={(e) => setPageSize(e.target.value)} />

          <button type="submit">Pesquisar</button>
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
          <p style={{ textAlign: "center", margin: "20px 0" }}>Nenhum resultado encontrado</p>
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
