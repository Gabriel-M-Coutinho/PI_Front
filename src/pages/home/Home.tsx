import Header from "../components/header";
import Footer from "../components/footer";
import { redirect, useNavigate } from "react-router-dom";
import { InputMask, type MaskOptions } from '@react-input/mask';

export default function Home({
  cnpj}: any
  
) {
  const navigate  = useNavigate()
  const handleClick= ()=>{
    navigate(`/lead/${cnpj}`)
  }

  const cnpjMaskOptions: MaskOptions = {
      mask: "cc.ccc.ccc/cccc-cc",
      replacement: { "c": /\d/ }
    };

  return (
  <>
      <div className="min-h-screen bg-gradient-to-l from-primary to-[#090814]">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen text-center pb-20">

          {/* LOGO */}
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="w-16 md:w-24">
              <svg width="auto" height="auto" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.75 33.8H81.3416C83.5227 38.9782 82.5653 45.21 78.4197 49.431L55 73.2765V81.4C55 86.0392 58.6936 89.8 63.25 89.8H101.75C106.306 89.8 110 86.0392 110 81.4V42.2C110 37.5607 106.306 33.8 101.75 33.8ZM82.5 66C80.2227 66 78.375 64.1187 78.375 61.8C78.375 59.4795 80.2227 57.6 82.5 57.6C84.7773 57.6 86.625 59.4795 86.625 61.8C86.625 64.1187 84.7773 66 82.5 66ZM74.5302 33.3275L44.4641 2.7147C41.1709 -0.638299 35.8308 -0.638299 32.5377 2.7147L2.46984 33.3275C-0.823281 36.6805 -0.823281 42.1177 2.46984 45.4707L32.5359 76.0852C35.8291 79.4382 41.1692 79.4382 44.4623 76.0852L74.5302 45.4725C77.8233 42.1177 77.8233 36.6805 74.5302 33.3275ZM16.5 43.6C14.2227 43.6 12.375 41.7187 12.375 39.4C12.375 37.0795 14.2227 35.2 16.5 35.2C18.7773 35.2 20.625 37.0795 20.625 39.4C20.625 41.7187 18.7773 43.6 16.5 43.6ZM38.5 66C36.2227 66 34.375 64.1187 34.375 61.8C34.375 59.4795 36.2227 57.6 38.5 57.6C40.7773 57.6 42.625 59.4795 42.625 61.8C42.625 64.1187 40.7773 66 38.5 66ZM38.5 43.6C36.2227 43.6 34.375 41.7187 34.375 39.4C34.375 37.0795 36.2227 35.2 38.5 35.2C40.7773 35.2 42.625 37.0795 42.625 39.4C42.625 41.7187 40.7773 43.6 38.5 43.6ZM38.5 21.2C36.2227 21.2 34.375 19.3187 34.375 17C34.375 14.6795 36.2227 12.8 38.5 12.8C40.7773 12.8 42.625 14.6795 42.625 17C42.625 19.3187 40.7773 21.2 38.5 21.2ZM60.5 43.6C58.2227 43.6 56.375 41.7187 56.375 39.4C56.375 37.0795 58.2227 35.2 60.5 35.2C62.7773 35.2 64.625 37.0795 64.625 39.4C64.625 41.7187 62.7773 43.6 60.5 43.6Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 id="logo-texto" className="mt-6">LeadSearch</h3>
          </div>

          <h1 className="mb-4">
            Potencialize suas vendas com leads qualificados
          </h1>
          <form id="form-pesquisa" className="max-w-[70%] mb-4 w-full">
          <label
            id="pesquisa"
            className="mb-2 text-sm font-medium sr-only"
            >Search</label>
          <div className="relative">
            <div
              className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none"
            >
              <svg
                className="w-4 h-4 -mt-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <InputMask
              mask={cnpjMaskOptions.mask}
              replacement={cnpjMaskOptions.replacement}
              type="search"
              id="area-pesquisa"
              className="block w-full p-4 ps-12 text-sm rounded-lg h-12"
              placeholder="Procurar pelo CNPJ..."
            />
            <button
              onClick={handleClick}
              className="bg-indigo-600 hover:bg-indigo-500 absolute end-2 bottom-2.5 rounded-lg text-sm px-4 py-1.5 font-semibold"
            >
              Buscar
            </button>
          </div>
        </form>

          <a href="/search">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 end-2 bottom-2.5 rounded-lg text-sm px-4 py-2 font-semibold">
              Pesquisa avançada
            </button>
          </a>

          <a href="/about" className="hover:no-underline text-lg opacity-50 hover:opacity-100 mt-3">
            O que é um lead?
          </a>
        </div>
      </div>
      <Footer />
  </>
)}
