export class TokenSessionStorage {
  private static key = 'token';
  static setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }
  static getToken() {
    return localStorage.getItem(this.key);
  }
  static clearToken() {
    localStorage.removeItem(this.key);
  }
}
