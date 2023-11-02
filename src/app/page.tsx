import NavTab from "@/components/NavTab/NavTab";
import SlideList from "@/components/SlideList/SlideList";
import Header from "@/components/header/Header";
import Location from "@/components/location/Location";

export default function Home() {
  return (
    <main className="max-w-1200 m-auto">
      <Location />
      <Header />
      <NavTab />
      <SlideList />
      {/* <List data={ticketDummyData} /> */}

    </main>
  )
}
