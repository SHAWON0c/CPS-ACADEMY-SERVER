module.exports = {
  async publicAssignRole(ctx) {
    const { userId, roleName } = ctx.request.body;

    if (!userId || !roleName) {
      return ctx.badRequest('userId and roleName are required');
    }

    // Find the role by name
    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { name: roleName },
    });

    if (!role) {
      return ctx.badRequest('Role not found');
    }

    // Update the user role
    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: userId },
      data: { role: role.id },
    });

    return ctx.send({ message: `Role ${roleName} assigned successfully to user ${userId}` });
  },
};
