export default function LeadCard({ 
  cnpj, 
  razao_social, 
  telefone, 
  email, 
  endereco,
  situacao_cadastral 
}: any) {
  return (
    <div className="lead-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '10px', borderRadius: '8px' }}>
      <h1>Razão Social</h1>
      <h2>{razao_social}</h2>
      
      <h1>CNPJ</h1>
      <h3>{cnpj}</h3>

      {telefone && (
        <>
          <h1>Telefone</h1>
          <p>{telefone}</p>
        </>
      )}

      {email && (
        <>
          <h1>Email</h1>
          <p>{email}</p>
        </>
      )}

      {endereco && (
        <>
          <h1>Endereço</h1>
          <p>{endereco}</p>
        </>
      )}

      {situacao_cadastral && (
        <>
          <h1>Situação Cadastral</h1>
          <p>{situacao_cadastral}</p>
        </>
      )}
    </div>
  );
}