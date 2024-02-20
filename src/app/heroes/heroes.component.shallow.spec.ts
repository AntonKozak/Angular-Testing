import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from './hero.service';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroComponent (shallow tests)', () => {
  // creating a variable to hold the component instance
  let fixture: ComponentFixture<HeroesComponent>;
  //creating a mock service variable to hold the mock service
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
    //creating a mock service object with a methods that the component uses
    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      //add the HeroService to the providers array to tell Angular to use the mock service
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      //add NO_ERRORS_SCHEMA to the schemas array to tell Angular to ignore the child components
      schemas: [NO_ERRORS_SCHEMA],
    });
    //create the component instance and looks for dependencies like services
    //and injects them into the component
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    //arrange
    //tell the mock service to return an observable of the HEROES array
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    //act
    //detect changes to the component's template
    fixture.detectChanges();
    //assert
    //expect the heroes property to be the HEROES array
    //heroes from heroes.component.ts
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

});
