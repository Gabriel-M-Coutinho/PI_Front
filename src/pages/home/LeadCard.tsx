import { redirect, useNavigate } from "react-router-dom";

export default function LeadCard({ 
  cnpj, 
  razao_social, 
  telefone, 
  email, 
  endereco,
  situacao_cadastral 
}: any) {

  const navigate  = useNavigate()
  const handleClick= ()=>{
    navigate(`/lead/${cnpj}`)
  }
  return (
    <div onClick={handleClick}   className="
    lead-card 
    hover:cursor-pointer 
    transition-all 
    duration-200 
    rounded-lg 
    shadow-md 
    hover:shadow-xl 
    hover:-translate-y-1
    p-4
    border
  " style={{ border: '1px solid #ccc', padding: '16px', margin: '10px', borderRadius: '8px' }}>
      <h1>Razão Social</h1>
      <h2>{razao_social}</h2>
      
      <h1>CNPJ</h1>
      <h3>{cnpj}</h3>

    </div>
  );
}