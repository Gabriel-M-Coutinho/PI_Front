import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { UserDTO, UserProfile } from "../../types/types";
import { deleteProfile, setProfileApi,  getProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

<ToastContainer/>

export default function Account() {
    const [user, setProfile] = useState<any>();
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
    const password = formData.get("password")?.toString();
    const password_confirm = formData.get("password_confirm")?.toString();
    const cpfCnpj = formData.get("cpfCnpj")?.toString().replace(/\D/g, "");

    // ---- VALIDATIONS ----
    if (!nome) return toast.error("Name is required.");
    if (!email) return toast.error("Email is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email format.");

    if (!password) return toast.error("Password is required.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");

    if (!password_confirm) return toast.error("Password confirmation is required.");
    if (password !== password_confirm) return toast.error("Passwords do not match.");

    if (!cpfCnpj) return toast.error("CPF/CNPJ is required.");
    if (!(cpfCnpj.length === 11 || cpfCnpj.length === 14))
        return toast.error("CPF/CNPJ must be 11 or 14 digits.");

    // ---- SUCCESS ----
    const user: UserDTO = { fullName: nome, email, cpfCnpj, password };
    try {
        await setProfileApi(user).then(()=> navigate("/account"));
        toast.success("Usuário alterado com Sucesso!");
        console.log("User created:", user);
    } 
    catch (error) 
    {
        console.error(error);
        toast.error("Erro ao alterar Usuário");
    }
    };
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


            <Footer />
            
        </div>
    );
}
