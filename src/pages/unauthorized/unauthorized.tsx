import Header from "../components/header";
import Footer from "../components/footer";

export function Unauthorized() {
 return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center text-gray-200 px-4 bg-black-900">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] max-w-lg w-full text-center">
                    <div className="flex justify-center mb-6">
                        <div className="animate-pulse">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]">
                                <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M10.29 3.86L1.82 18c-.32.56-.39 1.23-.2 1.85.19.62.63 1.14 1.21 1.42.58.29 1.24.31 1.86.06h14.66c.62.25 1.28.23 1.86-.06.58-.28 1.02-.8 1.21-1.42.19-.62.12-1.29-.2-1.85L13.71 3.86C13.35 3.25 12.7 2.88 12 2.88s-1.35.37-1.71.98z"
                                stroke="currentColor"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-indigo-400 mb-4 tracking-wide">
                        Ops! Acesso Negado
                    </h1>

                    <p className="opacity-70 mb-8 text-sm leading-relaxed">
                        Você não tem permissão para acessar esta página.
                    </p>

                    <a href="/" className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                        Voltar ao Início
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}