import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { UserDTO, UserProfile } from "../../types/types";
import { deleteProfile, setProfileApi,  getProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/passwordfield";

<ToastContainer/>

export default function Account() {
    const [user, setProfile] = useState<any>();
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
        }

        load();
    }, []);

    if (!user) return <p>Loading...</p>;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nome = formData.get("nome")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const cpfCnpj = formData.get("cpfCnpj")?.toString().replace(/\D/g, "");

    // ---- VALIDATIONS ----
    if (!nome) return toast.error("Name is required.");
    if (!email) return toast.error("Email is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email format.");

    if (!cpfCnpj) return toast.error("CPF/CNPJ is required.");
    if (!(cpfCnpj.length === 11 || cpfCnpj.length === 14))
        return toast.error("CPF/CNPJ must be 11 or 14 digits.");

    // ---- SUCCESS ----
    const newUser: UserDTO = { fullName: nome, email, cpfCnpj, password: ""};
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
        <div className="bg-gradient-to-b from-primary to-[#0d2434]">
            <Header />

            <main className="flex flex-col items-center w-full">
            <div className="px-12 my-24 w-full max-w-[900px]">

                
                <h3 className="font-semibold mb-8 text-gray-100">Conta</h3>

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
                    className="ml-1 mb-2 text-gray-400 font-medium w-40"
                    >
                    Nome
                    </label>

                    <input
                    type="text"
                    name="nome"
                    id="name"
                    defaultValue={user.fullName}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <p id="error_name"></p>
                </div>

                {/* Email */}
                <div className="flex flex-col justify-between items-start">
                    <label
                    htmlFor="email"
                    className="ml-1 mb-2 text-gray-400 font-medium w-40"
                    >
                    Email
                    </label>

                    <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user.email}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                    />
                    <p id="error_email"></p>
                </div>

                {/* CPF */}
                <div className="flex flex-col justify-between items-start">
                    <label
                    htmlFor="cpf"
                    className="ml-1 mb-2 text-gray-400 font-medium w-40"
                    >
                    CPF
                    </label>

                    <input
                    type="text"
                    name="cpfCnpj"
                    id="cpf"
                    defaultValue={user.cpfCnpj}
                    placeholder="000.000.000-00"
                    className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <p id="error_name"></p>
                </div>
                <div className="py-2">
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                    type="button"
                    value="edit"
                    onClick={cancelEdit}
                    className="py-2 px-7 rounded bg-gray-600 text-white hover:bg-gray-500"
                    >
                    Cancelar
                    </button>

                    <button
                    type="submit"
                    name="action"
                    value="delete"
                    className="py-2 px-7 rounded bg-blue-600 text-white hover:bg-blue-500"
                    >
                    Confirmar
                    </button>
                </div>
                
                </form>

            </div>
            </main>
            {confirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="bg-gray-800 text-gray-100 px-16 py-12 rounded-lg w-[700px] max-w-[80%] shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Confirmar Alterações</h2>
                        <p className="my-8">Para confirmar as alterações é necessário colocar senha atual</p>
                        <form action="" onSubmit={(a)=>handleConfirmSubmit(a)}>
                            <div className="space-y-8 my-12">
                                <PasswordField label="Senha Atual" name="current-password" id="current-password" />
                            </div>
                            <div>
                            <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setConfirmModal(false)} className="py-2 px-5 rounded bg-gray-600 hover:bg-gray-500">
                                Cancelar
                            </button>
                            <button type="submit" className="py-2 px-5 rounded bg-blue-600 hover:bg-blue-500">
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
