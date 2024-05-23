import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, forkJoin, lastValueFrom } from 'rxjs';
import { GitHubService } from '../../injectables/services/github.service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { GitHubSearchReposResponse, GitHubReposGetResponse } from '../../injectables/services/github.service';

export interface SearchRepositry {
  name: string;
  avatarUrl: string;
  creationDate: string;
}

export interface SearchRepositoriesResponse {
  items: SearchRepositry[];
  totalCount: number;
}

export interface SearchRepositoriesRequest {
  name: string;
  language?: string;
  minStars?: string;
  page: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  private gitHubService = inject(GitHubService);

  searchRepositories(
    {
      name,
      language,
      minStars,
      perPage,
      page
    }: SearchRepositoriesRequest
  ): Observable<SearchRepositoriesResponse> {
    let query = name;

    if (language) {
      query += ` language:${language}`;
    }
    if (minStars) {
      query += ` stars:>${minStars}`;
      query += ` sort:stars order:desc`;
    }

    return this.gitHubService.searchRepositories({ q: query, per_page: perPage, page})
      .pipe(map(this.mapSearchRepositoriesData));
  }

  searchRepositoriesByIssueTitle(query?: string): Observable<any> {
    return this.gitHubService.searchIssuesAndPullRequests({ q: `${query} in:title` }).pipe(
      map(searchResult => Array.from(new Set(searchResult.data.items.map(item => item.repository_url)))),
      map(uniqueUrls => uniqueUrls.map(url => {
        const [, , , , owner, repo] = url.split('/');
        return { owner, repo };
      })),
      map(ownersAndReposName => ownersAndReposName.map(ownerAndRepoName => this.gitHubService.getRepository(ownerAndRepoName))),
      switchMap(obs => forkJoin(obs)),
      map(this.mapSearchRepositoriesByIssueTitleData),
    );
  }

  mapSearchRepositoriesByIssueTitleData(response: GitHubReposGetResponse[]): SearchRepositoriesResponse {
    const items = response.map(({ data: item }) => ({
      name: item.name,
      avatarUrl: item.owner?.avatar_url ?? '',
      creationDate: item.created_at
    }));
    return ({ items, totalCount: items.length });
  }

  mapSearchRepositoriesData(response: GitHubSearchReposResponse): SearchRepositoriesResponse {
    const items = response.data.items.map(item => ({
      name: item.name,
      avatarUrl: item.owner?.avatar_url ?? '',
      creationDate: item.created_at
    }));
    return ({ items, totalCount: response.data.total_count });
  }
}