import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RepositoryService } from './services/repository-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IApiService } from './services/iapi-service';
import { ApiService } from './services/api.service';
import { IRepositoryService } from './services/irepository-service';
import { DeckVisualisationComponent } from './homepage/deck-visualisation/deck-visualisation.component';
import { HomepageService } from './homepage/homepage.service';
import { RandomColorDirective } from './random-color.directive';
import { ActivityVisualiserComponent } from './homepage/activity-visualiser/activity-visualiser.component';
import { CalendarHeatmapComponent } from './ui/calendar-heatmap/calendar-heatmap.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DeckVisualisationComponent,
    RandomColorDirective,
    ActivityVisualiserComponent,
    CalendarHeatmapComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    HomepageService,
    {
      provide: IRepositoryService,
      useFactory: (api: IApiService) => new RepositoryService(api),
      deps: [ApiService],
    },
    {
      provide: IApiService,
      useFactory: (http: HttpClient) => new ApiService(http),
      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
