import Footer from "../components/footer";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import type { UserDTO, UserProfile } from "../../types/types";
import { getProfile } from "../../api/api";

export default function Account() {
    const [user, setProfile] = useState<UserProfile>();

    useEffect(() => {
        async function load() {
            const data = await getProfile();   // <--- JSON comes here
            setProfile(data);
        }

        load();
    }, []);

    if (!user) return <p>Loading...</p>;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Pega todos os campos do formulário
    const formData = new FormData(event.currentTarget);

    const nome = formData.get("nome"); // valor do input com name="email"
    const email = formData.get("email");
    const password = formData.get("password"); // valor do input com name="password"
    const cpfCnpj = formData.get("cpfCnpj"); // valor do input com name="email"

    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("cnpCnpj:", cpfCnpj);


    // Aqui você pode chamar sua API, por exemplo:
    // login({ username: email, password });
    };
    return (
        <div>
            <Header />

            <main>
                <h2 id="devs-titulo" className="justify-self-center pt-10">
                    Conta
                </h2>

                <form action="/user" id="form-register" onSubmit={handleSubmit} method="POST" className="max-w-sm mx-auto py-4 pb-8">
                    {/* Nome */}
                    <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nome
                            </label>

                            <input
                                type="text"
                                name="nome"
                                id="name"
                                defaultValue={user.userName}
                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    {/* EMAIL */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user.email}
                            required
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Senha
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />

                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">error</p>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-5">
                        <label htmlFor="password_confirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Confirmar Senha
                        </label>

                        <input
                            type="password"
                            name="password_confirm"
                            id="password_confirm"
                            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />

                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">error</p>
                    </div>

                    {/* PF FIELDS */}
                    <div>
                        

                        <div className="mb-5">
                            <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                CPF
                            </label>

                            <input
                                type="text"
                                name="cpfCnpj"
                                id="cpf"
                                placeholder="000.000.000-00"
                                defaultValue={user.cpfCnpj}
                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <button type="submit" name="action" value="edit" id="botao-principal" className="py-2 px-7 rounded">
                            Editar
                        </button>

                        <button type="submit" name="action" value="delete" id="botao-red" className="py-2 px-7 rounded">
                            Excluir
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
            <ToastContainer />
        </div>
    );
}
