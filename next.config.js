/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // FIXME: 오류를 피하기 위한 임시 허용
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/...',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/',
      },
    ],
  },
};

module.exports = nextConfig;
