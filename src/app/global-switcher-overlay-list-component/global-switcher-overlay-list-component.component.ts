import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  GlobalSwitcherItem,
  globalSwitcherItems,
} from '../mock-data/global-switcher';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-global-switcher-overlay-list-component',

  templateUrl: './global-switcher-overlay-list-component.component.html',
  styleUrl: './global-switcher-overlay-list-component.component.scss',
})
export class GlobalSwitcherOverlayListComponentComponent {
  selectedSwitcherItem?: GlobalSwitcherItem = globalSwitcherItems[0];
  localGlobalSwitcherItems = globalSwitcherItems;

  @ViewChild('globalSwitcherMenu') globalSwitcherMenu?: ElementRef;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private nav: NavigationService
  ) {}

  onGlobalSelect(id?: string) {
    this.globalSwitcherMenu?.nativeElement?.setAttribute('open', '');
  }

  onGlobalItemSelect(item: GlobalSwitcherItem) {
    console.log(this.activeRoute.snapshot, this.location);
    this.globalSwitcherMenu?.nativeElement?.removeAttribute('open');
    this.selectedSwitcherItem = item;
    this.router.navigate([item?.url]);
  }

  ngOnInit() {
    this.selectedSwitcherItem = this.localGlobalSwitcherItems.find(
      (item: GlobalSwitcherItem) => {
        return item.url === this.location.path();
      }
    );

    this.location.onUrlChange((url) => {
      this.selectedSwitcherItem = this.localGlobalSwitcherItems[0];
      if (url !== '/') {
        
        globalSwitcherItems.forEach((item) => {
          if (url.includes(item.id)) {
            this.nav.setNavTitle({
              name: item.name,
              route: item.url,
              sectionName: item.id,
            });
            this.selectedSwitcherItem = item;
          }
        });
        return;
      }
    });
  }
}
