module.exports = {
  images: {
    domains: [
      'thepracticaldev.s3.amazonaws.com',
      'horus-dev-media.s3.amazonaws.com',
      'dev-to-uploads.s3.amazonaws.com',
      'localhost',
    ],
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
