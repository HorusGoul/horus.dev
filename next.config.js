module.exports = {
  images: {
    domains: ['thepracticaldev.s3.amazonaws.com', 'localhost'],
  },

  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
};
