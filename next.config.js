/** @type {import('next').NextConfig} */
const isProd = (process.env.NODE_ENV || 'production') === 'production'
const assetPrefix = isProd ? 'template-login-nextjs' : ''
const nextConfig = {
    compiler: {
        removeConsole: {
            exclude: ['error']
        }
    },
    exportPathMap: () => ({
        '/': { page: '/' },
    }),
    assetPrefix: assetPrefix,
}

module.exports = nextConfig
