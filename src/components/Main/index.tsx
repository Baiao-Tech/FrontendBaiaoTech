"use client";
import "@/styles/main.sass";
import { useEffect, useState } from "react";
import Image from "next/image";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import arrowRightIcon from "@/assets/arrow-right.svg";
import Link from "next/link";
import LoadingMain from "@/components/loadingMain";
import CategoriesCards from "@/components/categoriesCards";
import { api } from "@/services/api";

interface Event {
  id: number;
  titulo: string;
  data: string;
  localizacao: string;
  imagem: string;
  descricao?: string;
}

export default function Main() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventAwaited, setEventAwaited] = useState<Event | null>(null);
  const [eventsPerPage, setEventsPerPage] = useState(4);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setEventsPerPage(3);
    } else {
      setEventsPerPage(4);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await api.get("/eventos");
      const allEvents: Event[] = response.data.data;
      setEvents(allEvents);

      // Busca o evento com id 12
      const awaited = allEvents.find((event) => event.id === 12);
      setEventAwaited(awaited || null);

      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar os eventos." + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    getAllEvents();

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const visibleEvents = events.slice(
    currentEventIndex,
    currentEventIndex + eventsPerPage
  );

  const handleNextEvents = () => {
    if (currentEventIndex + eventsPerPage < events.length) {
      setCurrentEventIndex(currentEventIndex + eventsPerPage);
    }
  };

  const handlePrevEvents = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - eventsPerPage);
    }
  };

  if (loading) {
    return <LoadingMain />;
  }

  if (events.length === 0) {
    return (
      <main>
        <div className="main-content">
          <CategoriesCards />

          <div className="lastEvents">
            <div className="lastEventsContent">
              <div className="lastEventsTitle-btn">
                <div className="lastEventsTitle">
                  <h2>Próximos Eventos</h2>
                </div>
              </div>

              <div className="card-lastEvents">
                <div className="card">
                  <div className="card-image"></div>

                  <div className="card-body">
                    <div className="card-title">
                      <h3>Não há eventos cadastrados</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return error;
  }

  return (
    <main>
      <div className="main-content">
        <CategoriesCards />

        <div className="lastEvents">
          <div className="lastEventsContent">
            <div className="lastEventsTitle-btn">
              <div className="lastEventsTitle">
                <h2>Próximos Eventos</h2>
              </div>

              <div className="lastEventsBtn">
                <button
                  id="prevBtn"
                  onClick={handlePrevEvents}
                  disabled={currentEventIndex === 0}
                >
                  <Image src={arrowLeftIcon} alt="Anterior" />
                </button>
                <button
                  id="nextBtn"
                  onClick={handleNextEvents}
                  disabled={currentEventIndex + eventsPerPage >= events.length}
                >
                  <Image src={arrowRightIcon} alt="Próximo" />
                </button>
              </div>
            </div>

            <div className="card-lastEvents">
              {visibleEvents.map((category) => (
                <Link
                  href={`/eventos/${category.id}`}
                  className="card"
                  key={category.id}
                >
                  <div className="card-image">
                    <Image
                      src={category.imagem || "/placeholder-image.jpg"}
                      alt={category.titulo}
                      width={300}
                      height={300}
                    />
                  </div>

                  <div className="card-body">
                    <div className="card-data">
                      <h3>{category.data}</h3>
                    </div>

                    <div className="card-title">
                      <h3>{category.titulo}</h3>
                    </div>

                    <div className="card-location">
                      <h3>{category.localizacao}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {eventAwaited && (
          <div className="eventAwaited">
            <div className="eventAwaitedContent">
              <div className="eventAwaitedTitle">
                <h2>Evento mais aguardado</h2>
              </div>

              <div className="card-eventAwaited">
                <div className="card-image">
                  <Image
                    src={eventAwaited.imagem || "/placeholder-image.jpg"}
                    alt={eventAwaited.titulo}
                    width={300}
                    height={300}
                  />
                </div>

                <div className="card-info">
                  <div className="info">
                    <div className="card-data">
                      <h3>{eventAwaited.data}</h3>
                    </div>

                    <div className="card-title">
                      <h3>{eventAwaited.titulo}</h3>
                    </div>

                    <div className="card-description">
                      <p>{eventAwaited.descricao}</p>
                    </div>

                    <div className="card-location">
                      <h3>{eventAwaited.localizacao}</h3>
                    </div>
                  </div>

                  <div className="card-btn">
                    <button>Ver Detalhes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
