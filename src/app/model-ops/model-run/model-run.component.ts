import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation.service';

import '@covalent/components/expansion-panel';
import '@covalent/components/expansion-panel-item';

@Component({
  selector: 'app-model-run',
  templateUrl: './model-run.component.html',
  styleUrls: ['./model-run.component.scss']
})
export class ModelRunComponent {
  sectionName!: string;
  sectionTitle!: string;
  modelOpId!: string;

  constructor(private route: ActivatedRoute, private nav: NavigationService, private router: Router) {}

  ngOnInit(): void {
    this.modelOpId = this.route.snapshot.paramMap.get('modelOpId') ?? '';
    this.sectionTitle = this.route.snapshot.paramMap.get('modelId') ?? '';
    this.sectionName = this.route.snapshot.paramMap.get('modelRunId') ?? '';

    this.nav.setNavTitle({
      name: this.sectionTitle,
      route: `/model-ops/${this.modelOpId}/model/${this.sectionTitle}`,
      sectionName: this.sectionName
    });
    
  }
}
