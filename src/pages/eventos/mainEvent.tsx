"use client";
import "@/styles/mainEvent.sass";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface Event {
  genero: string;
  data: string;
  local: string;
  descricao: string;
  organizacao: string;
  valor: string;
  link_compra: string;
  imagem: string;
}

export default function MainEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { genero } = router.query;

  const event = events.find((event) => event.genero === genero);

  const getEventByGender = async () => {
    try {
      const response = await api.get<Event[]>(
        "/eventos/filter?genero=" + genero
      );
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erro ao carregar os eventos." + err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventByGender();
  }, [genero]);

  if (loading) {
    return (
      <main>
        <div className="main-content">
          <h1>Carregando...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="main-content">
          <h1>{error}</h1>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main>
        <div className="main-content">
          <h1>Evento não encontrado</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-content">
          <div className="content-image"></div>

          <div className="content-info">
            <div className="content-title">
              <h1>{event.genero}</h1>
            </div>

            <div className="content-details">
              <p>
                <span>Data:</span> {event.data}
              </p>
              <p>
                <span>Local:</span> {event.local}
              </p>
            </div>

            <div className="content-description">
              <p>{event.descricao}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
