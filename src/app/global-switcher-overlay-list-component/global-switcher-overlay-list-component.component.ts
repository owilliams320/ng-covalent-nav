import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class GlobalSwitcherOverlayListComponentComponent implements AfterViewInit {
  selectedSwitcherItem?: GlobalSwitcherItem = globalSwitcherItems[0];
  localGlobalSwitcherItems = globalSwitcherItems;

  @ViewChild('globalSwitcherTrigger') globalSwitcherTrigger?: ElementRef;
  @ViewChild('globalSwitcherMenu') globalSwitcherMenu?: ElementRef;

  constructor(
    private location: Location,
    private router: Router,
    private nav: NavigationService
  ) {}

  onGlobalSelect(id?: string) {
    const switcherEl = this.globalSwitcherMenu?.nativeElement;
    switcherEl.setAttribute('open', true);
  }

  onGlobalItemSelect(item: GlobalSwitcherItem) {
    this.globalSwitcherMenu?.nativeElement?.removeAttribute('open');
    this.selectedSwitcherItem = item;
    this.router.navigate([item?.url]);
  }

  ngAfterViewInit() {
    const switcherEl = this.globalSwitcherMenu?.nativeElement;
    switcherEl.anchor = this.globalSwitcherTrigger?.nativeElement;
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
