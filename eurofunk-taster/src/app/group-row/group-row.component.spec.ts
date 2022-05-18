import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowComponent } from './group-row.component';

describe('UserComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
