import { OrbitalScene } from './components/OrbitalScene';
import { HeroTagline } from './components/HeroTagline';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <main>
        <section className="hero" aria-label="Présentation">
          <HeroTagline />
          <OrbitalScene />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
