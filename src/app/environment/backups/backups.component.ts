import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.scss']
})
export class BackupsComponent {

  sectionName?: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onCreateBackup() {
    console.log(this.sectionName)
    this.router.navigate(['environments', this.sectionName, 'backups', 'create'])
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sectionName = params.get('id') ?? '';
    });
  }

}
