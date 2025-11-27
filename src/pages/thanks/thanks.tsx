<ToastContainer />

import { useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/header";
import Footer from "../components/footer";

export function Thanks(){
    
    const hasConfirmed = useRef(false);

    const confirmPayment = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        
        if (!sessionId) return;

        if (hasConfirmed.current) return;
        hasConfirmed.current = true;
        
        try {
            const response = await axios.post('http://localhost:5047/api/payments/confirm-payment', {
                sessionId: sessionId
            });
            
            const result = response.data;
            
            if (result.success) {
                toast.success("Pagamento realizado com sucesso!");
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            } else {
                toast.error("Pagamento recusado");
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
        } catch (error) {
            console.error('Erro ao confirmar pagamento:', error);
            toast.error("Erro no servidor. Entre em contato para mais informações.");
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        }
    }

    useEffect(() => {
        confirmPayment();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center text-gray-200 px-4">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] max-w-lg w-full text-center">
                    <div className="flex justify-center mb-6">
                        <div className="animate-pulse">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]">
                                <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M10.29 3.86L1.82 18c-.32.56-.39 1.23-.2 1.85.19.62.63 1.14 1.21 1.42.58.29 1.24.31 1.86.06h14.66c.62.25 1.28.23 1.86-.06.58-.28 1.02-.8 1.21-1.42.19-.62.12-1.29-.2-1.85L13.71 3.86C13.35 3.25 12.7 2.88 12 2.88s-1.35.37-1.71.98z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-indigo-300 mb-4 tracking-wide">
                        {hasConfirmed.current ? "Pagamento Confirmado" : "Processando Pagamento"}
                    </h1>

                    <p className="opacity-70 mb-8 text-sm leading-relaxed">
                        {hasConfirmed.current ? "Obrigado pela compra! Seus créditos serão liberados em instantes." : "Estamos validando seu pagamento. Isso deve levar alguns segundos..."}
                    </p>

                    {!hasConfirmed.current && (
                        <div className="flex justify-center">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}