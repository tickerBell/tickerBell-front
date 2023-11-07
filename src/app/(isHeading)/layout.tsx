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
      {children}
    </>
  )
}