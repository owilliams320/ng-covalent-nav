import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnvironmentComponent } from './create-environment.component';

describe('CreateEnvironmentComponent', () => {
  let component: CreateEnvironmentComponent;
  let fixture: ComponentFixture<CreateEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEnvironmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
