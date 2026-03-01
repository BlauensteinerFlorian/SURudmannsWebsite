module.exports = async () => {
  // Set public permissions for all content types
  const contentTypes = [
    'api::player.player',
    'api::game.game', 
    'api::article.article',
    'api::event.event',
    'api::sponsor.sponsor',
    'api::team-member.team-member'
  ];

  // Find or create the Public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' }
  });

  if (!publicRole) {
    console.log('Public role not found');
    return;
  }

  // Get all existing permissions for public role
  const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id }
  });

  // Remove existing permissions for our content types
  for (const perm of existingPermissions) {
    if (contentTypes.includes(perm.type)) {
      await strapi.query('plugin::users-permissions.permission').delete({
        where: { id: perm.id }
      });
    }
  }

  // Create new permissions for each content type
  const actions = ['find', 'findOne', 'create', 'update', 'delete'];
  
  for (const contentType of contentTypes) {
    for (const action of actions) {
      try {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::${contentType.split('.')[1]}.${action}`,
            type: contentType,
            role: publicRole.id,
            enabled: true
          }
        });
        console.log(`✓ Permission granted: ${contentType}.${action}`);
      } catch (e) {
        // Ignore duplicates
      }
    }
  }

  console.log('✅ All API permissions granted!');
};
