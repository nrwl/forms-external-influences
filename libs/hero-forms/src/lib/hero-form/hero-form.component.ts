import { Component, OnDestroy, EventEmitter, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap, mapTo, map } from 'rxjs/operators';
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
  @Output() nameEnabled;

  toggleNameEnabled() {
    const nameControl = this.form.get('name');
    nameControl.enabled
      ? nameControl.disable({ emitEvent: true })
      : nameControl.enable({ emitEvent: true });
  }

  writeValue(v: Hero) {
    if (this.form) {
      this.form.setValue(v);
    } else {
      this.form = createHeroFormGroup(v);
      this.nameEnabled = this.form.get('name').valueChanges.pipe(
        startWith(this.form.get('name').value),
        tap(() => console.log('emit')),
        tap(() => console.log(this.form.get('name'))),
        takeUntil(this._destroying),
        map(() => this.form.get('name').enabled)
      );
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
