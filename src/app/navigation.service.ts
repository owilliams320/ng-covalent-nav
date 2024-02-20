import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _currentNavIdBS$ = new BehaviorSubject<string>('home');
  private _currentContainedBS$ = new BehaviorSubject<boolean>(false);
  private _currentNavTitleBS$ = new Subject<{name?: string, route?: string, sectionName?:string}>();
  private _currentNavSectionBS$ = new Subject<string>();

  navId$ = this._currentNavIdBS$.asObservable();
  navTitle$ = this._currentNavTitleBS$.asObservable();
  navSection$ = this._currentNavSectionBS$.asObservable();

  constructor() {}

  setNavId(navId: string) {
    this._currentNavIdBS$.next(navId);
  }

  setNavTitle(title: {name?: string, route?: string, sectionName?: string}) {
    this._currentNavTitleBS$.next({ name:title.name, route:title.route, sectionName: title.sectionName });
  }

  setContained(contained: boolean) {
    this._currentContainedBS$.next(contained);
  }
}
