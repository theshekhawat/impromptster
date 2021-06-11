import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWheelComponent } from './game-wheel.component';

describe('GameWheelComponent', () => {
  let component: GameWheelComponent;
  let fixture: ComponentFixture<GameWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameWheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
