import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameDetails } from '../games.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  constructor(private service: GamesService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(GameDetails: GameDetails){
    this.service.create(GameDetails).subscribe(() => {
      this.router.navigate(['/games']);
    });
  }

}
