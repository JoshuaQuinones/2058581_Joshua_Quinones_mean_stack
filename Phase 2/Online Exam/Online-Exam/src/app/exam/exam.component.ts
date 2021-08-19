import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamServiceService } from '../exam-service.service';
import { Question } from '../question';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  examForm:FormGroup;

  examSubmitMessage:string = "";
  examFailMessage:string = "";

  questions:Array<Question> = []
  questionNumbers:Array<number> = [] //will use array of numbers to loop through questions while also having the question number

  constructor(public examService:ExamServiceService, public form:FormBuilder) {
    this.examForm=form.group({});
   } //DI examService to get questions array from exam.json, and FormBuilder to build mdf form based on number of questions in json

  ngOnInit(): void {
    this.readExam(); //read exam questions

  }

  //read exam questions from HTTP file
  readExam(){
    let qNum = 0;
    this.examService.checkExamQuestions().subscribe(result=>{
      for (let q of result){
        this.questionNumbers.push(qNum);
        qNum++;
        console.log("Adding Question:");
        console.log(q);
        this.questions.push(q);
      }
    })
  }

  //Submit exam, check all answers and count number of correct answers. Return number of correct answers
  //out of total, final score as a percentage, and tell if the user passed or failed depending on if
  //they got over 70% correct or under 70% correct.
  submitExam(){
    this.examSubmitMessage = "Exam successfully submitted";
    console.log("Exam Submitted");
  }
}