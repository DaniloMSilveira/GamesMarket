export class AuthLocalStorage {
    public getToken() {
        return localStorage.getItem('gamesmarket.token');
    }

    public getTokenExpiration() {
        return localStorage.getItem('gamesmarket.tokenExpiration');
    }

    getFieldFromToken(field: string): string {
        const token = localStorage.getItem('gamesmarket.token');
        if (!token) return '';

        const dataToken = JSON.parse(atob(token.split('.')[1]));
        return dataToken[field];
    }
    
    public setTokenInfo(token: string, tokenExpiration: string) {
        localStorage.setItem('gamesmarket.token', token);
        localStorage.setItem('gamesmarket.tokenExpiration', tokenExpiration);
    }

    public getUserInfo(): string {
        return this.getFieldFromToken('user');
    }
    
    public getRole(): string {
        return this.getFieldFromToken('role');
    }
    
    public isAuthenticated(): boolean{
        const token = this.getToken();

        if (!token) {
            return false;
        }

        const expiration = this.getTokenExpiration();
        const expirationDate = new Date(expiration);

        if (expirationDate <= new Date()) {
            return false;
        }

        return true;
    }

    public removeUserInfo() {
        localStorage.removeItem('gamesmarket.token');
        localStorage.removeItem('gamesmarket.tokenExpiration');
        localStorage.removeItem('gamesmarket.user');
    }
}