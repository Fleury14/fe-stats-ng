import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRankingsComponent } from './player-rankings.component';

describe('PlayerRankingsComponent', () => {
  let component: PlayerRankingsComponent;
  let fixture: ComponentFixture<PlayerRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
