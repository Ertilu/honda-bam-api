const allRoles = {
  user: ['getInventory', 'manageInventory'],
  admin: [
    'getUsers',
    'manageUsers',
    'getInventory',
    'getInStock',
    'getOutStock',
    'manageInventory',
    'manageInStock',
    'manageOutStock',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
