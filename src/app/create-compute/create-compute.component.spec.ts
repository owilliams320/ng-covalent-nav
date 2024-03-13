import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComputeComponent } from './create-compute.component';

describe('CreateComputeComponent', () => {
  let component: CreateComputeComponent;
  let fixture: ComponentFixture<CreateComputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComputeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateComputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
