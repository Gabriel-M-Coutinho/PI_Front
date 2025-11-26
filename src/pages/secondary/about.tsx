import Footer from "../components/footer";
import Header from "../components/header";

export default function About()
{
    return(<>
      <Header/>
        <div
        className="min-h-screen w-full h-full flex flex-col items-center bg-gradient-to-l from-primary to-[#090814]"
      >
        <section
          id="sobre"
          className="flex flex-row h-fit w-full max-w-[850px] pt-12"
        >
          <div
            className="flex border border-gray-500 flex-col justify-center items-center text-center w-full max-w-[800px] rounded-xl min-h-[350px] p-10"
          >
            <div className="flex flex-row items-center gap-8 pb-10">
              <svg
              width="70px"
              height="70px"
              viewBox="0 0 71 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.0919 21.9166H50.8778C52.1832 24.9604 51.6102 28.6234 49.1291 31.1045L35.1128 45.1208V49.8958C35.1128 52.6227 37.3233 54.8333 40.0503 54.8333H63.0919C65.8189 54.8333 68.0294 52.6227 68.0294 49.8958V26.8541C68.0294 24.1272 65.8189 21.9166 63.0919 21.9166ZM51.5711 40.8437C50.2081 40.8437 49.1024 39.7379 49.1024 38.375C49.1024 37.011 50.2081 35.9062 51.5711 35.9062C52.9341 35.9062 54.0399 37.011 54.0399 38.375C54.0399 39.7379 52.9341 40.8437 51.5711 40.8437ZM46.8013 21.6389L28.8072 3.64479C26.8363 1.6739 23.6403 1.6739 21.6694 3.64479L3.67427 21.6389C1.70338 23.6098 1.70338 26.8058 3.67427 28.7767L21.6684 46.7718C23.6393 48.7427 26.8353 48.7427 28.8061 46.7718L46.8013 28.7777C48.7722 26.8058 48.7722 23.6098 46.8013 21.6389ZM12.0711 27.677C10.7081 27.677 9.60236 26.5712 9.60236 25.2083C9.60236 23.8443 10.7081 22.7395 12.0711 22.7395C13.4341 22.7395 14.5399 23.8443 14.5399 25.2083C14.5399 26.5712 13.4341 27.677 12.0711 27.677ZM25.2378 40.8437C23.8748 40.8437 22.769 39.7379 22.769 38.375C22.769 37.011 23.8748 35.9062 25.2378 35.9062C26.6007 35.9062 27.7065 37.011 27.7065 38.375C27.7065 39.7379 26.6007 40.8437 25.2378 40.8437ZM25.2378 27.677C23.8748 27.677 22.769 26.5712 22.769 25.2083C22.769 23.8443 23.8748 22.7395 25.2378 22.7395C26.6007 22.7395 27.7065 23.8443 27.7065 25.2083C27.7065 26.5712 26.6007 27.677 25.2378 27.677ZM25.2378 14.5104C23.8748 14.5104 22.769 13.4046 22.769 12.0416C22.769 10.6776 23.8748 9.57288 25.2378 9.57288C26.6007 9.57288 27.7065 10.6776 27.7065 12.0416C27.7065 13.4046 26.6007 14.5104 25.2378 14.5104ZM38.4044 27.677C37.0415 27.677 35.9357 26.5712 35.9357 25.2083C35.9357 23.8443 37.0415 22.7395 38.4044 22.7395C39.7674 22.7395 40.8732 23.8443 40.8732 25.2083C40.8732 26.5712 39.7674 27.677 38.4044 27.677Z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
              <h3 className="text-4xl font-bold text-text">Sobre nós</h3>
            </div>
            <p className="text-lg text-text">
              <span>Nós da </span>
              <span className="font-bold">LeadSearch </span> 
              buscamos oferecer soluções inovadoras para aqueles que buscam Leads de alta qualidade! <br></br><br></br>

              Diferentemente de empresas que vendem grandes volumes de Leads genéricos, a equipe se especializou em fornecer pacotes de Leads altamente
              segmentados, de acordo com as necessidades específicas dos nossos clientes. <br></br><br></br>
              
              Com a nossa plataforma, você pode adquirir Leads de uma cidade, bairro ou até mesmo um segmento de mercado específico, 
              garantindo uma abordagem mais assertiva e eficaz para suas campanhas
            </p>
          </div>
        </section>

        <section
          id="about-lead"
          className="flex xl:flex-row flex-col items-center justify-center h-fit w-full py-20 px-6 gap-8"
        >
          <div
            id="card"
            className="flex flex-col justify-center items-center text-center w-full max-w-[800px] rounded-xl min-h-[350px] p-10"
          >
            <div className="flex flex-row items-center gap-2">
              <svg
                fill="currentColor"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M5,21H19a2.006,2.006,0,0,0,2-2V9a2.006,2.006,0,0,0-2-2H17V5a2,2,0,0,0-2-2H9A2,2,0,0,0,7,5V7H5A2.006,2.006,0,0,0,3,9V19A2.006,2.006,0,0,0,5,21ZM9,5.5A.5.5,0,0,1,9.5,5h5a.5.5,0,0,1,.5.5V7H9ZM5,10.8l6.594,2.93a1,1,0,0,0,.812,0L19,10.8v2.188l-6.594,2.931a1,1,0,0,1-.812,0L5,12.983Z"
                  ></path>
                </g>
              </svg>
              <h2 className="mt-2">O que é um Lead?</h2>
            </div>
            <p className="mt-3">
              Um Lead é uma pessoa ou empresa que pode ter um interesse sobre os
              seus serviços. <br></br><br></br>Esse interesse pode ser demonstrado através de
              ações como preencher um formulário, se inscrever em uma newsletter
              ou interagir com o conteúdo da empresa. <br></br><br></br>Em marketing, o objetivo é
              transformar Leads em clientes ao nutrir esse relacionamento,
              oferecendo informações relevantes e personalizadas.
            </p>
          </div>

          <div
            id="card"
            className="flex flex-col justify-center items-center text-center w-full max-w-[800px] rounded-xl min-h-[350px] p-10"
          >
            <div className="flex flex-row items-center gap-2">
              <svg
                fill="currentColor"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M22,9V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V18H19.5a.5.5,0,0,0,.5-.5V8h1A1,1,0,0,1,22,9ZM2,15V5A1,1,0,0,1,3,4H17a1,1,0,0,1,1,1V15a1,1,0,0,1-1,1H3A1,1,0,0,1,2,15Zm11-5a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2H14A1,1,0,0,0,13,10ZM8,10a2,2,0,1,0,2-2A2,2,0,0,0,8,10ZM4,10a1,1,0,0,0,1,1H6A1,1,0,0,0,6,9H5A1,1,0,0,0,4,10Z"
                  ></path>
                </g>
              </svg>

              <h2 className="mt-2">Por que Comprar Conosco?</h2>
            </div>
            <p className="mt-3">
              Comprar com a nossa equipe significa optar por qualidade, confiança e
              resultados, pois a sua empresa se conectará com as melhores oportunidades de
              negócios de forma estratégica e assertiva.
              
              <br></br><br></br>Nosso compromisso é oferecer soluções personalizadas
              para gerar e qualificar Leads de maneira eficiente, ajudando os seus negócios a alcançarem o público certo 
              e a aumentar as vendas dos nossos usuários.
            </p>
          </div>
        </section>
      </div>
      <Footer/>
    </>)
}