import { Footer, Modal, Navbar } from ".."

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-between">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        <Modal />
      </div>
    </>
  )
}
