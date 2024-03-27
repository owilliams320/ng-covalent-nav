import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  sectionName!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onCreateUsers() {
    console.log(['environments', this.sectionName, 'users', 'create'])
    this.router.navigate(['environments', this.sectionName, 'users', 'create'])
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }

}
