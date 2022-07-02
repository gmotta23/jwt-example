import bcrypt from "bcryptjs";

export class BCryptService {
  public static async hash(s: string) {
    return await bcrypt.hash(s, 10);
  }
  public static async compare(s: string, hash: string) {
    return await bcrypt.compare(s, hash);
  }
}
