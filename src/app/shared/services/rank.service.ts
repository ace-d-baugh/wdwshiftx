/*
============================================
; Title: rank.service.ts
; Author: Ace Baugh
; Date: 06/28/2023
; Description: rank.service.ts
===========================================
*/

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rank } from '../models/rank.interface';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  constructor(private http: HttpClient) {}

  //class methods

  //find all ranks
  findAllRanks(): Observable<any> {
    return this.http.get('/api/rank');
  }

  //find rank by id
  findRankById(rankId: string): Observable<any> {
    return this.http.get('/api/rank/' + rankId);
  }

  //create rank
  createRank(rank: Rank): Observable<any> {
    return this.http.post(`/api/rank`, {
      rank: rank.rank,
    });
  }

  //update rank
  updateRank(rankId: string, rank: Rank): Observable<any> {
    return this.http.put(`/api/rank/${rankId}`, {
      rank: rank.rank,
    });
  }

  //delete rank
  deleteRank(rankId: string): Observable<any> {
    return this.http.delete(`/api/rank/${rankId}`);
  }

  //find user rank
  findUserRank(username: string): Observable<any> {
    return this.http.get(`/api/users/${username}/rank`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
