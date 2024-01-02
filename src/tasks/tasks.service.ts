import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    // const t = await this.taskRepository.create(task);

    const temp = await this.taskRepository.save(task);
    console.log(temp);
    return task;
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //   getTasksWithFilters(filterDto: GetTasksFilterDto) {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.description.includes(search) || task.title.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    const results = await this.taskRepository.save(task);
    return results;
  }

  async deleteTask(id: number) {
    // const found = this.getTaskById(id);
    // if (!found) {
    //   throw new NotFoundException(`Task with ID ${id} not found!`);
    // }
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    // return this.tasks;
  }
}
