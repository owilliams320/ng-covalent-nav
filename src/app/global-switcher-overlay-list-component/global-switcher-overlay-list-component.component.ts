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
export class GlobalSwitcherOverlayListComponentComponent
  implements AfterViewInit
{
  selectedSwitcherItem?: GlobalSwitcherItem = globalSwitcherItems[0];
  localGlobalSwitcherItems = globalSwitcherItems;

  @ViewChild('globalSwitcherTrigger') globalSwitcherTrigger?: ElementRef;
  @ViewChild('globalSwitcherMenu') globalSwitcherMenu?: ElementRef;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavigationService
  ) {}

  onGlobalSelect(id?: string) {
    const switcherEl = this.globalSwitcherMenu?.nativeElement;
    switcherEl.setAttribute('open', true);
  }

  onGlobalItemSelect(item: GlobalSwitcherItem) {
    this.globalSwitcherMenu?.nativeElement?.removeAttribute('open');
    this.selectedSwitcherItem = item;
    if (item.url.includes('environments') && this.router.url !== '/') {
      this.router.navigate([this.replaceSecondPathSegment(this.router.url, item.id)]);
    } else {
      this.router.navigate([item.url]);
    }
  }

  replaceSecondPathSegment(url: string, newSegment: string) {
    const newURL = new String(url);
    // Split the pathname into segments, ignore the first empty string from split result
    const pathSegments = newURL.split('/').filter(Boolean);

    // Replace the first segment
    if (pathSegments.length > 0) {
      pathSegments[1] = newSegment;
    } else {
      // If there's no path, simply add the new segment
      pathSegments.push(newSegment);
    }
    // Return the modified URL
    return pathSegments.join('/');
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
              name: item.name + 'Environments',
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
