import { User, Users } from ".";

export const UsersDBFunctions = {
  create: (user: User) => {
    Users.push(user);
  },
  getByUsername: (username: string) => {
    return Users.find((user: User) => user.username === username);
  },
};
