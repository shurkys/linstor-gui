/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	//output: 'standalone',
	basePath: '/ui',
	trailingSlash: true,
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = nextConfig
