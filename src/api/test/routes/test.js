'use strict';

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/random',
      handler: 'test.randomMessage',
      config: {
        auth: false, // public route
      },
    },
  ],
};
