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

  ngOnInit() {
    this.heroService.Heroes
      .subscribe(x => this.heroes = x);
  }

  add(name: string): void  {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });  
  }

}
