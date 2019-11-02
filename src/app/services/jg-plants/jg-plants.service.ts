import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JGPlant } from 'src/app/models/jg-plant';
import { Globals } from '../globals';

export interface JGPlantsResponse {
	count: number;
	plants: JGPlant[];
}

@Injectable({
	providedIn: 'root'
})
export class JgPlantsService {
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token')
		})
	};

	constructor(private http: HttpClient, private globals: Globals) {}

	getPlants(): Observable<JGPlantsResponse> {
		return this.http.get<JGPlantsResponse>(this.globals.url + '/joy-garden/plants', this.httpOptions);
	}

	getPlant(_id: string): Observable<JGPlant> {
		return this.http.get<JGPlant>(this.globals.url + '/joy-garden/plants/' + _id, this.httpOptions);
	}

	addPlant(plant: JGPlant): Observable<any> {
		return this.http.post<JGPlant>(this.globals.url + '/joy-garden/plants', plant, this.httpOptions);
	}

	updatePlant(_id: string, plant: JGPlant) {
		const body = [
			{
				propName: 'seedId',
				value: plant.seedId
			},
			{
				propName: 'name',
				value: plant.name
			},
			{
				propName: 'container',
				value: plant.container
			},
			{
				propName: 'coords',
				value: plant.coords
			},
			{
				propName: 'gallery',
				value: plant.gallery
			}
		];
		return this.http.patch<JGPlant>(this.globals.url + '/joy-garden/plants/' + _id, body, this.httpOptions);
	}

	removePlant(_id: string): any {
		return this.http.delete(this.globals.url + '/joy-garden/plants/' + _id, this.httpOptions);
	}
}
