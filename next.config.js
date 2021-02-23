module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/:path*' : 'https://giraffeql-api.herokuapp.com/:path*',
      },
    ]
  },
  webpack: (config, { isServer, dev }) => {

    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    config.module.rules.push(
      {
        test: /\.test.js$/,
        loader: 'ignore-loader'
      }
    );

    return config;
}};