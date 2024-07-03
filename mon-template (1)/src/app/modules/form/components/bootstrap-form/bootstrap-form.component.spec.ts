import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapFormComponent } from './bootstrap-form.component';

describe('BootstrapFormComponent', () => {
  let component: BootstrapFormComponent;
  let fixture: ComponentFixture<BootstrapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootstrapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
