import Footer from "../components/footer";
import Header from "../components/header";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteProfile, getProfile, changePassword } from "../../api/api";
import { redirect, useNavigate } from "react-router-dom";
import PasswordField from "../components/passwordfield";
import { type ChangePasswordDTO, formatCNPJ, formatCPF} from "../../types/types";
import Cookies from "js-cookie";
            <ToastContainer/>


export default function Account() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
    const [user, setProfile] = useState<any>();
    const navigate  = useNavigate()

  // 1️⃣ Choose which icon to use

    const myLeads = () => {
        navigate("/myLeads");
    }

    const myOrders = () => {
        navigate("/myOrders");
    }

    const editAccount = () => {
        navigate("/account/edit");
    }
    const editPassword = () => {
        setShowEditPasswordModal(true);
    }
    const deleteProcediment = async () => {
        setShowDeleteModal(true);
    }
    const handleConfirmDeleteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const currentPassword = formData.get("current-password")?.toString().trim()
        if(!currentPassword) return toast.error("informe sua Senha Atual!");
        await deleteProfile(currentPassword).then(()=>{
            Cookies.remove("token");
            navigate("/login");
            toast.success("Conta excluída com sucesso!");
        }).catch(err => {
            console.log(err)
            toast.error(err.response.data);
        });
    }

    const handleSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const currentPassword = formData.get("current-password")?.toString().trim();
        const newPassword = formData.get("new-password")?.toString().trim();
        const confirmPassword = formData.get("confirm-password")?.toString().trim();

        if (!currentPassword) return toast.error("Senha Atual é Requerido.");
        if (!newPassword) return toast.error("Nova Senha é Requerido.");
        if (!confirmPassword) return toast.error("Confirmar Senha é Requerido.");

        if (newPassword !== confirmPassword) 
        {
            toast.error("Nova Senha e Confirmar Senha não correspondem.");
            return;
        }
    
        const changePasswordDto:ChangePasswordDTO = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        await changePassword(changePasswordDto).then(() => {
            setShowEditPasswordModal(false)
            toast.success("Senha alterada com Sucesso")
        }).catch(err => {
            //console.log(err)
            err.response.data.map((data: any) =>{
                toast.error(data.description);
            })
        });
    }

    useEffect(() => {
        async function load() {
            const data = await getProfile();   // <--- JSON comes here
            setProfile(data);
        }

        load();
    }, []);
    
    if (!user) return <p>Loading...</p>;
    return (
        <div className="bg-gradient-to-l from-primary to-[#090814]">
            <Header />

            <main className="flex flex-col items-center w-full">
            <div className="px-12 my-24 w-full max-w-[800px]">
            <h3 className="font-semibold mb-8 text-gray-100">Conta</h3>

            <div className="space-y-12">

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">Nome</p>
                <p className="text-gray-200">{user.fullName}</p>
                </div>

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">Email</p>
                <p className="text-gray-200">{user.email}</p>
                </div>

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">{user.tipo == "PF" ? "CPF" : "CNPJ"}</p>
                <p className="text-gray-200">{user.tipo == "PF" ? formatCPF(user.cpfCnpj) : formatCNPJ(user.cpfCnpj)}</p>
                </div>

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">Senha</p>
                <button className="rounded-lg py-2 px-5 rounded bg-gray-600 text-white hover:bg-gray-500"
                    onClick={editPassword}>
                        Mudar Senha
                    </button>
                </div>

                    <div className="flex justify-end gap-3 pt-6">
                    <button id="botao-principal" className="rounded-lg py-2 px-7 rounded text-white"
                    onClick={editAccount}>
                        Editar
                    </button>

                    <button className="rounded-lg py-2 px-7 rounded bg-red-600 text-white hover:bg-red-500"
                    onClick={deleteProcediment}>
                        Excluir
                    </button>
                    </div>
            </div>
            <div className="flex justify-start gap-3 pt-20">
                    <button onClick={myLeads} className="bg-indigo-800 hover:bg-indigo-700 rounded-lg py-4 px-7 rounded text-white">
                        Meus Leads
                    </button>

                    <button onClick={myOrders} className="bg-indigo-800 hover:bg-indigo-700 rounded-lg py-4 px-7 rounded text-white">
                        Meus Pedidos
                    </button>
                    </div>
            </div>
            </main>
            {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                <div className="bg-[#25263b] text-gray-100 px-16 py-12 rounded-lg w-[700px] max-w-[80%] shadow-xl">
                    <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
                    <p className="my-8">Para deletar sua conta é necessário colocar sua senha</p>
                    <form action="" onSubmit={handleConfirmDeleteSubmit}>
                        <div className="space-y-8 my-12">
                            <PasswordField label="Senha Atual" name="current-password" id="current-password" />
                        </div>
                        <div>
                        <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setShowDeleteModal(false)} className="py-2 px-5 rounded bg-gray-600 hover:bg-gray-500 rounded-lg">
                            Cancelar
                        </button>
                        <button type="submit" className="py-2 px-5 rounded bg-red-600 hover:bg-red-500 rounded-lg">
                            Excluir
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>)}
            {showEditPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                <div className="bg-[#25263b] text-gray-100 px-16 py-12 rounded-lg w-[700px] max-w-[80%] shadow-xl">
                    <h2 className="text-xl font-semibold mb-4">Mudar Senha</h2>
                    <form action="" onSubmit={handleSubmitPassword}>
                        <div className="space-y-8 my-12">
                            <PasswordField label="Senha Atual" name="current-password" id="current-password" />
                            <PasswordField label="Nova Senha" name="new-password" id="new-password" />
                            <PasswordField label="Confirmar Senha" name="confirm-password" id="confirm-password" />
                        </div>
                        <div>
                        <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => setShowEditPasswordModal(false)} className="py-2 px-5 rounded bg-gray-600 hover:bg-gray-500 rounded-lg">
                            Cancelar
                        </button>
                        <button type="submit" id="botao-principal" className="py-2 px-5 rounded bg-blue-600 hover:bg-blue-500">
                            Mudar Senha
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
