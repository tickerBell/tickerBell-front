import NavTab from "@/components/NavTab/NavTab";
import SlideList from "@/components/SlideList/SlideList";
import Header from "@/components/header/Header";
import Location from "@/components/location/Location";

export default function Home() {
  return (
    <main className="">
      <Location />
      <Header />
      <div className="pt-10 m-auto max-w-1280">
        <NavTab />
        <SlideList />
      </div>
      {/* <List data={ticketDummyData} /> */}
    </main>
  )
}
