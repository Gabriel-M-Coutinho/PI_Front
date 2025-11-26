import Footer from "../components/footer";
import Header from "../components/header";

export default function Support() {
    return (<>
    <Header/>
        
<div className="isolate bg-gradient-to-l from-primary to-[#090814] px-6 sm:py-24">
  <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
    <div
  style={{
    clipPath:
      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
  }}
  className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
></div>

  </div>
  <div className="mx-auto max-w-2xl text-center">
    <h3>Contato</h3>
    <p className="mt-2 text-lg/8 text-gray-400">Envie sua dúvida para podermos te ajudar!</p>
  </div>
  <form className="mx-auto mt-16 max-w-xl sm:mt-20">
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="block text-lg font-semibold">Email</label>
        <div className="mt-2.5">
          <input
  type="email"
  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white 
             border border-white/10 
             focus:border-indigo-500 
             placeholder:text-gray-500"
/>

        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-lg font-semibold">Assunto</label>
        <div className="mt-2.5">
<input
  type="text"
  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white 
             border border-white/10 
             focus:border-indigo-500 
             placeholder:text-gray-500"
/>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-lg font-semibold">Corpo</label>
        <div className="mt-2.5">
          <textarea className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white 
             border border-white/10 
             focus:border-indigo-500 
             placeholder:text-gray-500"></textarea>
        </div>
      </div>
      
    </div>
    <div className="mt-10">
      <button type="submit" className="mx-auto block rounded-md bg-indigo-500 px-3.5 w-[40%] py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Enviar</button>
    </div>
  </form>
</div>

    <Footer/>
    </>);
};