import "@/styles/footer.sass";
import Link from "next/link";
import discordIcon from "@/assets/discord.svg";
import instagramIcon from "@/assets/instagram.svg";
import twitterIcon from "@/assets/twitter.svg";
import linkedinIcon from "@/assets/linkedin.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-top">
          <div className="logo">
            <Link href="/">
              Baião <span>Tech</span>
            </Link>
          </div>
        </div>

        <div className="footer-middle">
          <div className="events">
            <h4>Encontre Eventos</h4>

            <ul className="events-list">
              <li className="events-list-item">
                <Link href="/">Hoje</Link>
              </li>
              <li className="events-list-item">
                <Link href="/">Amanhã</Link>
              </li>
              <li className="events-list-item">
                <Link href="/">Esta semana</Link>
              </li>
              <li className="events-list-item">
                <Link href="/">Este fim de semana</Link>
              </li>
              <li className="events-list-item">
                <Link href="/">Próxima semana</Link>
              </li>
              <li className="events-list-item">
                <Link href="/">Este mês</Link>
              </li>
            </ul>
          </div>

          <div className="category">
            <h4>Categorias</h4>

            <ul className="category-list">
              <li className="category-list-item">
                <Link href="/">Frontend</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Backend</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Mobile</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">DevOps</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Analise de Dados</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">IA</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">UI/UX</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Gestão de Projetos</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Marketing</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Inovação & Gestão</Link>
              </li>
              <li className="category-list-item">
                <Link href="/">Games</Link>
              </li>
            </ul>
          </div>

          <div className="forCollaborator">
            <h4>Para Colaboradores</h4>

            <ul className="forCollaborator-list">
              <li className="forCollaborator-list-item">
                <Link href="/">Indique seu evento</Link>
              </li>
              <li className="forCollaborator-list-item">
                <Link href="/">Entre no Discord</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-top">
            <div className="nav-footer">
              <Link href="/">Home</Link>
              <Link href="/">Termos e Políticas</Link>
              <Link href="/">Ética e conduta</Link>
              <Link href="/">Política de Direitos Humanos</Link>
            </div>

            <div className="social">
              <Link href="/">
                <Image src={discordIcon} alt="Discord" />
              </Link>
              <Link href="/">
                <Image src={instagramIcon} alt="Instagram" />
              </Link>
              <Link href="/">
                <Image src={twitterIcon} alt="Twitter" />
              </Link>
              <Link href="/">
                <Image src={linkedinIcon} alt="LinkedIn" />
              </Link>
            </div>
          </div>

          <div className="footer-bottom-bottom">
            <p>Baião Tech Community. © Copyright 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
