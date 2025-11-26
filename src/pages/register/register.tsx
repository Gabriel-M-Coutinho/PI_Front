import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import { createUser } from "../../api/api";
import { type UserDTO, cpfMaskOptions, cnpjMaskOptions } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { InputMask } from '@react-input/mask';
import PasswordField from "../components/passwordfield";
      <ToastContainer/>

export default function Register() {
  const [userType, setUserType] = useState("PF");
  const [cpfCnpj, setCpfCnpj] = useState("");
  //const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  //const [senha, setSenha] = useState("");
  //const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  
  const maskOptions = userType === "PF" ? cpfMaskOptions : cnpjMaskOptions;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirm-password")?.toString().trim();
    const fullName = formData.get("fullname")?.toString().trim();

    if (!email) return toast.error("Email é Requerido!");
    if (!password) return toast.error("Senha é Requerido!");
    if (!confirmPassword) return toast.error("Confirmar Senha é Requerido!");
    if (!fullName) return toast.error("Nome / Razão Social é Requerido!");

    if (!cpfCnpj) return toast.error((userType == "PF" ? "CPF" : "CNPJ") + " é Requerido!");
    if (!userType) return toast.error("Tipo de Usuário é Requerido!");
    if (password !== confirmPassword) return toast.error("Senha e Confirmar senha não correspondem!")
    const user: UserDTO = { fullName: fullName, email: email, cpfCnpj: cpfCnpj.replaceAll(".","").replaceAll("/","").replaceAll("-",""), password: password, tipo: userType}

    createUser(user).then(() => {
      navigate("/login");
      toast.success("Conta criada com sucesso!")
    }).catch(err => {
      toast.error(err.response.data);
    });
  };

  return (
    <div className="bg-gradient-to-l from-primary to-[#090814]">
      <Header/>

      <section className="flex flex-row justify-center items-center h-screen w-full">
        <div className="flex flex-col justify-center items-center h-full md:w-1/2 gap-8">
        <h2 className="font-bold">Criar uma conta</h2>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full gap-6">

            <div className="max-w-[80%] w-full flex flex-col">
              <label className="block text-lg font-semibold mb-2.5">Email</label>
              <input name="email" type="email" className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" />
            </div>

            <div className="max-w-[80%] w-full flex flex-col">
              <PasswordField label="Senha" name="password"  id="password" />
            </div>

            <div className="max-w-[80%] w-full flex flex-col">
              <PasswordField label="Confirmar Senha" name="confirm-password"  id="confirm-password" />
            </div>

            <div className="max-w-[80%] w-full flex user_type">
              <label className="block text-lg font-semibold mb-2.5">Selecione o tipo de pessoa:</label>
                <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="user-type"
                  value="PF"
                  checked={userType === "PF"}
                  onChange={(event) => { setUserType(event.target.value), setCpfCnpj("")}}
                />
                  PF
                </label>
                <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="user-type"
                  value="PJ"
                  checked={userType === "PJ"}
                  onChange={(event) => { setUserType(event.target.value), setCpfCnpj("")}}
                />
                  PJ
                </label>
            </div>
            
              <div className="max-w-[80%] w-full flex flex-col">
                  <label className="block text-lg font-semibold mb-2.5">{userType == "PF" ? "Nome" : "Razão-Social"}</label>
                  <input name="fullname" type="text" className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500" />
              </div>

              <div className="max-w-[80%] w-full flex flex-col mt-4">
                <label className="block text-lg font-semibold mb-2.5">{userType == "PF" ? "CPF" : "CNPJ"}</label>
                <InputMask
                  mask={maskOptions.mask}
                  replacement={maskOptions.replacement}
                  name="cpf-cnpj"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  type="text"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500"
                />
              </div>

            <button type="submit" id="botao-principal" className="py-3 px-6 rounded">
                Cadastrar
            </button>

            <p className="text-center">
                Já tem uma conta?
                <a className="font-bold hover:no-underline hover:text-indigo-500" href="/login"> Entrar</a>
            </p>
        </form>
        </div>
            <div className="md:flex flex-col justify-center items-center h-full w-1/2 hidden">
                <img src="/login.png"
                    alt="Login"
                    className="w-full h-full object-cover opacity-50" />
                <div id="logo-login" className="absolute mx-auto my-auto">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className="md:w-20 lg:w-24">
                            <svg width="auto"
                                height="auto"
                                viewBox="0 0 110 90"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M101.75 33.8H81.3416C83.5227 38.9782 82.5653 45.21 78.4197 49.431L55 73.2765V81.4C55 86.0392 58.6936 89.8 63.25 89.8H101.75C106.306 89.8 110 86.0392 110 81.4V42.2C110 37.5607 106.306 33.8 101.75 33.8ZM82.5 66C80.2227 66 78.375 64.1187 78.375 61.8C78.375 59.4795 80.2227 57.6 82.5 57.6C84.7773 57.6 86.625 59.4795 86.625 61.8C86.625 64.1187 84.7773 66 82.5 66ZM74.5302 33.3275L44.4641 2.7147C41.1709 -0.638299 35.8308 -0.638299 32.5377 2.7147L2.46984 33.3275C-0.823281 36.6805 -0.823281 42.1177 2.46984 45.4707L32.5359 76.0852C35.8291 79.4382 41.1692 79.4382 44.4623 76.0852L74.5302 45.4725C77.8233 42.1177 77.8233 36.6805 74.5302 33.3275ZM16.5 43.6C14.2227 43.6 12.375 41.7187 12.375 39.4C12.375 37.0795 14.2227 35.2 16.5 35.2C18.7773 35.2 20.625 37.0795 20.625 39.4C20.625 41.7187 18.7773 43.6 16.5 43.6ZM38.5 66C36.2227 66 34.375 64.1187 34.375 61.8C34.375 59.4795 36.2227 57.6 38.5 57.6C40.7773 57.6 42.625 59.4795 42.625 61.8C42.625 64.1187 40.7773 66 38.5 66ZM38.5 43.6C36.2227 43.6 34.375 41.7187 34.375 39.4C34.375 37.0795 36.2227 35.2 38.5 35.2C40.7773 35.2 42.625 37.0795 42.625 39.4C42.625 41.7187 40.7773 43.6 38.5 43.6ZM38.5 21.2C36.2227 21.2 34.375 19.3187 34.375 17C34.375 14.6795 36.2227 12.8 38.5 12.8C40.7773 12.8 42.625 14.6795 42.625 17C42.625 19.3187 40.7773 21.2 38.5 21.2ZM60.5 43.6C58.2227 43.6 56.375 41.7187 56.375 39.4C56.375 37.0795 58.2227 35.2 60.5 35.2C62.7773 35.2 64.625 37.0795 64.625 39.4C64.625 41.7187 62.7773 43.6 60.5 43.6Z"
                                      fill="currentColor" />
                            </svg>
                        </div>
                        <span className="md:text-[50px] lg:text-[75px] font-bold mt-6">
                            LeadSearch
                        </span>
                    </div>
                </div>
            </div>
    </section>
      <Footer/>
    </div>
  );
};