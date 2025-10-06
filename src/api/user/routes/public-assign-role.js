module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/public-assign-role',
      handler: 'user.publicAssignRole',
      config: {
        auth: false, // No auth required
      },
    },
  ],
};
