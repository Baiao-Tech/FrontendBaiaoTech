import "@/styles/globals.sass";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import MainEvent from "@/pages/eventos/mainEvent";


export default function CategoriaPage() {
  const router = useRouter();
  const { title } = router.query;

  return (
    <>
        {!title ? (
            <div className="main-content">
                <h1>Carregando...</h1>
            </div>
        ) : (
            <> 
                <Header />
                <MainEvent />
                <Footer />
            </>
        )}
    </>
  );
}
