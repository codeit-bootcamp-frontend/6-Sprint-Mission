/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
    //     port: "",
    //     pathname: "/Sprint_Mission/user/28/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
