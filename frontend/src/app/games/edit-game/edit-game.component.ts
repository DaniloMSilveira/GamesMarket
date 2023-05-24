import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, GameDetails } from '../games.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private service: GamesService,
    private router: Router) { }

  model: Game;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Game) => {
      this.service.getById(params.id).subscribe(game => this.model = game);
    });
  }

  saveChanges(GameDetails: GameDetails){
    this.service.edit(this.model.id, GameDetails).subscribe(() => {
      this.router.navigate(['/games']);
    });
  }

}
