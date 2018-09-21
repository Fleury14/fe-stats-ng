import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRacesComponent } from './current-races.component';

describe('CurrentRacesComponent', () => {
  let component: CurrentRacesComponent;
  let fixture: ComponentFixture<CurrentRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
