import { FormControl, FormGroup } from '@angular/forms';

export interface Hero {
  name: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    health: number;
  };
}

const defaultHero: Hero = {
  name: '',
  stats: {
    attack: 0,
    defense: 0,
    speed: 0,
    health: 0
  }
};

export const createHeroFormControl = (hero = defaultHero): FormControl =>
  new FormControl(hero);

export const createHeroFormGroup = (hero = defaultHero): FormGroup =>
  new FormGroup({
    name: new FormControl(hero.name),
    stats: new FormGroup({
      attack: new FormControl(hero.stats.attack),
      defense: new FormControl(hero.stats.defense),
      speed: new FormControl(hero.stats.speed),
      health: new FormControl(hero.stats.health)
    })
  });
