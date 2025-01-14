"use client";
import "@/styles/main.sass";
import { useEffect, useState } from "react";
import { categories } from "@/components/categories";
import Image from "next/image";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import arrowRightIcon from "@/assets/arrow-right.svg";
import { nextEvents } from "@/components/nextEvents";
import Link from "next/link";

export default function Main() {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [eventsPerPage, setEventsPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setItemsPerPage(3);
      setEventsPerPage(3);
    } else {
      setItemsPerPage(6);
      setEventsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage(); // Configura no início
    window.addEventListener("resize", updateItemsPerPage); // Recalcula ao redimensionar

    return () => {
      window.removeEventListener("resize", updateItemsPerPage); // Remove o listener ao desmontar
    };
  }, []);

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const visibleEvents = nextEvents.slice(
    currentEventIndex,
    currentEventIndex + eventsPerPage
  );

  const handleNextCategories = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };
  
  const handlePrevCategories = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleNextEvents = () => {
    if (currentEventIndex + eventsPerPage < nextEvents.length) {
      setCurrentEventIndex(currentEventIndex + eventsPerPage);
    }
  };

  const handlePrevEvents = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - eventsPerPage);
    }
  };

  return (
    <main>
      <div className="main-content">
        <div className="categories">
            <div className="category-content">
              <div className="category-title-btn">
                <div className="category-title">
                  <h2>Categorias</h2>
                </div>
                <div className="category-btn">
                  <button
                    id="prevBtn"
                    onClick={handlePrevCategories}
                    disabled={currentIndex === 0}
                  >
                    <Image src={arrowLeftIcon} alt="Anterior" />
                  </button>
                  <button
                    id="nextBtn"
                    onClick={handleNextCategories}
                    disabled={currentIndex + itemsPerPage >= categories.length}
                  >
                    <Image src={arrowRightIcon} alt="Próximo" />
                  </button>
                </div>
              </div>
              <div className="card-categories">
                {visibleCategories.map((category) => (
                  <Link href={`/categoria/${category.title}`} key={category.id} className="card" >
                    <div className="card-image"></div>
                    <div className="card-title">
                      <h3>{category.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
                  disabled={
                    currentEventIndex + eventsPerPage >= categories.length
                  }
                >
                  <Image src={arrowRightIcon} alt="Próximo" />
                </button>
              </div>
            </div>

            <div className="card-lastEvents">
              {visibleEvents.map((category) => (
                <Link href={`/evento/${category.title}`} className="card" key={category.id}>
                  <div className="card-image"></div>

                  <div className="card-body">
                    <div className="card-data">
                      <h3>{category.date}</h3>
                    </div>

                    <div className="card-title">
                      <h3>{category.title}</h3>
                    </div>

                    <div className="card-location">
                      <h3>{category.location}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="eventAwaited">
          <div className="eventAwaitedContent">
            <div className="eventAwaitedTitle">
              <h2>Evento mais aguardado</h2>
            </div>

            <div className="card-eventAwaited">
              <div className="card-image"></div>

              <div className="card-info">
                <div className="info">
                  <div className="card-data">
                    <h3>MAI 16 a MAI 18 - 08:00 as 20:00</h3>
                  </div>

                  <div className="card-title">
                    <h3>IA - Inteligência Artificial</h3>
                  </div>

                  <div className="card-description">
                    <p>
                      Introdução, Conteitos, Beneficios e Maleficios da
                      Inteligência Artificial no cotidiano
                    </p>
                  </div>

                  <div className="card-location">
                    <h3>Centro de Eventos - Fortaleza, CE</h3>
                  </div>
                </div>

                <div className="card-btn">
                  <button>Ver Detalhes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
