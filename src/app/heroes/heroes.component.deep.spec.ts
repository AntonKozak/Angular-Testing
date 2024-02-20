import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HeroComponent } from '../hero/hero.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Heroes Component Deep Spec TS', () => {
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
      declarations: [
        HeroesComponent,
        HeroComponent
    ],
      //add the HeroService to the providers array to tell Angular to use the mock service
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      //add NO_ERRORS_SCHEMA to the schemas array to tell Angular to ignore the child components
      schemas: [NO_ERRORS_SCHEMA],
    });
    //create the component instance and looks for dependencies like services
    //and injects them into the component
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
  });

    it('should set heroes correctly from the service', () => {
        //arrange
        //tell the mock service to return an observable of the HEROES array
        mockHeroService.getHeroes.and.returnValue(HEROES);
        //act
        fixture.detectChanges();
        //assert
        //expect the heroes property to be the HEROES array
        //heroes from heroes.component.ts
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should render each hero as a HeroComponent', () => {
        //arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //act
        //run ngOnInit 
        fixture.detectChanges();
        //assert
        //go and find all the instances of the HeroComponent
       const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
       expect(heroComponentDEs.length).toBe(3);
       //going from component to template get reference to the first instance of the HeroComponent
       expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
       //or make it in for loop
         for (let i = 0; i < heroComponentDEs.length; i++) {
              expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
         }
    });

    it(`should call heroService.deleteHero when the Hero Component's
    delete button is clicked`, () => {
      //arrange
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      //act
      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
      heroComponents[0].triggerEventHandler('delete', null);
      //assert
      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
      //arrange
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      const name = 'Mr. Ice';
      mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));
      //act
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
      inputElement.value = name;
      addButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      //assert
      const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
      expect(heroText).toContain(name);
    });

});
