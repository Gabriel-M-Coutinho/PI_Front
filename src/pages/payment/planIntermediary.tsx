import { toast } from "react-toastify";
import { createOrder } from "../../api/api";
import Footer from "../components/footer";
import Header from "../components/header";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function PlanIntermediary() {

  const handleBuy = async (e:any) => {
      e.preventDefault()
    try {
      const checkout = await createOrder(1);
  
      if (checkout?.checkoutUrl) {
        window.location.href = checkout.checkoutUrl;
      } else {
        console.error("URL não retornada:", checkout);
        toast.error("Erro ao gerar checkout");
      }
  
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
      toast.error("Erro ao processar pagamento");
    }
  };
    return(<>
      <div className="min-h-screen bg-gradient-to-l from-primary to-[#090814]">
        <Header />

        <main>
          <section className="flex justify-center items-center h-screen w-full">

            {/* LADO ESQUERDO (IMAGEM) */}
            <div className="hidden md:flex flex-col justify-center items-center h-full w-1/2 relative">
              <img
                src="/login.png"
                alt="Login"
                className="w-full h-full object-cover opacity-50"
              />

              <div id="logo-login" className="absolute inset-0 flex justify-center items-center">
                <div className="flex flex-row justify-center items-center gap-2">
                  <div className="md:w-20 lg:w-24">
                    <svg
                      width="auto"
                      height="auto"
                      viewBox="0 0 110 90"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M101.75 33.8H81.3416C83.5227 38.9782 82.5653 45.21 78.4197 49.431L55 73.2765V81.4C55 86.0392 58.6936 89.8 63.25 89.8H101.75C106.306 89.8 110 86.0392 110 81.4V42.2C110 37.5607 106.306 33.8 101.75 33.8ZM82.5 66C80.2227 66 78.375 64.1187 78.375 61.8C78.375 59.4795 80.2227 57.6 82.5 57.6C84.7773 57.6 86.625 59.4795 86.625 61.8C86.625 64.1187 84.7773 66 82.5 66ZM74.5302 33.3275L44.4641 2.7147C41.1709 -0.638299 35.8308 -0.638299 32.5377 2.7147L2.46984 33.3275C-0.823281 36.6805 -0.823281 42.1177 2.46984 45.4707L32.5359 76.0852C35.8291 79.4382 41.1692 79.4382 44.4623 76.0852L74.5302 45.4725C77.8233 42.1177 77.8233 36.6805 74.5302 33.3275ZM16.5 43.6C14.2227 43.6 12.375 41.7187 12.375 39.4C12.375 37.0795 14.2227 35.2 16.5 35.2C18.7773 35.2 20.625 37.0795 20.625 39.4C20.625 41.7187 18.7773 43.6 16.5 43.6ZM38.5 66C36.2227 66 34.375 64.1187 34.375 61.8C34.375 59.4795 36.2227 57.6 38.5 57.6C40.7773 57.6 42.625 59.4795 42.625 61.8C42.625 64.1187 40.7773 66 38.5 66ZM38.5 43.6C36.2227 43.6 34.375 41.7187 34.375 39.4C34.375 37.0795 36.2227 35.2 38.5 35.2C40.7773 35.2 42.625 37.0795 42.625 39.4C42.625 41.7187 40.7773 43.6 38.5 43.6ZM38.5 21.2C36.2227 21.2 34.375 19.3187 34.375 17C34.375 14.6795 36.2227 12.8 38.5 12.8C40.7773 12.8 42.625 14.6795 42.625 17C42.625 19.3187 40.7773 21.2 38.5 21.2ZM60.5 43.6C58.2227 43.6 56.375 41.7187 56.375 39.4C56.375 37.0795 58.2227 35.2 60.5 35.2C62.7773 35.2 64.625 37.0795 64.625 39.4C64.625 41.7187 62.7773 43.6 60.5 43.6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <span className="md:text-[50px] lg:text-[75px] font-bold mt-6">
                    LeadSearch
                  </span>
                </div>
              </div>
            </div>

        <div className="w-1/2 justify-center flex">
            <div className="
            bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 
            flex flex-col justify-center items-center w-[650px] h-[620px] p-8 gap-8">

                <form className="flex flex-col items-center w-full max-w-md gap-10">
                    <h2 className="mb-10 font-bold text-3xl tracking-wide text-white">
                        PLANO INTERMEDIÁRIO
                    </h2>

                    {/* PREÇO + MOEDAS */}
                    <div className="flex justify-between items-center w-full">

                        {/* PREÇO */}
                        <div className="w-full flex justify-between">
                            <span className="text-2xl text-white leading-none">SUBTOTAL:</span>
                        </div>

                        {/* COINS */}
                        <div className="flex justify-end w-full">
                                <span className="text-2xl text-white mr-1">R$39,90 - </span>
                            <CurrencyDollarIcon className="w-6 color-coin drop-shadow-md" />
                            <span className="text-xl text-white ml-1 mt-1">1700</span>
                        </div>
                    </div>

                    {/* PREÇO + MOEDAS */}
                    <div className="flex justify-between items-center w-full">

                        {/* PREÇO */}
                        <div className="w-full flex justify-between">
                            <span className="text-2xl text-white leading-none">BÔNUS:</span>
                        </div>

                        {/* COINS */}
                        <div className="flex justify-end w-full">
                            <span className="text-2xl text-white mr-1">R$0,00 - </span>
                            <CurrencyDollarIcon className="w-6 color-coin drop-shadow-md" />
                            <span className="text-xl text-white ml-1 mt-1">100</span>
                        </div>
                    </div>
                        <hr className="w-full mt-8"/>
                        <div className="w-full flex justify-between">
                            <span className="text-2xl font-semibold text-white leading-none">TOTAL:</span>
                            <div className="flex">
                                <span className="text-2xl text-white mr-1">R$39,90 - </span>
                                <CurrencyDollarIcon className="w-6 color-coin drop-shadow-md" />
                                <span className="text-xl text-white ml-1 mt-1">1800</span>
                            </div>
                        </div>
                    {/* BOTÃO */}
                    <button
                        onClick={handleBuy}
                        className="transition-transform duration-300 hover:scale-105 px-16 py-4 rounded-xl text-lg font-semibold 
                                bg-green-700 hover:bg-green-600 transition-all 
                                shadow-md hover:shadow-xl"
                    >
                        PAGAR
                    </button>
                </form>
            </div>
            </div>

          </section>
        </main>
      </div>

      <Footer />
    </>
    );
};