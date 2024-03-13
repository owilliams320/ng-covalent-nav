import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBackupComponent } from './create-backup.component';

describe('CreateBackupComponent', () => {
  let component: CreateBackupComponent;
  let fixture: ComponentFixture<CreateBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBackupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
