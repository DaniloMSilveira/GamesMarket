import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../storage/local-storage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router){}
    
    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.isAuthenticated()){
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUserInfo();

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.navegarAcessoNegado();
                }
                
                let userClaims = user.claims.find(x => x.type === claim.nome);
                
                if(!userClaims){
                    this.navegarAcessoNegado();
                }
                
                let valoresClaim = userClaims.value as string;

                if (!valoresClaim.includes(claim.valor)) {
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;  
    }

    private navegarAcessoNegado() {
        this.router.navigate(['/access-denied']);
    }    
}