import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleDetailsComponent } from './bible-details.component';

describe('BibleDetailsComponent', () => {
  let component: BibleDetailsComponent;
  let fixture: ComponentFixture<BibleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
