import Footer from "../components/footer";
import Header from "../components/header";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteProfile, getProfile } from "../../api/api";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function Account() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [user, setProfile] = useState<any>();
    const navigate  = useNavigate()

    const editAccount = () => {
        navigate("/account/edit");
    }
    const deleteProcediment = async () => {
        setShowDeleteModal(true);
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
        <div>
            <Header />

            <main className="flex flex-col items-center w-full">
            <div className="px-12 my-24 w-full max-w-[800px]">
            <h3 className="font-semibold mb-8 text-gray-100">Conta</h3>

            <div className="space-y-12">

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">Nome</p>
                <p className="text-gray-200">{user.userName}</p>
                </div>

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">Email</p>
                <p className="text-gray-200">{user.email}</p>
                </div>

                <div className="flex justify-between items-start">
                <p className="text-gray-400 font-medium w-40">CPF/CNPJ</p>
                <p className="text-gray-200">{user.cpfCnpj}</p>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                <button className="py-2 px-7 rounded bg-blue-600 text-white hover:bg-blue-500"
                onClick={editAccount}>
                    Editar
                </button>

                <button className="py-2 px-7 rounded bg-red-600 text-white hover:bg-red-500"
                onClick={deleteProcediment}>
                    Excluir
                </button>
                </div>

            </div>
            </div>
            </main>
            {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                <div className="bg-gray-800 text-gray-100 p-10 py-12 rounded-lg w-[550px] max-w-[80%] shadow-xl">
                    <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
                    <p className="my-8">Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.</p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="py-2 px-5 rounded bg-gray-600 hover:bg-gray-500"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={async () => {
                                try {
                                    await deleteProfile();
                                    toast.success("Conta excluída com sucesso!");
                                    Cookies.remove("token");
                                    navigate("/login");
                                } catch (err) {
                                    toast.error("Erro ao excluir conta.");
                                    console.error(err);
                                }
                            }}
                            className="py-2 px-5 rounded bg-red-600 hover:bg-red-500"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        )}

            <Footer />
            <ToastContainer/>
        </div>
    );
}
