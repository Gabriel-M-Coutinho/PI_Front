import { useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
            } else {
                toast.error("Pagamento recusado");
            }
        } catch (error) {
            console.error('Erro ao confirmar pagamento:', error);
            toast.error("Erro no servidor. Entre em contato para mais informações.");
        }
    }

    useEffect(() => {
        confirmPayment();
    }, []);

    return(
        <div>{hasConfirmed ?            <h1>Obrigado pela compra!</h1> :             <p>Estamos confirmando seu pagamento...</p>}
 

            <ToastContainer />
        </div>
    )
}