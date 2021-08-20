import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamServiceService } from '../exam-service.service';
import { Question } from '../question';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  examForm:FormGroup;

  examPassMessage:string = "";
  examFailMessage:string = "";
  examPassMessage2:string = "";
  examFailMessage2:string = "";
  examResubmitMessage:string = "";
  examSubmitted: boolean = false;

  questions:Array<Question> = []
  questionNumbers:Array<number> = [] //will use array of numbers to loop through questions while also having the question number

  constructor(public examService:ExamServiceService, public form:FormBuilder) {
    this.examForm=form.group({});
    this.readExam(); //read exam questions
   } //DI examService to get questions array from exam.json, and FormBuilder to build mdf form based on number of questions in json

  ngOnInit(): void {
  }

  //read exam questions from HTTP file
  async readExam(){
    let qNum = 0;
    this.examService.checkExamQuestions().subscribe(result => {
      for (let q of result) {
        this.questionNumbers.push(qNum);
        console.log("Adding Question:");
        console.log(q);
        this.questions.push(q);
        //add control for this question
        this.examForm.addControl(qNum.toString(), this.form.control("", Validators.required))
        qNum++;
      }
    })
  }

  //Submit exam, check all answers and count number of correct answers. Return number of correct answers
  //out of total, final score as a percentage, and tell if the user passed or failed depending on if
  //they got over 70% correct or under 70% correct.
  submitExam(): void {
    //check if exam was previously submitted
    if (this.examSubmitted)
    {
      this.examResubmitMessage = "Exam already submitted. To take exam again, reload page."
      return;
    }
    else
    {
      this.examSubmitted = true;
    }
    console.log("Exam Submitted");
    let val = this.examForm.value;
    console.log(val)
    //check answers
    let correct:number = 0;
    for (let q=0; q < this.questions.length; q++)
    {
      if (val[q] == this.questions[q].correct)
      {
        //add to counter of correct answers and display that this question was answered correctly
        correct++;
        let id:string = q + "ans" + val[q];
        document.getElementById(id)!.innerHTML += `<span style="color:green;font-weight:bold;"> Selected answer is correct!</span>`
      }
      else
      {
        //display correct answer
        let idIncorrect:string = q + "ans" + val[q]
        document.getElementById(idIncorrect)!.innerHTML += `<span style="color:red;font-weight:bold;"> Selected answer is incorrect</span>`
        let idCorrect:string = q + "ans" + this.questions[q].correct;
        document.getElementById(idCorrect)!.innerHTML += `<span style="color:green;font-weight:bold;"> Correct answer</span>`
      }
    }
    //see if exam was passed (over 70% correct)
    if ( correct/this.questions.length >= .7)
    {
      //exam passed
      this.examPassMessage = correct + "/" + this.questions.length + " Correct: " + 
      correct/this.questions.length * 100 + "%";
      this.examPassMessage2 = "Exam Passed! (Need at least 70% to pass)";
    }
    else
    {
      //exam failed
      this.examFailMessage = correct + "/" + this.questions.length + " Correct: " + 
      correct/this.questions.length * 100 + "%";
      this.examFailMessage2 = "Exam Failed. (Need at least 70% to pass)";
      
    }
  }
}