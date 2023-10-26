import NavTab from "@/components/NavTab/NavTab";
import Header from "@/components/header/Header";
import List from "@/components/list/List";
import Location from "@/components/location/Location";
import { ticketDummyData } from "@/dummyData/DummyData";

export default function Home() {
  return (
    <main className="max-w-1200 m-auto">
      <Location />
      <Header />
      <NavTab />
      <List />
      {/* <List data={ticketDummyData} /> */}

    </main>
  )
}
