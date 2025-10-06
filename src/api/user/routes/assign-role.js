module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/assign-role',
      handler: 'user.assignRole',
      config: {
        auth: true, // must be logged in
      },
    },
  ],
};
