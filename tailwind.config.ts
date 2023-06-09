import aspectRatio from "@tailwindcss/aspect-ratio"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{css.scss}",
    "./lib/**/*.{ts,tsx}",
    "./utils/**/*.ts"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-space-mono)"]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            a: {
              textDecorationColor: theme("colors.blue.600"),
              textDecorationThickness: "1.5px",
              textUnderlineOffset: "1px"
            },
            h1: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h2: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h3: {
              color: theme("colors.black"),
              fontSize: "1.12em"
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.600")
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            strong: {
              fontWeight: "900"
            },
            img: {
              borderRadius: "0.75rem"
            }
          }
        }
      })
    }
  },
  plugins: [forms, typography, aspectRatio]
}

export default config
