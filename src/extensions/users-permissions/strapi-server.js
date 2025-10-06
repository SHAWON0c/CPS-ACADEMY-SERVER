'use strict';

module.exports = (plugin) => {
  const originalCreate = plugin.controllers.user.create;

  plugin.controllers.user.create = async (ctx) => {
    // Create the user first (using original Strapi logic)
    const response = await originalCreate(ctx);

    try {
      const user = response?.user || response;
      if (!user) return response;

      // Fetch full role info
      const role = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { id: user.role.id } });

      // If role is Student → create Student collection entry
      if (role?.name === 'Student') {
        await strapi.db.query('api::student.student').create({
          data: {
            name: user.username,
            email: user.email,
            user: user.id, // relation to the user
          },
        });
        strapi.log.info(`✅ Added Student record for: ${user.username}`);
      }
    } catch (error) {
      strapi.log.error('❌ Failed to add Student record:', error);
    }

    return response;
  };

  return plugin;
};
