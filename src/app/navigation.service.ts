import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Subject, filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _currentNavIdBS$ = new BehaviorSubject<string>('home');
  private _currentContainedBS$ = new BehaviorSubject<boolean>(false);
  private _currentNavTitleBS$ = new Subject<{
    name?: string;
    route?: string;
    sectionName?: string;
    contained?: boolean;
  }>();
  private _currentNavSectionBS$ = new Subject<string>();

  navId$ = this._currentNavIdBS$.asObservable();
  navTitle$ = this._currentNavTitleBS$.asObservable();
  navSection$ = this._currentNavSectionBS$.asObservable();

  private previousUrl: string = '/';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  setNavId(navId: string) {
    this._currentNavIdBS$.next(navId);
  }

  setNavTitle(title: {
    name?: string;
    route?: string;
    sectionName?: string;
    contained?: boolean;
  }) {
    this._currentNavTitleBS$.next(title);
  }

  setContained(contained: boolean) {
    this._currentContainedBS$.next(contained);
  }

  public getPreviousUrl() {
    return this.previousUrl;
   }

}
