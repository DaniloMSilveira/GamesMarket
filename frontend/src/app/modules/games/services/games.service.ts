import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formatDateFormData } from '../../../shared/utils';
import { Game, GameDetails, GameMainPage } from '../models/games.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  get(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<Game[]>(this.apiUrlV1, {observe: 'response', params});
  }

  public getHomePageGames(): Observable<GameMainPage>{
    return this.http.get<GameMainPage>(this.apiUrlV1);
  }

  getById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrlV1}/${id}`);
  }

  create(game: GameDetails){
    const formData = this.buildFormData(game);
    return this.http.post(this.apiUrlV1, formData);
  }

  edit(id: number, game: GameDetails){
    const formData = this.buildFormData(game);
    return this.http.put(`${this.apiUrlV1}/${id}`, formData);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrlV1}/${id}`);
  }

  private buildFormData(game: GameDetails): FormData {
    const formData = new FormData();

    if (game.name){
      formData.append('name', game.name);
    }

    if (game.company){
      formData.append('company', game.company);
    }

    if (game.category){
      formData.append('category', game.category);
    }

    if (game.version){
      formData.append('version', game.version);
    }

    if (game.releaseDate){
      formData.append('releaseDate', formatDateFormData(game.releaseDate));
    }

    return formData;
  }
}
