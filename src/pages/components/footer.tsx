export default function Footer()
{
    return(
        <footer id="footer"
                className="flex flex-col justify-center items-center h-fit w-full p-6 gap-8 bg-secondary text-text border-t-2 border-primary">
       
            <div id="links" className="flex gap-8 pt-5">
                <a className="nav-link text-dark hover:text-[var(--accent-color)]" href="/support">Suporte</a>
                <a className="nav-link text-dark hover:text-[var(--accent-color)]" href="/about">Sobre</a>
                <a className="nav-link text-dark hover:text-[var(--accent-color)]" href="/devs">Devs</a>
            </div>
       
            <div id="icons" className="flex gap-8">
                <a id="footer-icons" href="#">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V16H20V0H0ZM18 2V2.465L10 7.798L2 2.465V2H18ZM2 14V4.869L10 10.203L18 4.869V14H2Z" fill="currentColor" />
                    </svg>
                </a>
                <a id="footer-icons" href="#">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2V0H12V2H6V0H4V2H0V19H18V2H14ZM4 4V6H6V4H12V6H14V4H16V8H2V4H4ZM2 17V10H16V17H2Z" fill="currentColor" />
                    </svg>
                </a>
                <a id="footer-icons" href="#">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="mt-1" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 19.414V0H18V14H5.414L0 19.414ZM4.586 12H16V2H2V14.586L4.586 12ZM5 4H13V6H5V4ZM11 8H5V10H11V8Z" fill="currentColor" />
                    </svg>
                </a>
                <a id="footer-icons" href="#">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.960022L0 3.24602V10.912C0 13.168 1.096 15.297 2.932 16.608L6.838 19.399C7.186 19.646 7.593 19.77 8 19.77C8.407 19.77 8.814 19.646 9.162 19.398L13.068 16.608C14.904 15.297 16 13.168 16 10.912V3.24602L8 0.960022ZM14 10.912C14 12.523 13.217 14.044 11.906 14.981L8 17.771L4.094 14.981C2.783 14.044 2 12.523 2 10.912V4.75402L8 3.04002L14 4.75402V10.912Z" fill="currentColor" />
                    </svg>
                </a>
                <a id="footer-icons" href="#">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM9 10.414V4H11V9.586L14.707 13.293L13.293 14.707L9 10.414Z" fill="currentColor" />
                    </svg>
                </a>
            </div>
       
            <p id="copyright" className="text-sm opacity-50">
                PI 2025 | Todos os direitos reservados | Feito com: Tailwind
            </p>
        </footer>
    )
}