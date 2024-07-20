// src/app/services/csv-export.service.ts
import { Injectable } from '@angular/core'; //instance of the service
import { Task } from '..//todolist/todolist.component';

@Injectable({
  providedIn: 'root', //service that should be provided at the root level of the application. 
})
export class CsvExportService {
  constructor() {}

  exportToCsv(tasks: Task[], filename: string = 'coding_ninjas.csv'): void {
    const csvData = this.convertToCsv(tasks);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
  }

  private convertToCsv(tasks: Task[]): string {
    const header = ['Name', 'Description', 'Due Date', 'Priority', 'Status'];
    let dueDate = new Date();
    let isoString = dueDate.toISOString(); 
    // console.log(isoString);
    let datePart = isoString.split('T')[0];
    // console.log(datePart);
    const rows = tasks.map(task =>
            
      [task.name, task.description, task.dueDate, task.priority, task.status]
    );
    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    return csvContent;
  }
}
