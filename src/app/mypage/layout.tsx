import NavTab from "@/components/NavTab/NavTab"
import Header from "@/components/header/Header"
import { SideBar } from "@/components/sidebar/SideBar"

export default function IsHeadingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div>
          {children}
        </div>
      </div>
    </>
  )
}