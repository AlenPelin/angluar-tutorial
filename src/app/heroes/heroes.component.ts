import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'] 
})
export class HeroesComponent implements OnInit {

  constructor(
    private heroService: HeroService,
  ) { }

  heroes: Hero[];

  selectedHero: Hero = null;

  async ngOnInit() {
    this.heroService.Heroes
      .subscribe(x => this.heroes = x);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
