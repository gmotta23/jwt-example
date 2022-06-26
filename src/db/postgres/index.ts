export interface User {
  username: string;
  password: string;
}

class Database {
  Users: User[] = [];

  addUser(user: User) {
    try {
      this.Users.push(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  getUser(username: string) {
    return this.Users.find((user: User) => user.username === username);
  }

  resetUsers() {
    this.Users = [];
  }
}

export const database = new Database();
