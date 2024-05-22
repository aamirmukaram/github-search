import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { GitHubService } from '../../injectables/services/github.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitHubSearchCommitsResponse , GitHubReposListCommitsResponse} from '../../injectables/services/github.service';

export interface SearchCommit {
  name: string;
  url: string;
  message: string;
}

export interface SearchCommitsResponse {
  items: SearchCommit[];
  totalCount: number;
}

export interface SearchCommitsRequest {
  owner: string;
  repo: string;
  searchTerm: string;
  perPage: number;
  page: number;
}

@Injectable()
export class CommitsService {
  private gitHubService = inject(GitHubService);

  listCommits({ searchTerm, owner, repo, perPage, page }: SearchCommitsRequest): Observable<SearchCommitsResponse> {
    let query = searchTerm;

    return this.gitHubService.searchCommits({ q: `${query} repo:${owner}/${repo}`, per_page: perPage, page })
      .pipe(
        map(this.mapSearchCommitsData)
      );

    // return this.gitHubService.listCommits({ owner, repo, per_page: perPage, page })
    //   .pipe(
    //     map(this.mapListCommitsData)
    //   );
  }

  // mapListCommitsData(response: GitHubReposListCommitsResponse): SearchCommitsResponse {
  //   const totalCount = parseInt(response.headers['x-total-count'] as string, 10) || 0;
  //   const items = response.data.map(commit => ({
  //     name: commit.author,
  //     url: commit.html_url,
  //     message: commit.commit.message
  //   }));
  //   return { items, totalCount };
  // }

  mapSearchCommitsData(response: GitHubSearchCommitsResponse): SearchCommitsResponse {
    const items = response.data.items.map(item => ({
      name: item.commit.author.name,
      url: item.html_url,
      message: item.commit.message,
    }));
    return ({ items, totalCount: response.data.total_count });
  }
}
