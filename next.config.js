/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: false,
})

const nextConfig = {
	reactStrictMode: false,
}

module.exports = withBundleAnalyzer(nextConfig)
