module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.purchasedBy) {
      // Filter only users with "Student" role
      const students = await strapi.db.query('plugin::users-permissions.user').findMany({
        where: {
          id: { $in: data.purchasedBy },
          role: { name: 'Student' },
        },
      });

      // Replace purchasedBy with only students
      data.purchasedBy = students.map((s) => s.id);
    }
  },
};
