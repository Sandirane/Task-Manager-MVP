const hasRole = (user, role) =>
    user.roles.includes(role);

module.exports = hasRole;