"use client";
import "@/styles/mainEvent.sass";
import { useRouter } from "next/router";
import { nextEvents } from "@/components/nextEvents";

export default function MainEvent() {
    const router = useRouter();
    const { title } = router.query;

    const event = nextEvents.find((event) => event.title === title);

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
            <div className="main-content">
                <div className="content-image"></div>

                <div className="content-info">
                    <div className="content-title">
                        <h1>{event.title}</h1>
                    </div>

                    <div className="content-details">
                        <p><span>Data:</span> {event.date}</p>
                        <p><span>Local:</span> {event.location}</p>
                    </div>

                    <div className="content-description">
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
