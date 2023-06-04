export class LocalStorageUtils {
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

    getFieldFromUserInfo(field: string): string {
        let userInfo = localStorage.getItem('gamesmarket.userInfo');
        if (!userInfo) return '';

        userInfo = JSON.parse(userInfo);
        return userInfo[field];
    }
    
    public setTokenInfo(token: string, tokenExpiration: string, userInfo: string) {
        localStorage.setItem('gamesmarket.token', token);
        localStorage.setItem('gamesmarket.tokenExpiration', tokenExpiration);
        localStorage.setItem('gamesmarket.userInfo', userInfo);
    }

    public getUserName(): string {
        // return this.getFieldFromToken('userName');
        return this.getFieldFromUserInfo('userName');
    }
    
    public getRole(): string {
        return this.getFieldFromToken('profile');
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
        localStorage.removeItem('gamesmarket.userInfo');
    }
}