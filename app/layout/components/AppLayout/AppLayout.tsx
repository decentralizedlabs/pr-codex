import { Footer, Modal, Navbar } from ".."

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <Modal />
      </div>
    </>
  )
}
