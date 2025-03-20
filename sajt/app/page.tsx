import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-visible">
      <Hero />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
