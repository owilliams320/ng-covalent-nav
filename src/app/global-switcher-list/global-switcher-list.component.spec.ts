import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSwitcherListComponent } from './global-switcher-list.component';

describe('GlobalSwitcherListComponent', () => {
  let component: GlobalSwitcherListComponent;
  let fixture: ComponentFixture<GlobalSwitcherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSwitcherListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSwitcherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
