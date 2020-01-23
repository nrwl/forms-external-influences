import { async, TestBed } from '@angular/core/testing';
import { HeroFormsModule } from './hero-forms.module';

describe('HeroFormsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeroFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HeroFormsModule).toBeDefined();
  });
});
