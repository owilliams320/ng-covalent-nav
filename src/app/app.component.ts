import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import '@covalent/components/app-shell';
import '@covalent/components/button';
import '@covalent/components/icon';
import '@covalent/components/icon-button';
import '@covalent/components/list/list';
import '@covalent/components/list/nav-list-item';
import '@covalent/components/toolbar';
import '@covalent/components/menu';
import '@covalent/components/switch';
import '@covalent/components/formfield';
import '@covalent/components/tab';
import '@covalent/components/textfield';

// TODO: import below should not be required for app-shell
import '@covalent/components/top-app-bar-fixed';

import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  switchMap,
  switchScan,
} from 'rxjs';
import { minimatch } from 'minimatch';
import { NavigationService } from './navigation.service';
import { slideInLeftAnimation, slideInUpAnimation } from './app.animations';

import {
  IMarkdownNavigatorItem,
  TdMarkdownNavigatorWindowComponent,
  TdMarkdownNavigatorWindowService,
} from '@covalent/markdown-navigator';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

export interface navigationItem {
  icon?: string;
  covalentIcon?: true;
  path?: string | any[];
  label?: string;
  children?: navigationItem[];
}

export interface navMapItem {
  path: string;
  showSectionTitle?: boolean;
  sectionTitle?: string;
  children: navigationItem[];
  parentName?: string;
  parentRoute?: string;
}

export interface IHelpBase {
  items: IMarkdownNavigatorItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
  animations: [slideInLeftAnimation],
})
export class AppComponent {
  sectionName?: string;
  sectionParentName?: string;
  sectionParentRoute?: string;
  forcedOpen!: boolean;

  helpOpen = false;
  helpDocked = true;
  mainSectionContained = true;

  helpDialog?: MatDialogRef<TdMarkdownNavigatorWindowComponent>;

  currentRoute!: navigationItem[];
  currentRouteSub = new BehaviorSubject<navigationItem[]>(
    this.navRoutes('').children
  );
  currentRoute$ = this.currentRouteSub.asObservable();

  isNavigating = true;

  _helpBaseUrl = 'https://www.teradata.com/product-help/';
  readonly USE_CASES_ID: string = 'bkm1640280721917';

  items: IMarkdownNavigatorItem[] = [
    {
      id: 'covalent',
      title: 'Covalent',
      children: [
        {
          id: 'component',
          title: 'Components',
          children: [
            {
              id: 'td-loading',
              url: 'https://raw.githubusercontent.com/Teradata/covalent/main/src/platform/core/loading/README.md',
              title: 'tdLoading',
            },
          ],
        },
      ],
    },
  ];

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private nav: NavigationService,
    private cdr: ChangeDetectorRef,
    private markdownNavigatorWindowService: TdMarkdownNavigatorWindowService,
    private _httpClient: HttpClient
  ) {
    const onNavigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed()
    );
    onNavigationEnd$.subscribe((event) => {
      const { url } = event as NavigationEnd;
      if (!url) {
        return;
      }
      this.setContainedPage(url);
    });

    combineLatest([onNavigationEnd$, this.nav.navTitle$])
      .pipe(takeUntilDestroyed())
      .subscribe(([event, navTitle]) => {
        this.sectionName = navTitle.sectionName;
        this.sectionParentName = navTitle.name;
        this.sectionParentRoute = navTitle.route;

        const { url } = event as NavigationEnd;

        if (!url) {
          return;
        }

        this.setCurrentRoute(url);
      });

    this.getHelpJSON().subscribe({
      next: (items: IMarkdownNavigatorItem[]) => {
        this.items = items;
      },
    });
  }

  ngOnInit(): void {
    // Set the forced open state based on local storage preference
    this.forcedOpen = JSON.parse(
      localStorage.getItem('app-preference-open') || 'false'
    );
  }
  
  setContainedPage(url: string) {
    // List of page URLs that should NOT show the contained state
    const barePages = ['/', '/environments/*'];
    let mainSectionContained = true;

    for (let i = 0; i < barePages.length; i++) {
      // Match the array of patterns to their
      if (minimatch(url, barePages[i])) {
        mainSectionContained = false;
        break;
      }
    }

    this.mainSectionContained = mainSectionContained;
    this.cdr.markForCheck();
  }

  setCurrentRoute(url: string) {
    const nextRoute = this.navRoutes(url);

    if (nextRoute.showSectionTitle === false) {
      this.sectionParentName = '';
    }

    this.currentRoute = nextRoute.children;
    this.currentRouteSub.next(nextRoute.children);
    this.cdr.detectChanges();
  }

  supportRoutes = {
    label: 'Docs & support',
    icon: 'school',

    children: [
      {
        path: '/learn',
        label: 'Learn',
      },
      {
        path: '/documentation',
        label: 'Documentation',
      },
      {
        path: '/support',
        label: 'Support',
      },
    ],
  };

  navRoutes(url: string): navMapItem {
    const navMap: { [key: string]: navMapItem } = {
      home: {
        path: '/**',
        showSectionTitle: false,
        children: [
          {
            path: '/',
            icon: 'dashboard',
            label: 'Dashboard',
          },
          {
            label: 'Monitor',
            icon: 'multiline_chart',
            children: [
              {
                path: '/monitor/queries',
                label: 'Queries',
              },
              {
                path: '/monitor/consumption',
                label: 'Consumption',
              },
              {
                path: '/monitor/cost-calculator',
                label: 'Cost calculator',
              },
              {
                path: '/monitor/alerts',
                label: 'Alerts',
              },
            ],
          },
          {
            label: 'Access management',
            path: '/access-management',
            icon: 'people',
            children: [
              {
                path: 'access-management',
                label: 'Users',
              },
              {
                path: '/access-management/identity-providers',
                label: 'Identity providers',
              },
              {
                path: '/access-management/token-access',
                label: 'Token access',
              },
            ],
          },
          {...this.supportRoutes},
        ],
      },
      environments: {
        path: '/environments/**',
        children: [
          {
            path: ['/environments', this.sectionName],
            icon: 'dashboard',
            label: 'Dashboard',
          },
          {
            path: ['/environments', this.sectionName, 'users'],
            icon: 'people',
            label: 'Users',
          },
          {
            path: ['/environments', this.sectionName, 'compute-groups'],
            icon: 'compute_cluster_group',
            covalentIcon: true,
            label: 'Compute groups',
          },
          {
            path: ['/environments', this.sectionName, '**'],
            icon: 'database',
            label: 'Data management',
            covalentIcon: true,
            children: [
              {
                path: ['/environments', this.sectionName, 'backups'],
                label: 'Backups',
              },
              {
                path: ['/environments', this.sectionName, 'data-copy'],
                label: 'Data copy',
              },
              {
                path: ['/environments', this.sectionName, 'data-migration'],
                label: 'Data migration',
              },
              {
                path: ['/environments', this.sectionName, 'flows'],
                label: 'Flows',
              },
              {
                path: ['/environments', this.sectionName, 'query-grid'],
                label: 'QueryGrid',
              },
            ],
          },
          {
            path: ['/environments', this.sectionName, 'settings'],
            icon: 'settings',
            label: 'Settings',
          },
          {...this.supportRoutes},
        ],
      },
      consumption: {
        path: '/monitor/consumption/**',
        children: [
          {
            path: ['monitor', 'consumption', this.sectionName],
            icon: 'language',
            label: this.sectionName,
          },
        ],
      },
    };
    const navMatches = [];

    for (const navKey in navMap) {
      const nav = navMap[navKey];
      if (minimatch(url, nav.path)) {
        navMatches.push(nav);
      }
    }

    return navMatches.pop() ?? navMap['home'];
  }

  checkActive(path: string | any[] = []) {
    if (typeof path === 'string') {
      return this.router.isActive(path, true) ? true : null;
    } else {
      return this.router.isActive(path?.join('/'), true) ? true : null;
    }
  }

  checkActiveChildren(children: navigationItem[] = []) {
    let isActive = false;
    for (let i = 0; i < children.length; i++) {
      let itemPath = children[i]?.path;
      if (itemPath) {
        let isActive = this.checkActive(itemPath);
        if (isActive) {
          return isActive ? true : null;
        }
      }
    }
    return isActive ? true : null;
  }

  toggleHelp() {
    this.helpOpen = !this.helpOpen;

    if (!this.helpDocked) {
      this.toggleHelpWindow();
    }

    this.cdr.markForCheck();
  }

  closeDockedWindow() {
    this.markdownNavigatorWindowService.close();
  }

  toggleHelpWindow() {
    if (this.markdownNavigatorWindowService.isOpen) {
      this.markdownNavigatorWindowService.close();
    } else {
      this.helpDialog = this.markdownNavigatorWindowService.open({
        items: this.items,
      });

      this.helpDialog.componentInstance.dockToggled.subscribe(() => {
        this.markdownNavigatorWindowService.close();
        this.helpDocked = true;
        this.helpOpen = true;
        this.cdr.markForCheck();
      });
    }
  }

  toggleDockedMode() {
    this.helpDocked = !this.helpDocked;

    if (!this.helpDocked) {
      this.toggleHelpWindow();
    }
    this.cdr.markForCheck();
  }

  private appendBaseUrltoUrl(items: IMarkdownNavigatorItem[]) {
    items.forEach((item: IMarkdownNavigatorItem) => {
      if (item.id != this.USE_CASES_ID) {
        if (item.url) {
          item.url = this._helpBaseUrl + item.url;
        }

        if (item.children && item.children.length > 0) {
          this.appendBaseUrltoUrl(item.children);
        }

        if (item.childrenUrl) {
          item.url = this._helpBaseUrl + item.url;
        }
      }
    });
  }

  menuToggled() {
    this.forcedOpen = !this.forcedOpen;
    localStorage.setItem('app-preference-open', this.forcedOpen.toString());
  }

  getHelpJSON(
    fileName = 'Vantage/base-help-en.json'
  ): Observable<IMarkdownNavigatorItem[]> {
    const target = `${this._helpBaseUrl}${fileName}`;
    const src = this._httpClient.get(target);

    return src.pipe(
      map((baseHelpJson: any) => {
        if (baseHelpJson && baseHelpJson.items) {
          this.appendBaseUrltoUrl(baseHelpJson.items);
        }
        return baseHelpJson.items;
      })
    );
  }
}
