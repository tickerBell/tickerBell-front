import NavTab from "@/components/NavTab/NavTab"
import Header from "@/components/header/Header"

export default function IsHeadingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="pt-10 m-auto max-w-1200">
        <NavTab />
        {children}
      </div>
    </>
  )
}