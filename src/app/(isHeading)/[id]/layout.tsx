import NavTab from "@/components/NavTab/NavTab"
import Header from "@/components/header/Header"

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}