import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeadByCnpj } from "../../api/api";
import type { Estabelecimento } from "../../types/types";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Lead() {
  const { id } = useParams();
  const [lead, setLead] = useState<Estabelecimento | null>(null);
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
      <div className="text-center mt-10 text-red-600 text-xl font-bold">
        Não Sou um Lead
      </div>
      <Footer/>
      </>
    );
  }


  if (!lead) {
    return (<>
            <Header/>
          <p className="text-center mt-10 text-gray-600">
        Carregando...
      </p>
          <Footer/>
    </>

    );
  }

  return (<>
              <Header/>

    <div className="max-w-4xl mx-auto mt-10 p-6 bg-primary shadow-lg rounded-lg border border-gray-200">
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
