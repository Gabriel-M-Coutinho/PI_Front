
import { useEffect, useState } from "react";
import LeadCard from "./LeadCard";

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [name,setName] = useState("");

  const [leads,setLeads] = useState<{cnpj:string,razao_social:string}[]>([])

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const data = {cnpj:"abobrinha",razao_social:"abobrinha razao"}
    const data1 = {cnpj:"speedblue",razao_social:"speedblue razao"}
    const data2 = {cnpj:"fatec",razao_social:"fatec razao"}
    setLeads((prevLeads) => [...prevLeads, data,data1,data2]);
  };

  useEffect(()=>{

  },[])



  return (
    <div>
        {/* Criando formulario e anexando a função handle filter no formulario no submit */}
      <form onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        {/* Criando lista de leads */}
        {leads.map((element)=>(
            <LeadCard cnpj={element.cnpj} razao_social={element.razao_social} key={element.cnpj} />
        )

        )}
        {/* Botao de submit que trigga o OnSubmit do formulario */}
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
}
