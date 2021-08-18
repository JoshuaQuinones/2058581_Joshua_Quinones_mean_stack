import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskObject } from '../task-object';
import { TaskTableComponent } from '../task-table/task-table.component';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {

  //child component task-table
  @ViewChild(TaskTableComponent)
  taskTable?:TaskTableComponent;
  

  errorMessage:string = ""; //display if issue submitting a task
  successMessage:boolean = false; //used to hide or show success message

  tasks:Array<TaskObject> = []; //store all added tasks

  constructor() { }

  ngOnInit(): void {
  }

  //using template driven model, take inputs for a task
  submitTask(taskSubmit:NgForm){
    //clear error message in preparation for a new error, or don't display anything if successful
    //set successMessage to false in preperation for next attempt to possibly not be successful
    this.errorMessage = "";
    this.successMessage = false;
    let task = taskSubmit.value;
    //check for both empty and null. Inputs start out empty, and become null on reset call
    if (task.empid == "" || task.empname == "" || task.taskname == "" || task.deadline == ""
    || task.empid == null || task.empname == null || task.taskname == null || task.deadline == null)
    {
      this.errorMessage = "Error: All fields must be filled";
      return;
    }
    console.log("employeeID:" + task.empid);
    console.log("employee Name:" + task.empname);
    console.log("Task:" + task.taskname);
    console.log("Deadline:" + task.deadline);
    //Check that employeeID is a number
    let checkNum = +task.empid;
    if (isNaN(checkNum))
    {
      this.errorMessage = "Error: Employee ID must be a number input";
      return;
    }
    //If no errors, add to array of tasks
    let newTask:TaskObject = {
      empID:task.empid, empName:task.empname, taskName:task.taskname, taskDate:task.deadline
    }
    this.tasks.push(newTask);
    //reset forms and display success message
    taskSubmit.reset();
    this.successMessage = true;
    //refresh table
    this.taskTable?.refreshTable();
  }
}
