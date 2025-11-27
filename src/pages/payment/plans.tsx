import Footer from "../components/footer";
import Header from "../components/header";
import PlanBasic from "./planBasic";
import { redirect, useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function Plans(){
  const navigate = useNavigate();

  const planBasic = () => {
    navigate('/planBasic')
  }

  const planIntermediary = () => {
    navigate('/planIntermediary')
  }

  const planPlus = () => {
    navigate('/planPlus')
  }

    return (<>
    <Header/>
{/* PRICES - START */}
      <div
        className="flex flex-col justify-center items-center w-full px-6 py-10 gap-8 text-text bg-gradient-to-l from-primary to-[#090814]"
      >
        <h3 id="precos-titulo">Preços</h3>
        <h1 id="precos-subtitulo" className="-mt-6 mb-4">Planos de assinatura</h1>

        {/*CARDS*/}
        <div
          className="flex flex-col lg:flex-row w-full justify-center items-center gap-6"
        >
          {/* 01 */}
          <div
            id="card"
            className="transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center text-center max-w-[350px] min-h-[350px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-sm uppercase text-accent font-bold"
                >plano básico</span>
              <h2 className="mt-3">R$19,90</h2>
              <p className="mt-3 mx-10 flex">
                <CurrencyDollarIcon className="w-6 h-6 color-coin mr-1"/>
                <span className="font-bold mr-1">750 + 50</span>
                <p>GRÁTIS</p>
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                onClick={planBasic}
                id="botao-principal"
                className="py-3 px-12 rounded"
              >
                Comprar
              </button>
            </div>
          </div>

          {/* 02 */}
          <div
            id="card-foco"
            className="transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center text-center max-w-[350px] min-h-[400px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-6 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-md uppercase font-bold"
                >plano plus</span>
              <h2 className="mt-3 scale-150">R$79,90</h2>
              <p className="mt-3 mx-10 flex">
                <CurrencyDollarIcon className="w-6 h-6 color-coin mr-1"/>
                <span className="font-bold mr-1">3550 + 150</span>
                <p>GRÁTIS</p>
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                onClick={planPlus}
                id="botao-principal-var"
                className="py-3 px-12 rounded"
              >
                Comprar
              </button>
            </div>
          </div>

          {/* 03 */}
          <div
            id="card"
            className="transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center text-center max-w-[350px] min-h-[350px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-sm uppercase text-accent font-bold"
                >plano intermediário</span>

              <h2 className="mt-3">R$39,90</h2>
              <p className="mt-3 mx-10 flex">
                <CurrencyDollarIcon className="w-6 h-6 color-coin mr-1"/>
                <span className="font-bold mr-1">1700 + 100</span>
                <p>GRÁTIS</p>
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                onClick={planIntermediary}
                id="botao-principal"
                className="py-3 px-12 rounded"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>

        <p className="text-center max-w-[800px] py-10">
          Impulsione suas vendas com
          <span className="font-bold"> leads qualificados! </span>
          Conecte-se com clientes altamente segmentados e prontos para comprar.
          Economize tempo e aumente suas conversões de forma estratégica.
          Adquira o seu pack agora e comece a vender mais!
        </p>
      </div>
      {/* PRICES - END */}
      <Footer/>
    </>);
};