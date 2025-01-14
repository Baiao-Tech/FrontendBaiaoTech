"use client";
import Image from "next/image"
import locationIcon from "@/assets/pin.svg";
import chevronBottomIcon from "@/assets/chevron-bottom.svg";
import "@/styles/header.sass";
import Link from "next/link";
import menuIcon from "@/assets/menu.svg";
import closeMenuIcon from "@/assets/menu_close.svg";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <Link href="/">Baião <span>Tech</span></Link>
                </div>

                <div className="actions" style={{ display: menuOpen ? "none" : "flex" }}>
                    <div className="location">
                        <button>
                            <Image src={locationIcon} alt="Icone de Localização" width={14} />
                            <span>Qualquer Lugar</span>
                            <Image src={chevronBottomIcon} alt="Icone de seta para baixo" width={14} />
                        </button>
                    </div>

                    <div className="indicatEvent">
                        <Link href="/">INDIQUE UM EVENTO</Link>
                    </div>
                </div>

                <div className="menu-mobile">
                    <button id="menuOpen" onClick={handleMenuOpen}>
                        <Image src={menuIcon} alt="Menu Icon" />
                    </button>

                    <button id="menuClose" onClick={handleMenuOpen}>
                        <Image src={closeMenuIcon} alt="Close menu Icon" />
                    </button>
                </div>
            </div>
        </header>
    )
}