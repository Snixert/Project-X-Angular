import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcreationComponent } from './charcreation.component';

describe('CharcreationComponent', () => {
  let component: CharcreationComponent;
  let fixture: ComponentFixture<CharcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharcreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
