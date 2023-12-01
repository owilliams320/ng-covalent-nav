import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccessManagementComponent } from './admin-access-management.component';

describe('AdminAccessManagementComponent', () => {
  let component: AdminAccessManagementComponent;
  let fixture: ComponentFixture<AdminAccessManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccessManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccessManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
