/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["geist"],
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
}

export default config
