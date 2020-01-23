import { Component, ViewChild } from '@angular/core';
import { createHeroFormControl } from '@forms-external-influences/hero-forms';
import { HeroFormComponent } from 'libs/hero-forms/src/lib/hero-form/hero-form.component';

@Component({
  selector: 'forms-external-influences-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HeroFormComponent, { static: true })
  formComponent: HeroFormComponent;
  heroForm = createHeroFormControl();

  get nameControl() {
    return this.formComponent.form.get('name');
  }

  toggleNameEnabledViaFormGroupReference() {
    this.nameControl.enabled
      ? this.nameControl.disable()
      : this.nameControl.enable();
  }

  toggleNameEnabledViaChildMethod() {
    this.formComponent.toggleNameEnabled();
  }
}
