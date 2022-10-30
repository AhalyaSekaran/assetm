import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAssignedComponent } from './recently-assigned.component';

describe('RecentlyAssignedComponent', () => {
  let component: RecentlyAssignedComponent;
  let fixture: ComponentFixture<RecentlyAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
