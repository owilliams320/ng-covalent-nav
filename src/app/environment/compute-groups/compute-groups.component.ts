import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compute-groups',
  templateUrl: './compute-groups.component.html',
  styleUrls: ['./compute-groups.component.scss']
})
export class ComputeGroupsComponent {

  sectionName?: string;

  constructor(private route: ActivatedRoute, private router: Router) {}


  onCreateCompute() {
    this.router.navigate(['environments', this.sectionName, 'compute-groups', 'create'])
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }

}
