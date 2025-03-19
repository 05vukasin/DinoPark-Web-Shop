import Layout from "./components/layout";

export default function HomePage() {
  return (
    <Layout>
      <section id="about" className="py-16 text-center">
        <h1 className="text-4xl font-bold">Dobrodošli u DinoPark!</h1>
        <p className="mt-4 text-lg">
          Najbolje mesto za avanturu i edukaciju o dinosaurima.
        </p>
      </section>

      <section id="hours" className="py-16 text-center">
        <h2 className="text-3xl font-bold">Radno Vreme</h2>
        <p className="mt-2">Ponedeljak - Nedelja: 09:00 - 19:00</p>
      </section>

      <section id="gallery" className="py-16 text-center">
        <h2 className="text-3xl font-bold">Galerija Slika</h2>
        <p className="mt-2">Pogledajte neverovatne slike iz DinoPark-a.</p>
      </section>

      <section id="contact" className="py-16 text-center">
        <h2 className="text-3xl font-bold">Kontakt</h2>
        <p className="mt-2">Nalazimo se na Zlatiboru. Posetite nas!</p>
      </section>
    </Layout>
  );
}
