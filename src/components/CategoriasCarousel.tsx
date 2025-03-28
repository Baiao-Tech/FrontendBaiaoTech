"use client";

import { categorias } from "./categorias";
import ArrowLeftIcon from "@/assets/arrow-left.svg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriasCarousel() {
  const [categoriaAtualIndex, setCategoriaAtualIndex] = useState(0);
  const [itemsPorPagina, setItemsPorPagina] = useState(8);
  const [carregando, setCarregando] = useState(true);

  const updateItemsPerPage = () => {
    const largura = window.innerWidth;
    if (largura <= 425) setItemsPorPagina(3);
    else if (largura <= 768) setItemsPorPagina(4);
    else if (largura <= 1024) setItemsPorPagina(6);
    else if (largura <= 1200) setItemsPorPagina(8);
    else setItemsPorPagina(8);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    const timeout = setTimeout(() => setCarregando(false), 1500);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
      clearTimeout(timeout);
    };
  }, []);

  const visibleCategories = categorias.slice(
    categoriaAtualIndex,
    categoriaAtualIndex + itemsPorPagina
  );

  const handleNextCategories = () => {
    if (categoriaAtualIndex + itemsPorPagina < categorias.length) {
      setCategoriaAtualIndex(categoriaAtualIndex + itemsPorPagina);
    }
  };

  const handlePrevCategories = () => {
    if (categoriaAtualIndex > 0) {
      setCategoriaAtualIndex(categoriaAtualIndex - itemsPorPagina);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-16 flex justify-between items-center">
        <p className="text-2xl text-slate-900 font-bold">Categorias</p>

        <div className="flex gap-4">
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] shadow transition disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handlePrevCategories}
            disabled={categoriaAtualIndex === 0}
          >
            <Image src={ArrowLeftIcon} alt="Anterior" className="size-full" />
          </button>
          <button
            className="size-7 p-1.5 rounded-2xl bg-[#e6e6e7] shadow transition disabled:bg-[rgba(0,0,0,.3)]"
            onClick={handleNextCategories}
            disabled={categoriaAtualIndex + itemsPorPagina >= categorias.length}
          >
            <Image src={ArrowRightIcon} alt="Próximo" className="size-full" />
          </button>
        </div>
      </div>

      <div className="w-full flex gap-3 mt-4">
        {carregando
          ? Array.from({ length: itemsPorPagina }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-[180px] h-[150px] rounded-2xl bg-[#e6e6e7]"
              />
            ))
          : visibleCategories.map((category) => (
              <Link
                href={`/categoria/${category.nome}`}
                key={category.id}
                className="w-[180px] h-[150px] flex items-center justify-center rounded-2xl transition"
              >
                <div className="w-full h-full flex justify-center items-center bg-[#e6e6e7] shadow rounded-2xl hover:bg-orange-500">
                  <h3 className="text-sm text-slate-900 font-bold">
                    {category.nome}
                  </h3>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
