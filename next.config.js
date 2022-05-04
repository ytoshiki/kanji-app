module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["media.kanjialive.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
