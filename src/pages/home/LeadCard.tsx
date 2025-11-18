export default function LeadCard({cnpj, razao_social}:{cnpj:string,razao_social:string}){
    return(
        <div>
            <h1>Razao</h1>
            <h2>{razao_social}</h2>
            <h1>CNPJ</h1>
            <h3>{cnpj}</h3>
        </div>
    )
}