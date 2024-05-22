import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchRepoService } from './injectables/services/search-repo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [SearchRepoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private searchRepoService = inject(SearchRepoService);

  constructor() {
    // this.searchRepoService.searchRepositories({ name: 'alpha angualar material' }).subscribe(console.log);
    this.searchRepoService.searchRepositoriesByIssueTitle('angular').subscribe(console.log);
  }
}
