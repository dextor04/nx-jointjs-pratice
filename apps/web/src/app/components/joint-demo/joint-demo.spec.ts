import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointDemo } from './joint-demo';

describe('JointDemo', () => {
  let component: JointDemo;
  let fixture: ComponentFixture<JointDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
