import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOpsComponent } from './model-ops.component';

describe('ModelOpsComponent', () => {
  let component: ModelOpsComponent;
  let fixture: ComponentFixture<ModelOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
