import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <main>
      {/* Your app code goes here */}
      <img className="absolute top-0 right-0 opacity-60 -z-10" src="/gradient.png" alt="Gradient Background" />

      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_30px_#e99b63] -rotate-[30deg] -z-10"></div>
      <Header />
      <Hero />
    </main>
  );
}
