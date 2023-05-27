import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameDetails } from '../../models/games.model';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
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
