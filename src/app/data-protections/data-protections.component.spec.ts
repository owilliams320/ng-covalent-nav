import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionsComponent } from './data-protections.component';

describe('DataProtectionsComponent', () => {
  let component: DataProtectionsComponent;
  let fixture: ComponentFixture<DataProtectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataProtectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataProtectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
