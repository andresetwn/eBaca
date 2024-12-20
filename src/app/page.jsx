import Image from "next/image";
import Navbar from "../components/mainpage/navbar";
import Home from "../components/mainpage/home";
import Search from "../components/mainpage/search";
import RekomendasiBuku from "../components/mainpage/rekomendasi";

export default function Main() {
  return (
    <div>
      <main className="h-screen">
        <Navbar />
        <section id="beranda">
          <Home />
        </section>
        <section id="caribuku">
          <Search />
        </section>
        <section id="rekomendasi">
          <RekomendasiBuku />
        </section>
      </main>
    </div>
  );
}
