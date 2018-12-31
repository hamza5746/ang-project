import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroomsComponent } from './userrooms.component';

describe('UserroomsComponent', () => {
  let component: UserroomsComponent;
  let fixture: ComponentFixture<UserroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
