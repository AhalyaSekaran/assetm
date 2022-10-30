import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetNameComponent } from './add-asset-name.component';

describe('AddAssetNameComponent', () => {
  let component: AddAssetNameComponent;
  let fixture: ComponentFixture<AddAssetNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssetNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
