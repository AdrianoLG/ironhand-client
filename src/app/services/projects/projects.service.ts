import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Globals } from '../globals';

export interface ProjectsResponse {
  count: number;
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})

export class ProjectsService {

  response;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getProjects(): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(this.globals.url + '/projects', this.httpOptions);
  }

  getProject(_id: string): Observable<Project> {
    return this.http.get<Project>(this.globals.url + '/projects/' + _id, this.httpOptions);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post<Project>(this.globals.url + '/projects', project, this.httpOptions);
  }

  updateTodo(_id, todo, doing) {
    const body = [
      {
        propName: 'todo',
        value: todo
      },
      {
        propName: 'doing',
        value: doing
      }
    ];
    return this.http.patch<Project>(this.globals.url + '/projects/' + _id, body, this.httpOptions);
  }

  updateDoing(_id: string, doing: Array<string>, done: Array<string>) {
    const body = [
      {
        propName: 'doing',
        value: doing
      },
      {
        propName: 'done',
        value: done
      }
    ];
    return this.http.patch<Project>(this.globals.url + '/projects/' + _id, body, this.httpOptions);
  }

  updateProject(_id: string, project: Project): any {
    const body = [
      {
        propName: 'name',
        value: project.name
      },
      {
        propName: 'category',
        value: project.category
      },
      {
        propName: 'todo',
        value: project.todo
      },
      {
        propName: 'doing',
        value: project.doing
      },
      {
        propName: 'done',
        value: project.done
      }
    ];
    return this.http.patch<Project>(this.globals.url + '/projects/' + _id, body, this.httpOptions);
  }

  removeProject(_id: string): any {
    return this.http.delete(this.globals.url + '/projects/' + _id, this.httpOptions);
  }

}
