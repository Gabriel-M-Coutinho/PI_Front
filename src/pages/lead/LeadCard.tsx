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
    <div onClick={handleClick} className="transition transform hover:scale-105 hover:cursor-pointer flex justify-between bg-gray-50 p-4 border border-gray-200">
      <span className="text-gray-800 font-medium text-center flex-1">{razao_social}</span>
      <span className="text-gray-600 text-center flex-1">{cnpj}</span>
    </div>
  );
}