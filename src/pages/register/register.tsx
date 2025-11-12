import { useState } from "react";

export default function Register() {
  const [userType, setUserType] = useState("pf");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      tipo: userType,
      identificador: cpfCnpj,
      nome: name,
      email: email,
    };

    console.log("Usuário criado:", newUser);
    alert("Usuário cadastrado com sucesso!");
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
        {/* Tipo de usuário */}
        <label>
          Tipo de Usuário:
          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              setCpfCnpj(""); // limpa o campo ao trocar tipo
            }}
          >
            <option value="pf">Pessoa Física (CPF)</option>
            <option value="pj">Pessoa Jurídica (CNPJ)</option>
          </select>
        </label>
        <br />

        {/* Campo dinâmico: CPF ou CNPJ */}
        <label>
          {userType === "pf" ? "CPF:" : "CNPJ:"}
          <input
            type="text"
            placeholder={userType === "pf" ? "Digite o CPF" : "Digite o CNPJ"}
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
          />
        </label>
        <br />

        {/* Nome */}
        <label>
          Nome:
          <input
            type="text"
            placeholder="Digite o nome completo ou razão social"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
