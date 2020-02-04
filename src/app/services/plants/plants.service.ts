import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals';
import { Plant } from 'src/app/models/plant';

export interface PlantsResponse {
  count: number;
<<<<<<< HEAD
  plants: Plant[]
}
=======
  plants: Plant[];
}

>>>>>>> 9de78ccdffce89ded8f255a65ddcbbfe80ae7e49
@Injectable({
  providedIn: 'root'
})
export class PlantsService {
<<<<<<< HEAD
=======
  response;

>>>>>>> 9de78ccdffce89ded8f255a65ddcbbfe80ae7e49
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

  getPlants(): Observable<PlantsResponse> {
<<<<<<< HEAD
    return this.http.get<PlantsResponse>(this.globals.url + '/plants', this.httpOptions);
=======
    return this.http.get<PlantsResponse>(this.globals.url + '/plants/', this.httpOptions);
>>>>>>> 9de78ccdffce89ded8f255a65ddcbbfe80ae7e49
  }

  getPlant(_id: string): Observable<Plant> {
    return this.http.get<Plant>(this.globals.url + '/plants/' + _id, this.httpOptions);
  }

<<<<<<< HEAD
  addPlant(plant: Plant): any {
    return this.http.post<any>(this.globals.url + '/plants', plant, this.httpOptions);
  }

  updatePlant(_id: string, plant: Plant): any {
=======
  addPlant(project: Plant): Observable<any> {
    return this.http.post<Plant>(this.globals.url + '/plants/', project, this.httpOptions);
  }

  updatePlant(_id: string, plant: Plant) {
>>>>>>> 9de78ccdffce89ded8f255a65ddcbbfe80ae7e49
    const body = [
      {
        propName: 'name',
        value: plant.name
      },
      {
        propName: 'scientific',
        value: plant.scientific
      },
      {
        propName: 'container',
        value: plant.container
      },
      {
        propName: 'zone',
        value: plant.zone
      },
      {
        propName: 'gallery',
        value: plant.gallery
      },
      {
        propName: 'sun',
        value: plant.sun
      },
      {
        propName: 'watering',
        value: plant.watering
      },
      {
        propName: 'wateringFrequency',
        value: plant.wateringFrequency
      },
      {
        propName: 'frost',
        value: plant.frost
      },
      {
        propName: 'soil',
        value: plant.soil
      },
      {
        propName: 'flowering',
        value: plant.flowering
      },
      {
        propName: 'perishable',
        value: plant.perishable
      },
      {
        propName: 'pests',
        value: plant.pests
      },
      {
        propName: 'img',
        value: plant.img
      },
      {
        propName: 'origin',
        value: plant.origin
      },
      {
        propName: 'transplant',
        value: plant.transplant
      },
      {
        propName: 'death',
        value: plant.death
      },
      {
        propName: 'deathCause',
        value: plant.deathCause
      }
    ];
    return this.http.patch<Plant>(this.globals.url + '/plants/' + _id, body, this.httpOptions);
  }

  removePlant(_id: string): any {
    return this.http.delete(this.globals.url + '/plants/' + _id, this.httpOptions);
  }
}
