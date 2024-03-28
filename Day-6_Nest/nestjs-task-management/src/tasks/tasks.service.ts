import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks.filter((task) => task.id !== found.id);
  }

  //my code
  // updateTaskById(id: string, status: string): void {
  //   this.tasks = this.tasks.map((task) => {
  //     if (task.id === id) {
  //       task.status = TaskStatus[status];
  //       console.log(task);
  //     }
  //     return task;
  //   });
  //   console.log(this.tasks);
  // }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    console.log(this.tasks);
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = { ...filterDto };
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
