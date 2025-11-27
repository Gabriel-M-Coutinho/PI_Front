import Header from "../components/header";
import Footer from "../components/footer";

export function Unauthorized() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-black-300 text-text">
                <Header />


                <div className="flex flex-1 justify-center items-center p-6">
                    <div className="bg-gray-900 shadow-lg p-10 rounded-2xl border border-primary text-center max-w-md">
                        
                        <div className="flex justify-center mb-4">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-yellow-600">
                                <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M10.29 3.85999L1.81995 18C1.49595 18.564 1.42195 19.232 1.61195 19.852C1.80195 20.472 2.23795 20.989 2.81995 21.27C3.40195 21.55 4.06795 21.57 4.66995 21.32H19.33C19.932 21.57 20.598 21.55 21.18 21.27C21.762 20.989 22.198 20.472 22.388 19.852C22.578 19.232 22.504 18.564 22.18 18L13.71 3.85999C13.346 3.252 12.695 2.875 12 2.875C11.305 2.875 10.654 3.252 10.29 3.85999Z"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold mb-2">Acesso negado</h1>
                        <p className="opacity-80 mb-6">
                            Você não tem permissão para acessar esta página.
                        </p>

                        <a href="/" className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                            Voltar ao Início
                        </a>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
