import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonnaComponent } from './colonna.component';

describe('ColonnaComponent', () => {
  let component: ColonnaComponent;
  let fixture: ComponentFixture<ColonnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColonnaComponent]
    });
    fixture = TestBed.createComponent(ColonnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
