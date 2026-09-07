export const mapUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    login: user.login,
    roleId: user.role,
    createdAt: user.createdAt,
  };
};
