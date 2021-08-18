import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { TaskObject } from '../task-object';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {

  displayedColumns = ['empID', 'empName', 'taskName', 'taskDeadline']

  //store taks added by parent 'task-adder' component
  @Input()
  taskList:Array<TaskObject> = []; 

  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor() { }

  ngOnInit(): void 
  {

  }

  refreshTable(): void 
  {
    this.table.renderRows();
  }
}
