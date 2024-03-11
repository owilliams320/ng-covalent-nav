import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '@covalent/components/action-ribbon';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styleUrl: './create-environment.component.scss'
})
export class CreateEnvironmentComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }
}
