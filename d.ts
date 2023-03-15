declare global {
  const sa_event: (arg: string) => void

  namespace NodeJS {
    interface Global {}
  }
}

export {}
