import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivationEnd, NavigationStart } from '@angular/router';

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


// TODO: import below should not be required for app-shell
import '@covalent/components/top-app-bar-fixed';

import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, switchMap } from 'rxjs';
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
  icon?:string,
  path?: string|any[],
  label?: string, 
  children?: navigationItem[]
}

export interface navMapItem  {
  path: string,
  showSectionTitle?: boolean,
  sectionTitle?: string,
  children: navigationItem[],
  parentName?: string,
  parentRoute?: string,
}

export interface IHelpBase {
  items: IMarkdownNavigatorItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
  animations: [ slideInLeftAnimation ]
})
export class AppComponent {
  sectionName?:  string;
  sectionParentName?: string;
  sectionParentRoute?: string;
  forcedOpen!: boolean;

  helpOpen = false;
  helpDocked = true;
  
  helpDialog?: MatDialogRef<TdMarkdownNavigatorWindowComponent>;
  
  currentRoute!: navigationItem[];
  currentRouteSub = new BehaviorSubject<navigationItem[]>(this.navRoutes('').children);
  currentRoute$ = this.currentRouteSub.asObservable();

  isNavigating = true;

  _helpBaseUrl = 'https://www.teradata.com/product-help/';
  readonly USE_CASES_ID: string = 'bkm1640280721917';


  items:IMarkdownNavigatorItem[] = [
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

  @ViewChild('helpToggleItem')
  helpToggleItem!: ElementRef;

  @ViewChild('helpCloseButton')
  helpCloseButton!: ElementRef;

  @ViewChild('helpUndockButton')
  helpUndockButton!: ElementRef;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private nav: NavigationService,
    private cdr: ChangeDetectorRef,
    private markdownNavigatorWindowService: TdMarkdownNavigatorWindowService,
    private _httpClient: HttpClient,
    ) {}

  ngOnInit(): void {

    // this.router.events.pipe(filter( event => event instanceof NavigationStart)).subscribe((event)=>{
    //   if (this.currentRoute?.toString()!==(this.navRoutes((event as NavigationStart).url)).children.toString()) {
    //     this.isNavigating = true;
    //   }
    // })


    this.forcedOpen = JSON.parse(localStorage.getItem('app-preference-open') || 'false');

    combineLatest([
      this.router.events.pipe(filter( event => event instanceof NavigationEnd)),
      this.nav.navTitle$,
    ])
    .subscribe(( [event, navTitle] ) => {
      this.sectionName = navTitle.sectionName;
      this.sectionParentName = navTitle.name;
      this.sectionParentRoute = navTitle.route;

      const {url} = (event as NavigationEnd);

      if (!url){return;}

      this.setCurrentRoute(url);
    })

    this.getHelpJSON()
    .subscribe({
      next: (items: IMarkdownNavigatorItem[]) => {
        this.items = items;
      }
    });    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.helpToggleItem.nativeElement.addEventListener('click', () => this.toggleHelp())
    this.helpCloseButton.nativeElement.addEventListener('click', () => this.toggleHelp())
    this.helpUndockButton.nativeElement.addEventListener('click', () => this.toggleDockedMode())

  }

  setCurrentRoute(url: string){
    const nextRoute = this.navRoutes(url);
    
    if (nextRoute.showSectionTitle === false) {
      this.sectionParentName = '';
    }

    this.currentRoute = nextRoute.children;
    this.currentRouteSub.next(nextRoute.children);    
    this.cdr.detectChanges();
  }

  navRoutes(url: string): navMapItem {
    const navMap:  {[key: string]: navMapItem} = {
      'home': {
        path: '/**',
        showSectionTitle: false,
        children: [
          {
            path: '/',
            icon: 'home',
            label: 'Home'
          },
          {
            path: '/editor',
            icon: 'code',
            label: 'Editor'
          },
          {
            path: '/environments',
            label: 'Environments',
            icon: 'language',
          },
          {
            label: 'Monitor',
            icon: 'bar_chart',
            children: [
              {
                path: '/monitor',
                label: 'Overview'
              },
              {
                path: '/monitor/queries',
                label: 'Queries'
              },
              {
                path: '/monitor/consumption',
                label: 'Consumption'
              },
              {
                path: '/monitor/cost-calculator',
                label: 'Cost calculator'
              },
              {
                path: '/monitor/alerts',
                label: 'Alerts'
              },
            ]
          },
          {
            label: "Access management",
            path: '/access-management',
            icon: "person",
            children: [
              {
                path: 'access-management',
                label: 'Organization Admins'
              },
              {
                path: '/access-management/identity-providers',
                label: 'Identity providers'
              },
              {
                path: '/access-management/realms',
                label: 'Realms'
              },
              {
                path: '/access-management/token-access',
                label: 'Token access'
              },
            ]
          },
          {
            label: 'Data management',
            icon: 'database',
            children: [
              {
                path: '/data-management/overview',
                label: 'Overview'
              },
              {
                path: '/data-management/data-copy',
                label: 'Data copy'
              },
              {
                path: '/data-management/data-migration',
                label: 'Data migration'
              },
              {
                path: '/data-management/flows',
                label: 'Flows'
              },
            ]
          },
        ]
      },
      'environments': {
        path: '/environments/**',
        children: [
          {
            path: ['/environments', this.sectionName],
            icon: 'language',
            label: this.sectionName
          },
          {
            path: ['/environments', this.sectionName, 'users'],
            icon: 'nearby',
            label: 'Users'
          },
          {
            path: ['/environments', this.sectionName, 'compute-groups'],
            icon: 'nearby',
            label: 'Compute groups'
          },
          {
            path: ['/environments', this.sectionName, 'backups'],
            icon: 'nearby',
            label: 'Backups'
          },
          {
            path: ['/environments', this.sectionName, 'query-grid'],
            icon: 'nearby',
            label: 'QueryGrid'
          },
        ]
      },
      'consumption': {
        path: '/monitor/consumption/**',
        children: [
          {
            path: ['monitor', 'consumption', this.sectionName],
            icon: 'language',
            label: this.sectionName
          },
        ]
      },
    }
    const navMatches = [];

    for (const navKey in navMap) {
      const nav = navMap[navKey];
      if (minimatch(url, nav.path)){
        navMatches.push(nav)
      }
    }
    
    return navMatches.pop() ?? navMap['home'];
  }

  checkActive(path: string| any[] = []) {
    if (typeof path === 'string') {
      return this.router.isActive(path, true) ? true : null
    } else {
      return this.router.isActive(path?.join('/'), true) ? true : null
    }   
  }

  checkActiveChildren(children: navigationItem[] = []) {
    let isActive = false;
    for (let i=0; i < children.length; i++) {
      let itemPath = children[i]?.path;
      if (itemPath) {
        let isActive = this.checkActive(itemPath);
        if (isActive) {
          return isActive ?  true : null;
        }
      }
    }
    return isActive ?  true : null;    
  }

  toggleHelp () {
    this.helpOpen = !this.helpOpen;
    
    if (!this.helpDocked) {
      this.toggleHelpWindow()
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
      this.helpDialog = this.markdownNavigatorWindowService.open({ items: this.items });

      this.helpDialog.componentInstance.dockToggled.subscribe(()=>{
        this.markdownNavigatorWindowService.close();
        this.helpDocked = true;
        this.helpOpen = true;
        this.cdr.markForCheck();
      })
    }
  }

  toggleDockedMode() {
    this.helpDocked = !this.helpDocked;

    if (!this.helpDocked) {
      this.toggleHelpWindow()
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
    localStorage.setItem('app-preference-open', this.forcedOpen.toString())
  }
  
  getHelpJSON(fileName = 'Vantage/base-help-en.json'): Observable<IMarkdownNavigatorItem[]> {
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
