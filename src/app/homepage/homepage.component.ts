import { Component } from '@angular/core';
import { IRepositoryService } from '../services/irepository-service';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  protected title = 'TEST API';

  constructor(protected service: HomepageService) {}
}
