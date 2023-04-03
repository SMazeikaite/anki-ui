import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../homepage.component';
import { HomepageService } from '../homepage.service';
import { RepositoryService } from 'src/app/services/repository-service';
import { IRepositoryService } from 'src/app/services/irepository-service';

@Component({
  selector: 'app-deck-visualisation',
  templateUrl: './deck-visualisation.component.html',
  styleUrls: ['./deck-visualisation.component.scss'],
})
export class DeckVisualisationComponent {
  constructor(protected service: HomepageService) {}

  ngOnInit() {
    this.service.initDecks();
  }
}
