import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export enum Icons {
  Bed = 'bed',
  Broom = 'broom',
  CarWash = 'carwash',
  CleaningKit = 'cleaningkit',
  Clothes = 'clothes',
  ClothesPeg = 'clothespeg',
  Desinfectant = 'desinfectant',
  Dishwasher = 'dishwasher',
  Duster = 'duster',
  Iron = 'iron',
  Sponge = 'sponge',
  Vacuum = 'vacuum',
  WashingMachine = 'washingmachine'
}


@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../../../assets/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
