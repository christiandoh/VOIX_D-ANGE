import { OrbitalScene } from './components/OrbitalScene';
import { HeroTagline } from './components/HeroTagline';
import { TrainingAnnouncement } from './components/TrainingAnnouncement';
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
        <TrainingAnnouncement />
      </main>
      <Footer />
    </>
  );
}

export default App;
