import { redirect, useNavigate } from "react-router-dom";

export default function LeadCard({ 
  cnpj, 
  razao_social, 
  telefone, 
  email, 
  endereco,
  situacao_cadastral,
}: any) {

  const navigate  = useNavigate()
  const handleClick= ()=>{
    navigate(`/lead/${cnpj}`)
  }
  return (
    <div onClick={handleClick}   className="
    hover:cursor-pointer 
    transition-all 
    duration-200 
    rounded-lg 
    shadow-md 
    hover:shadow-xl 
    hover:-translate-y-1
    border
    flex flex-col border-gray-600 mb-2 ml-10 mr-10 p-14 pt-4 pb-4
  ">
    <div className="flex gap-5">
        <h1>Razão Social:</h1>
        {razao_social ? <h1>{razao_social}</h1> : <h1>---------------------------------------------</h1>}
    </div>
        
      <div className="flex gap-5">
        <h1>CNPJ:</h1>
        <h1>{cnpj}</h1>
      </div>

    </div>
  );
}