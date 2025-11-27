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

    return(
        <>
            <Header/>

            <div>
                {hasConfirmed.current 
                    ? <h1>Obrigado pela compra! Em breve seus créditos serão adicionados!</h1>
                    : <p>Estamos confirmando seu pagamento...</p>
                }

                <ToastContainer />
            </div>

            <Footer/>
        </>
    )
}
