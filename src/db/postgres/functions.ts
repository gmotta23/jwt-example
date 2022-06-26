import { User, database } from ".";

export const UsersDBFunctions = {
  create: (user: User) => {
    return database.addUser(user);
  },
  getByUsername: (username: string) => {
    return database.getUser(username);
  },
  reset: () => {
    database.resetUsers();
  },
};
