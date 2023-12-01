import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOpComponent } from './model-op.component';

describe('ModelOpComponent', () => {
  let component: ModelOpComponent;
  let fixture: ComponentFixture<ModelOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
