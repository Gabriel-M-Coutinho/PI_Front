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
    <div onClick={handleClick} className="transition transform hover:scale-[1.02] hover:cursor-pointer flex flex-row bg-gray-50 pl-28 pr-28 justify-between p-3 border border-gray-200 ml-10 mr-10">
      <span className="text-gray-800 font-medium">{razao_social ? <span className="tex-gray-800 font-medium">{razao_social}</span> : <span className="text-gray-800">---------------------------------------------</span>}</span>
      <span className="text-gray-800 font-medium">{cnpj}</span>
    </div>
  );
}