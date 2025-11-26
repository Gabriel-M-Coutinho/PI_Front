import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { cnpjMaskOptions, type UserDTO, type UserProfile, cpfMaskOptions, formatCNPJ, formatCPF } from "../../types/types";
import { deleteProfile, setProfileApi,  getProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/passwordfield";
import { InputMask } from "@react-input/mask";

<ToastContainer/>

export default function Account() {
    const [user, setProfile] = useState<any>();
    const [userType, setUserType] = useState("PF");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [newUser, setNewUser] = useState<UserDTO | null>(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const navigate  = useNavigate();
    const cancelEdit = () => {
        navigate("/account")
    }



    useEffect(() => {
        async function load() {
            const data = await getProfile();   // <--- JSON comes here
            setProfile(data);
            setUserType(data.tipo);
            setCpfCnpj(data.cpfCnpj);
        }

        load();
    }, []);

    if (!user) return <p>Loading...</p>;
    const maskOptions = userType === "PF" ? cpfMaskOptions : cnpjMaskOptions;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nome = formData.get("nome")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const cpfCnpjSend = cpfCnpj.replaceAll(".","").replaceAll("/","").replaceAll("-","");

    // ---- VALIDATIONS ----
    if (!nome) return toast.error("Nome é Requerido!");
    if (!email) return toast.error("Email é Requerido");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Email em Formato inválido");
        
    if (!cpfCnpjSend) return toast.error((userType == "PF" ? "CPF" : "CNPJ") + " é requerido!");
    if (!(cpfCnpjSend.length === 11 || cpfCnpjSend.length === 14))
        return toast.error("CPF/CNPJ must be 11 or 14 digits.");

    // ---- SUCCESS ----
    const newUser: UserDTO = { fullName: nome, email, cpfCnpj: cpfCnpjSend, password: "", tipo: userType};
    setNewUser(newUser);
    setConfirmModal(true);
    };

    const handleConfirmSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!newUser) return toast.error("Erro, novas informações não foram captadas!");
        const formData = new FormData(event.currentTarget);
        const password = formData.get("current-password")?.toString();

        if(!password) return toast.error("Informe a Senha Atual!");
        newUser.password = password;
        try {
            await setProfileApi(newUser).then(()=> {
                navigate("/account");
                toast.success("Usuário alterado com Sucesso!");
            }).catch(err => {
                err.response.data.map((data: any) =>{
                    toast.error(data.description);
                })
            });
        } 
        catch (error) 
        {
            console.error(error);
            toast.error("Erro ao alterar Usuário");
        }
    }
    return (
        <div className="bg-gradient-to-l from-primary to-[#090814]">
            <Header />

            <main className="flex flex-col items-center w-full">
            <div className="px-12 my-24 w-full max-w-[900px]">
                
                <h3 className="font-semibold mb-8 text-gray-100">Editar</h3>

                <form
                action="/user"
                id="form-register"
                onSubmit={handleSubmit}
                method="POST"
                className="space-y-5"
                >

                {/* Nome */}
                <div className="flex flex-col justify-between items-start">
                    <label
                    htmlFor="name"
                    className="text-lg font-semibold"
                    >
                    Nome
                    </label>

                    <input
                    type="text"
                    name="nome"
                    id="name"
                    defaultValue={user.fullName}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 border border-white/10 focus:border-indigo-500 placeholder:text-gray-500"
                    />
                    <p id="error_name"></p>
                </div>

                {/* Email */}
                <div className="flex flex-col justify-between items-start">
                    <label
                    htmlFor="email"
                    className="text-lg font-semibold"
                    >
                    Email
                    </label>

                    <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 border border-white/10 focus:border-indigo-500 placeholder:text-gray-500"
                    required
                    />
                    <p id="error_email"></p>
                </div>

                {/* CPF */}
                <div className="w-full flex user_type">
                    <label className="flex items-center text-lg font-semibold">Tipo de pessoa:</label>
                    <div className="flex gap-20">
                    <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="user-type"
                    value="PF"
                    checked={userType == "PF"}
                    onChange={(event) => { setUserType(event.target.value), user.tipo == "PF" ? setCpfCnpj(user.cpfCnpj) : setCpfCnpj("")}}
                    />
                    PF
                    </label>
                    <label className="flex items-center gap-1">
                    <input
                    type="radio"
                    name="user-type"
                    value="PJ"
                    checked={userType == "PJ"}
                    onChange={(event) => { setUserType(event.target.value), user.tipo == "PJ" ? setCpfCnpj(user.cpfCnpj) : setCpfCnpj("")}}
                    />
                    PJ
                    </label>
                    </div>
                </div>

              <div className="w-full flex flex-col mt-4">
                <label className="block text-lg font-semibold">{userType == "PF" ? "CPF" : "CNPJ"}</label>
                <InputMask
                  mask={maskOptions.mask}
                  replacement={maskOptions.replacement}
                  name="cpf-cnpj"

                  value={userType == "PF" ? formatCPF(cpfCnpj) : formatCNPJ(cpfCnpj)}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  type="text"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white border border-white/10 focus:border-indigo-500 placeholder:text-gray-500"
                />
              </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3">
                    <button
                    type="button"
                    value="edit"
                    onClick={cancelEdit}
                    className="rounded-lg py-2 px-7 rounded bg-gray-600 text-white hover:bg-gray-500"
                    >
                    Cancelar
                    </button>

                    <button
                    type="submit"
                    name="action"
                    value="delete"
                    className="py-2 px-7 rounded text-white"
                    id="botao-principal"
                    >
                    Confirmar
                    </button>
                </div>
                
                </form>

            </div>
            </main>
            {confirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-[#25263b] text-gray-100 px-16 py-12 rounded-lg w-[700px] max-w-[80%] shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Confirmar Alterações</h2>
                        <p className="my-8">Para confirmar as alterações é necessário colocar senha atual</p>
                        <form action="" onSubmit={(a)=>handleConfirmSubmit(a)}>
                            <div className="space-y-8 my-12">
                                <PasswordField label="Senha Atual" name="current-password" id="current-password" />
                            </div>
                            <div>
                            <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setConfirmModal(false)} className="rounded-lg py-2 px-5 rounded bg-gray-600 hover:bg-gray-500">
                                Cancelar
                            </button>
                            <button id="botao-principal" type="submit" className="py-2 px-5 rounded bg-blue-600 hover:bg-blue-500">
                                Confirmar
                            </button>
                            </div>
                        </div>
                        </form>
    
                        
                    </div>
                </div>
            )}

            <Footer />
            
        </div>
    );
}
