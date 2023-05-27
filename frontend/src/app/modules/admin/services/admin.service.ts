import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { formatDateFormData } from '../shared/utils';
import { Game, GameDetails, GameMainPage } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/game'

  get(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<Game[]>(this.apiURL, {observe: 'response', params});
  }

  public getHomePageGames(): Observable<GameMainPage>{
    return this.http.get<GameMainPage>(this.apiURL);
  }

  getById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiURL}/${id}`);
  }

  create(game: GameDetails){
    const formData = this.buildFormData(game);
    return this.http.post(this.apiURL, formData);
  }

  edit(id: number, game: GameDetails){
    const formData = this.buildFormData(game);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
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
