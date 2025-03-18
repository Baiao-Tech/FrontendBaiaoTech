import CategoriasCarousel from "@/components/CategoriasCarousel";
import ProximosEventos from "@/components/ProximosEventos";

export default function Main() {
  return (
    <main className="w-full flex justify-center items-start bg-stone-950">
      <div className="w-7xl h-full flex flex-col justify-start items-start p-3">
        <CategoriasCarousel />

        <ProximosEventos />
      </div>
    </main>
  );
}
