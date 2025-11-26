import Footer from "../components/footer";
import Header from "../components/header";

export default function Plans(){
    return (<>
    <Header/>
{/* PRICES - START */}
      <div
        className="flex flex-col justify-center items-center w-full px-6 py-10 gap-8 text-text bg-gradient-to-b from-primary to-[#0d2434]"
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
            className="flex flex-col justify-center items-center text-center max-w-[350px] min-h-[350px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-sm uppercase text-accent font-bold"
                >plano basico</span>
              <h2 className="mt-3">R$79,90</h2>
              <p className="mt-3 mx-10">
                <span className="font-bold">100 leads</span> qualificadas com os
                seus parâmetros
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                type="submit"
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
            className="flex flex-col justify-center items-center text-center max-w-[350px] min-h-[400px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-6 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-md uppercase text-primary font-bold"
                >plano mestre</span>
              <h2 className="mt-3 scale-150">R$499,90</h2>
              <p className="mt-3 mx-10">
                <span className="font-bold">1000 leads</span> qualificadas com os
                seus parâmetros
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                type="submit"
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
            className="flex flex-col justify-center items-center text-center max-w-[350px] min-h-[350px] w-full"
          >
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-8"
            >
              {/* textos */}
              <span className="text-sm uppercase text-accent font-bold"
                >plano avançado</span>

              <h2 className="mt-3">R$209,90</h2>
              <p className="mt-3 mx-10">
                <span className="font-bold">300 leads</span> qualificadas com os
                seus parâmetros
              </p>
            </div>
            {/* botao */}
            <div className="pb-6">
              <button
                type="submit"
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