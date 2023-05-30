import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";

import { LocalStorageUtils } from "../storage/local-storage";

export abstract class BaseService {

    protected apiUrlV1: string = environment.apiUrlV1;
    public localStorageUtils = new LocalStorageUtils();

    protected getDefaultHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected getAuthHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorageUtils.getToken()}`
            })
        }
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        console.error(response);
        return throwError(response);
    }
}
