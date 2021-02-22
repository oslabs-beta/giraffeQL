module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/:path*' : 'https://giraffeql-api.herokuapp.com/:path*',
      },
    ]
  },
};