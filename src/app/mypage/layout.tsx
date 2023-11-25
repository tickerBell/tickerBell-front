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
        <div className="flex-col w-full min-h-full px-40 flex-center">
          {children}
        </div>
      </div>
    </>
  )
}