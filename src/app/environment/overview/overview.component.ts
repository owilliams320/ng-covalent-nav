import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '@covalent/components/action-ribbon';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class EnvironmentOverviewComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute) {}


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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }
}
