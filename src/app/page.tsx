import NavTab from "@/components/NavTab/NavTab";
import SlideList from "@/components/SlideList/SlideList";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="pt-10 m-auto max-w-1280">
        <NavTab />
        <SlideList />
      </div>
    </main>
  )
}
