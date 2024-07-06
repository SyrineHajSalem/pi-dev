import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeichuleComponent } from './veichule.component';

describe('VeichuleComponent', () => {
  let component: VeichuleComponent;
  let fixture: ComponentFixture<VeichuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeichuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeichuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
