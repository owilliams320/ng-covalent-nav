import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSwitcherOverlayListComponentComponent } from './global-switcher-overlay-list-component.component';

describe('GlobalSwitcherOverlayListComponentComponent', () => {
  let component: GlobalSwitcherOverlayListComponentComponent;
  let fixture: ComponentFixture<GlobalSwitcherOverlayListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSwitcherOverlayListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSwitcherOverlayListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
