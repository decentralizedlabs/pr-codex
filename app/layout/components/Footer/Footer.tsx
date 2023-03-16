import { Container, Social } from "../"

export default function Footer() {
  return (
    <footer className="relative z-20 py-8 text-center shadow-sm">
      <Container>
        <Social wrapperClassName="flex justify-center text-gray-400" />
        <p className="pt-3 text-sm text-gray-400">
          Made by{" "}
          <a
            className="font-bold "
            href="https://dlabs.app"
            target="_blank"
            rel="noreferrer"
          >
            dlabs
          </a>
        </p>
      </Container>
    </footer>
  )
}
