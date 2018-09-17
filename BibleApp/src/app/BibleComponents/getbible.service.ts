import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetbibleService {

  constructor(private http: HttpClient) { }
  
  bible = {
    version: null,
    book: null,
    chapter: null
  }


  getChapter() {
    var apiUrl = this.bible.version + '/' + this.bible.book + '/' + this.bible.chapter;
    return this.http.get('http://localhost:3000/api/' + apiUrl);
  }

  getDetails() {
    return this.http.get('http://localhost:3000/api/getDetails');
  }
}
