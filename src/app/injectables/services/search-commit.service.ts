import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { GitHubService } from './github.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitHubSearchCommitsResponse } from './github.service';

export interface SearchCommit {
  name: string;
  url: string;
  message: string;
}

export interface SearchCommitsResponse {
  items: SearchCommit[];
}

export interface SearchCommitsRequest {
  owner: string;
  repo: string;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchCommitService {
  private gitHubService = inject(GitHubService);

  searchCommits({ searchTerm, owner, repo }: SearchCommitsRequest): Observable<SearchCommitsResponse> {
    let query = searchTerm;
    return this.gitHubService.listCommits({ q: `${query} repo:${owner}/${repo}` })
    .pipe(
      map(this.mapSearchCommitsData)
    );
  }

  mapSearchCommitsData(response: GitHubSearchCommitsResponse): SearchCommitsResponse {
    const items = response.data.items.map(item => ({
      name: item.commit.author.name,
      url: item.html_url,
      message: item.commit.message,
    }));
    return ({ items });
  }
}
