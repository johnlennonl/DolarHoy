import Navbar from './components/Navbar';
import MotionBackground from './components/MotionBackground';
import DolarCard from './components/DolarCard';
import AppFooter from './components/AppFooter';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100">
      <MotionBackground />
      <Navbar />

      <main className="flex-1">
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <section className="flex flex-col items-center">
            <div className="w-full max-w-3xl">
              <DolarCard />
            </div>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
