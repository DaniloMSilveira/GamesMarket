import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDetails } from '../games.model';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrls: ['./form-game.component.scss']
})
export class FormGameComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  model: GameDetails;

  @Output()
  onSaveChanges = new EventEmitter<GameDetails>();
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      company: ['', {
        validators: [Validators.required]
      }],
      category: ['', {
        validators: [Validators.required]
      }],
      version: '',
      releaseDate: ['', {
        validators: [Validators.required]
      }]
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }

}
