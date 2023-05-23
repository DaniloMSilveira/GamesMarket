import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Game } from '../games.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-index-games',
  templateUrl: './index-games.component.html',
  styleUrls: ['./index-games.component.css']
})
export class IndexGamesComponent implements OnInit {

  constructor(private service: GamesService) { }

  games: Game[] | null;
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<Game[]>) => {
      this.games = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number){
    this.service.delete(id).subscribe(() => {
      this.loadData();
    });
  }

}
