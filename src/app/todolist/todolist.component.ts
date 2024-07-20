// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-todolist',
//   standalone: true,
//   imports: [],
//   templateUrl: './todolist.component.html',
//   styleUrl: './todolist.component.css'
// })
// export class TodolistComponent {

// }

import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap'; 
import { CsvExportService } from '../services/csv-export.service';
declare var $: any;

 
export interface Task {
  name: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;

}
export interface TaskHistory{
  action:string,
  time:Date,
  taskName:string
}


@Component({
  selector: 'app-todolist',
  standalone:true,
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
  imports: [CommonModule, FormsModule],
})




export class TodolistComponent  {
 
  
  tasks: Task[] = [
    { name: 'Coding Ninjas', description: 'Coding practice', dueDate: new Date(2024, 2, 24), priority: 'Low', status: 'Completed' },
    { name: 'Leetcode', description: 'DSA practice', dueDate: new Date(2024, 3, 3), priority: 'High', status: 'In Progress' },
    { name: 'Mock Interview', description: 'Cracking the job', dueDate: new Date(2024, 3, 6), priority: 'High', status: 'To Do' },

  ];
  
  newTask: Task = { name: '', description: '', dueDate: new Date(), priority: 'Medium', status: 'To Do' };
  selectedTaskIndex: number | null = null;
  selectedTask: Task = { name: '', description: '', dueDate: new Date(), priority: 'Low', status: 'To Do' };
  taskHistory: TaskHistory[] = [];
  // private modalRef: NgbModalRef | undefined;
  constructor(private modalService: NgbModal,private csvExportService: CsvExportService) {}


  
  addTask() {
    this.newTask.dueDate = new Date(this.newTask.dueDate);
    console.log("task added ")
    this.tasks.push({ ...this.newTask });
    this.logAction('Added', this.newTask.name);
    this.newTask = { name: '', description: '', dueDate: new Date(), priority: 'Medium', status: 'To Do' };
    // ($('#taskModal') as any).modal('hide');
    this.modalService.dismissAll();
    
    
  }

  editTask(task: Task,index:number) {
    console.log("edit button clicked");
    this.selectedTaskIndex = index;
    this.selectedTask = { ...task };
  

  }

  updateTask() {
    console.log("update task clicked ")
    
    if (this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex] = { ...this.selectedTask };
      this.logAction('Updated', this.selectedTask.name);
      this.selectedTaskIndex = null;
    }
    // this.selectedTask = { name: '', description: '', dueDate: new Date(), priority: 'Low', status: 'To Do' };
    this.modalService.dismissAll();
  
  }

  deleteTask(task: Task) {
    console.log("task deleted " + task.name)
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.logAction('Deleted', task.name);
    }
    
  }


  sortByDate() {

    this.tasks.sort((a, b) => {
      console.log('a.dueDate:', a.dueDate, typeof a.dueDate);
      console.log('b.dueDate:', b.dueDate, typeof b.dueDate);
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  }

  sortByPriority() {
    const priorityOrder: { [key: string]: number } = { 'Low': 3, 'Medium': 2, 'High': 1 };
    this.tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  sortByStatus() {
    const statusOrder: { [key: string]: number } = { 'To Do': 1, 'In Progress': 2, 'Completed': 3 };
    this.tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  }

  exportTasks(): void {
    this.csvExportService.exportToCsv(this.tasks);
  }

  exportHistory(){
    console.log("history log should be displayed");
    // this.modalService.open('#historyModal');

  }
  private logAction(action: string, taskName: string) {
    this.taskHistory.push({ action, taskName, time: new Date() });
    console.log(this.taskHistory);
  }

}
