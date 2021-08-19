import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Question } from './question';

//Service used to read questions from exam.json
@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

  constructor(public http:HttpClient) { }

  checkExamQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>("/assets/exam.json");
  }
}
