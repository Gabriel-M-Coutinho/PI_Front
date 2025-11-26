import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeadByCnpj } from "../../api/api";
import { type FullLead, type Estabelecimento } from "../../types/types";
import Header from "../components/header";
import Footer from "../components/footer";
import { UserIcon, CurrencyDollarIcon, InformationCircleIcon, MapPinIcon, PhoneIcon, GlobeAmericasIcon } from "@heroicons/react/24/solid";


export default function Lead() {
  const { id } = useParams();
  const [lead, setLead] = useState<FullLead | null>(null);
  const [error,setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const result = await getLeadByCnpj(id!);
        setLead(result);
      } catch (e) {
        setError("errinho")
      }
    }
    load();
  }, [id]);

  if (error) {
    return (<>
        <Header/>
      <div className="max-w-[1500px] min-h-screen mx-auto text-center mt-10 text-red-600 text-xl font-bold">
        Não Sou um Lead
      </div>
      <Footer/>
      </>
    );
  }


  if (!lead) {
    return (<>
        <Header/>
        <div className="max-w-[1500px] min-h-screen mx-auto">
          <p className="min-h-screen text-center mt-10 text-gray-400">
            Carregando...
          </p>
          </div>
        <Footer/>
    </>
    );
  }

  let dataInicioAtividade = new Date(lead.dataInicioAtividade)
  let dataSituacaoCadastral = new Date(lead.dataSituacaoCadastral)
  let dataSituacaoEspecial = new Date(lead.dataSituacaoEspecial)
  /*return (<>
              <Header/>

    <div className="bg-gradient-to-b from-primary to-[#0d2434] max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Informações do Estabelecimento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Nome Fantasia" value={lead.nomeFantasia} />
        <Info label="CNPJ Base" value={lead.cnpjBase} />
        <Info label="Ordem" value={lead.cnpjOrdem} />
        <Info label="DV" value={lead.cnpjDV} />
        <Info label="Matriz / Filial" value={lead.matrizFilial} />
        <Info label="Situação Cadastral" value={lead.situacaoCadastral} />
        <Info label="Motivo Situação" value={lead.motivoSituacaoCadastral} />
        <Info label="Início Atividade" value={lead.dataInicioAtividade} />
        <Info label="Data Situação Cadastral" value={lead.dataSituacaoCadastral} />
        <Info label="Data Situação Especial" value={lead.dataSituacaoEspecial} />

        <Info label="Tipo Logradouro" value={lead.tipoLogradouro} />
        <Info label="Logradouro" value={lead.logradouro} />
        <Info label="Número" value={lead.numero} />
        <Info label="Complemento" value={lead.complemento || "-"} />
        <Info label="Bairro" value={lead.bairro} />
        <Info label="CEP" value={lead.cep} />
        <Info label="Município" value={lead.municipio} />
        <Info label="UF" value={lead.uf} />

        <Info label="CNAE Principal" value={lead.cnaePrincipal} />
        <Info
          label="CNAE Secundário"
          value={lead.cnaeSecundario?.join(", ") || "-"}
        />

        <Info label="Telefone 1" value={`${lead.ddd1} ${lead.telefone1}`} />
        <Info
          label="Telefone 2"
          value={lead.ddd2 ? `${lead.ddd2} ${lead.telefone2}` : "-"}
        />
        <Info
          label="Fax"
          value={lead.dddFAX ? `${lead.dddFAX} ${lead.fax}` : "-"}
        />

        <Info label="Email" value={lead.correioEletronico} />

        <Info label="Situação Especial" value={lead.situacaoEspecial || "-"} />
        <Info label="Cidade Exterior" value={lead.cidadeExterior || "-"} />
        <Info label="País" value={lead.pais || "-"} />
      </div>
    </div>
    <div className="mt-20"></div>
              <Footer   />
    </>
  );*/

  
    //"NULA",
    //"ATIVA",
    //"SUSPENSA",
    //"INAPTA",
    //"BAIXADA"


  let situacaoCadastralTag;
  switch (lead.situacaoCadastral) {
    case "01":
      situacaoCadastralTag = `<p class="text-gray-300 mb-2 font-medium bg-gray-950 py-2 px-4 rounded border border-gray-300">NULA</p>`;
      break;
    case "02":
      situacaoCadastralTag = `<p class="text-green-300 mb-2 font-medium bg-green-950 py-2 px-4 rounded border border-green-300">ATIVA</p>`;
      break;
    case "03":
      situacaoCadastralTag = `<p class="text-yellow-300 mb-2 font-medium bg-yellow-950 py-2 px-4 rounded border border-yellow-300">SUSPENSA</p>`;
      break;
    case "04":
      situacaoCadastralTag = `<p class="text-orange-300 mb-2 font-medium bg-orange-950 py-2 px-4 rounded border border-orange-300">INAPTA</p>`;
      break;
    case "08":
      situacaoCadastralTag = `<p class="text-red-300 mb-2 font-medium bg-red-950 py-2 px-4 rounded border border-red-300">BAIXADA</p>`;
      break;
    default: 
      situacaoCadastralTag = `<p class="text-green-300 mb-2 font-medium bg-green-950 py-2 px-4 rounded border border-green-300">NULA</p>`;
  }

  return (
    <>
      <Header />

      <div className="max-w-[1500px] min-h-screen mx-auto mt-10 p-8 text-white shadow-xl color-indigo rounded-xl border border-gray-700">
        {/* Header */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between">
            <h2 className="text-3xl font-bold mb-2">{lead.nomeFantasia || "Não informado"}</h2>
            <div dangerouslySetInnerHTML={{ __html: situacaoCadastralTag }} />
          </div>
          
          <h1 className="font-semibold mb-1">
            {lead.cnpjBase}/{lead.cnpjOrdem}-{lead.cnpjDV} — {lead.matrizFilial === "1" ? "MATRIZ" : "FILIAL"}
          </h1>
          </div>
        
        
        {/* Sócios */}
        {lead.socios.length > 0 && (
          <div className="mb-10">
            <h1 className="flex text-xl font-bold mb-4"><UserIcon className="w-6 h-6 mr-2"/>Quadro de Sócios</h1>
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-left">
                <tr>
                  <th className="p-2 font-semibold border-b border-gray-700">Nome</th>
                  <th className="p-2 font-semibold border-b border-gray-700">Qualificação</th>
                </tr>
              </thead>
              <tbody>
                {lead.socios.map((s) => (
                  <tr key={s._id} className="odd:bg-gray-900 even:bg-gray-800">
                    <td className="p-2 border-b border-gray-700">{s.nomeSocio}</td>
                    <td className="p-2 border-b border-gray-700">{s.qualificacaoSocio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CNAE */}
        <div className="mb-10">
          <h1 className="flex text-xl font-bold mb-4"><CurrencyDollarIcon className="w-6 h-6 mr-2"/> Atividades Econômicas</h1>
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="p-2 font-semibold border-b border-gray-700">Categoria</th>
                <th className="p-2 font-semibold border-b border-gray-700">Código</th>
                <th className="p-2 font-semibold border-b border-gray-700">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-gray-900 even:bg-gray-800">
                <td className="p-2 border-b border-gray-700 font-medium">Principal</td>
                <td className="p-2 border-b border-gray-700">{lead.realCnaePrincipal._id}</td>
                <td className="p-2 border-b border-gray-700">{lead.realCnaePrincipal.descricao}</td>
              </tr>

              {lead.realCnaeSecundario.map((c) => (
                <tr key={c._id} className="odd:bg-gray-900 even:bg-gray-800">
                  <td className="p-2 border-b border-gray-700">Secundário</td>
                  <td className="p-2 border-b border-gray-700">{c._id}</td>
                  <td className="p-2 border-b border-gray-700">{c.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {/* Company Status Block */}
          
          <div>
            <h1 className="flex font-bold text-lg mb-2"><InformationCircleIcon className="w-6 h-6 mr-2"/>Informações Cadastrais</h1>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 leadGroupFieldFormat">
              <div className="col-span-2"><strong>Motivo:</strong> <p>{lead.motivoSituacaoCadastral}</p></div>
              <div className="col-span-2"><strong>Data Início Atividade:</strong> <p>{dataInicioAtividade.toLocaleDateString("en-GB") == "31/12/1" ? "-": dataInicioAtividade.toLocaleDateString("en-GB")}</p></div>
              <div className="col-span-2"><strong>Data Situação Cadastral:</strong> <p>{dataSituacaoCadastral.toLocaleDateString("en-GB") == "31/12/1" ? "-": dataSituacaoCadastral.toLocaleDateString("en-GB")}</p></div>
              <div className="col-span-2"><strong>Data Situação Especial:</strong> <p>{dataSituacaoEspecial.toLocaleDateString("en-GB") == "31/12/1" ? "-": dataSituacaoEspecial.toLocaleDateString("en-GB")}</p></div>
            </div>
          </div>
          {/* Address Block */}
          
          <div>
            <h1 className="flex font-bold text-lg mb-2"><MapPinIcon className="w-6 h-6 mr-2"/>Endereço</h1>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 leadGroupFieldFormat">
              <div><strong>Tipo Logradouro</strong><p>{lead.tipoLogradouro}</p></div>
              <div><strong>Logradouro</strong> <p>{lead.logradouro}</p></div>
              <div><strong>Número</strong> <p>{lead.numero}</p></div>
              <div><strong>Complemento</strong> <p>{lead.complemento || "-"}</p></div>
              <div><strong>Bairro</strong> <p>{lead.bairro}</p></div>
              <div><strong>CEP</strong> <p>{lead.cep}</p></div>
              <div><strong>Município</strong> <p>{lead.municipio}</p></div>
              <div><strong>UF</strong> <p>{lead.uf}</p></div>
            </div>
          </div>
          {/* Contact Block */}
          
          <div>
            <h1 className="flex font-bold text-lg mb-2"><PhoneIcon className="w-6 h-6 mr-2"/>Contato</h1>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 leadGroupFieldFormat">
              <div><strong>Telefone 1</strong> <p>{lead.ddd1} {lead.telefone1}</p></div>
              <div><strong>Telefone 2</strong> <p>{lead.ddd2 ? `${lead.ddd2} ${lead.telefone2}` : "-"}</p></div>
              <div><strong>Fax</strong> <p>{lead.dddFAX ? `${lead.dddFAX} ${lead.fax}` : "-"}</p></div>
              <div className="col-span-3"><strong>Email</strong> <p>{lead.correioEletronico}</p></div>
            </div>
          </div>
          {/* International Block */}
          <div>
            <h1 className="flex font-bold text-lg mb-2"><GlobeAmericasIcon className="w-6 h-6 mr-2"/>Informações Exteriores</h1>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 leadGroupFieldFormat">
              <div className="col-span-2"><strong>Cidade Exterior:</strong> <p>{lead.cidadeExterior || "-"}</p></div>
              <div><strong>País:</strong> <p>{lead.pais || "-"}</p></div>
            </div>
          </div>
          </div>
        </div>

      <div className="mt-20" />
      <Footer />
    </>
  );
}

interface InfoProps {
  label: string;
  value: string | number | null | undefined;
}

function Info({ label, value }: InfoProps) {
  return (
    <div className="flex flex-col bg-gray-50 p-3 rounded border border-gray-200">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-gray-800 font-semibold">{value || "-"}</span>
    </div>
  );
}
