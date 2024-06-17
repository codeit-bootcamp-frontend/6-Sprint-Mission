/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
