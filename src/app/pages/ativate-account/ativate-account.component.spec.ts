import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivateAccountComponent } from './ativate-account.component';

describe('AtivateAccountComponent', () => {
  let component: AtivateAccountComponent;
  let fixture: ComponentFixture<AtivateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivateAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
