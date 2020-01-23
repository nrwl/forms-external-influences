import { Component, OnDestroy, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { createHeroFormGroup, Hero } from '../hero-forms.utils';

@Component({
  selector: 'forms-external-influences-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HeroFormComponent,
      multi: true
    }
  ]
})
export class HeroFormComponent implements OnDestroy, ControlValueAccessor {
  private static COUNT = 0;
  private _destroying = new Subject<void>();
  form: FormGroup;
  id = HeroFormComponent.COUNT++;
  nameEnabled = new EventEmitter<boolean>();

  toggleNameEnabled() {
    const nameControl = this.form.get('name');
    nameControl.enabled ? nameControl.disable() : nameControl.enable();
    this.nameEnabled.emit(nameControl.enabled);
  }

  writeValue(v: Hero) {
    if (this.form) {
      this.form.setValue(v);
    } else {
      this.form = createHeroFormGroup(v);
      this.nameEnabled.emit(true);
    }
  }

  registerOnChange(fn) {
    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        takeUntil(this._destroying),
        // mapTo(this.form.getRawValue()), // when you want to still see the diabled field
        tap(fn)
      )
      .subscribe();
  }

  registerOnTouched() {}

  setDisabledState(disable: boolean) {
    disable ? this.form.disable() : this.form.enable;
  }

  ngOnDestroy() {
    this._destroying.next();
  }
}
