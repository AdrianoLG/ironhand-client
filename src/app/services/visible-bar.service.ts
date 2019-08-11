import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VisibleBarService {

  visibleBar: boolean;

  getVisibleBar(): boolean {
    return this.visibleBar;
  }

  setVisibleBar(visible: boolean) {
    this.visibleBar = visible;
  }
}
