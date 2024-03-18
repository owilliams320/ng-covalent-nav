import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { slideInUpAnimation } from '../app.animations';

import '@covalent/components/card';
import '@covalent/components/icon';
import '@covalent/components/circular-progress';
import '@covalent/components/text-lockup';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[ slideInUpAnimation ]
})
export class HomeComponent {
  @HostBinding('@routeAnimation') routeAnimation = false;

  @ViewChild('createNewMenu') createNewMenu?: ElementRef;
  @ViewChild('createNewMenuTrigger') createNewMenuTrigger?: ElementRef;
  
  ngAfterViewInit() {
    const createNewEl = this.createNewMenu?.nativeElement;
    createNewEl.anchor = this.createNewMenuTrigger?.nativeElement;
  }

  onCreateNew() {
    const createNewEl = this.createNewMenu?.nativeElement;
    createNewEl.open = true;
  }
}
