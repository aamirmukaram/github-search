import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Octokit } from '@octokit/rest';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { environment } from '../../../environments/environment';

export type GithubSearchReposParams = RestEndpointMethodTypes['search']['repos']['parameters'];
export type GitHubSearchReposResponse = RestEndpointMethodTypes['search']['repos']['response'];

export type GitHubSearchIssuesAndPullRequestsParams = RestEndpointMethodTypes['search']['issuesAndPullRequests']['parameters'];
export type GitHubSearchIssuesAndPullRequestsResponse = RestEndpointMethodTypes['search']['issuesAndPullRequests']['response'];

export type GitHubReposGetParams = RestEndpointMethodTypes['repos']['get']['parameters'];
export type GitHubReposGetResponse = RestEndpointMethodTypes['repos']['get']['response'];

export type GitHubSearchCommitsParams = RestEndpointMethodTypes['search']['commits']['parameters'];
export type GitHubSearchCommitsResponse = RestEndpointMethodTypes['search']['commits']['response'];


@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private octokit: Octokit = new Octokit({
    auth: environment.GITHUB_TOKEN
  });

  searchRepositories(params: GithubSearchReposParams): Observable<GitHubSearchReposResponse> {
    return from(this.octokit.search.repos(params));
  }

  searchIssuesAndPullRequests(params: GitHubSearchIssuesAndPullRequestsParams): Observable<GitHubSearchIssuesAndPullRequestsResponse> {
    return from(this.octokit.search.issuesAndPullRequests(params));
  }

  getRepository(params: GitHubReposGetParams): Observable<GitHubReposGetResponse> {
    return from(this.octokit.repos.get(params));
  }

  listCommits(params: GitHubSearchCommitsParams): Observable<GitHubSearchCommitsResponse> {
    console.log('params', params);
    return from(this.octokit.search.commits(params));
  }
}