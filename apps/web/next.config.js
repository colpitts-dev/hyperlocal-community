module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@evoke-ui/react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
    ],
  },
}
