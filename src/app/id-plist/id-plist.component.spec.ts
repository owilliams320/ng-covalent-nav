import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdPListComponent } from './id-plist.component';

describe('IdPListComponent', () => {
  let component: IdPListComponent;
  let fixture: ComponentFixture<IdPListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdPListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdPListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
