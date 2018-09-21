import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeStatsComponent } from './fe-stats.component';

describe('FeStatsComponent', () => {
  let component: FeStatsComponent;
  let fixture: ComponentFixture<FeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
