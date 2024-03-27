import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private nav: NavigationService) {}

  ngOnInit(): void {
    // this.sectionName = this.route.snapshot.paramMap.get('id') ?? '';
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
      this.nav.setNavTitle({name: '', route: '/', sectionName:this.sectionName});
    });

  }

}
