"use client";

import "@/styles/globals.sass";
import "@/styles/eventPage.sass";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Event {
  titulo: string;
  genero: string;
  data: string;
  localizacao: string;
  descricao: string;
  imagem: string;
}

export default function EventPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/eventos/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      setError("Erro ao carregar o evento. " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <div className="main-container">
          {loading && (
            <div className="main-content">
              <h3>Carregando...</h3>
            </div>
          )}
          {error && (
            <div className="main-content">
              <h1>{error}</h1>
            </div>
          )}
          {!loading && !error && event && (
            <div className="main-content">
              <div className="content-image">
                <Image
                  src={event.imagem || "/placeholder-image.jpg"}
                  alt={event.titulo || "Imagem indisponível"}
                  width={500}
                  height={500}
                />
              </div>

              <div className="content-info">
                <div className="content-title">
                  <div className="title">
                    <h1>{event.titulo}</h1>
                  </div>

                  <div className="genre">
                    <p><span>Genero: </span> {event.genero}</p>
                  </div>

                  <div className="price">
                    <p>
                      <span>Preço:</span> Gratuito
                    </p>
                  </div>

                  <div className="btn-subscribe">
                    <button id="subscribe-button">Comprar ingresso</button>
                  </div>
                </div>

                <div className="content-details">
                  <div className="event-data">
                    <p>
                      <span>Data:</span> {event.data}
                    </p>
                  </div>

                  <div className="event-organizer">
                    <p>
                      <span>Organizador:</span> {event.genero}
                    </p>
                  </div>

                  <div className="localization">
                    <p>
                      <span>Local:</span> {event.localizacao}
                    </p>
                  </div>
                </div>

                <div className="content-description">
                  <div className="description-title">
                    <h2>Descrição</h2>
                  </div>

                  <div className="description-text">
                    <p>{event.descricao}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
