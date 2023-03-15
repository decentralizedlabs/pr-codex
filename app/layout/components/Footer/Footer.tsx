import { Container, Social } from "../"

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 text-center bg-white shadow-sm">
      <Container>
        <Social wrapperClassName="flex justify-center" />
      </Container>
    </footer>
  )
}
