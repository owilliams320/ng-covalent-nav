import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeGroupsComponent } from './compute-groups.component';

describe('ComputeGroupsComponent', () => {
  let component: ComputeGroupsComponent;
  let fixture: ComponentFixture<ComputeGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputeGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
