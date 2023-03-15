import { Container } from "../layout/components"

export default function Homepage() {
  return (
    <Container page={true}>
      <main className="max-w-screen-lg mx-auto space-y-12 text-center">
        <div>
          <h1>dlabs template</h1>
        </div>
      </main>
    </Container>
  )
}
