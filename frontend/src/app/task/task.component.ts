import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  selectedStatus: string = 'All';

  newTask = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
    isCompleted: false
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.applyFilter();
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    this.taskService.addTask(this.newTask).subscribe(() => {
      this.newTask = {
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        status: 'Pending',
        isCompleted: false
      };
      this.loadTasks();
    });
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task._id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleTask(task: any) {
    task.isCompleted = !task.isCompleted;
    // Optional: add updateTask() if you want to save this to the database too
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedStatus === 'All') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }
}
