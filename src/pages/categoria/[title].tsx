import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.sass";
import "@/styles/categoryPage.sass";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export default function CategoriaPage() {
  const [events, setEvents] = useState([]);

  const router = useRouter();
  const { title } = router.query;

  const getEventsByCategory = async () => {
    try {
      const response = await api.get(`/events/category/${title}`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEventsByCategory();
  }, [events]);

  return (
    <>
      <Header />
      <main>
        <div className="main-content">
          <div className="categories">
            <div className="category-title">
              <h2>{title}</h2>
            </div>

            <div className="card-events">
              <div className="card">
                <div className="card-image"></div>
                <div className="card-title">
                  <h3>Impacto que o useRouter faz no next.js</h3>
                </div>
              </div>

              {/* { events.length > 0 ? events.map((event, index) => (
                <div className="card" key={index}>
                    <div className="card-image"></div>
                    <div className="card-title">
                        <h3>{event.title}</h3>
                    </div>
                </div>
                )) : 
                <div className="card">
                  <div className="card-image"></div>
                  <div className="card-title">
                      <h3>Nenhum evento encontrado</h3>
                  </div>
                </div>
              } */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
