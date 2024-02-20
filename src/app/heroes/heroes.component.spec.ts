import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('Heroes Component to Test', ()=>{
    
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES=[
            {id:1, name:'SpiderDude', strength:8},
            {id:2, name:'Wonderful Woman', strength:24},
            {id:3, name:'SuperDude', strength:55}
        ];
        //Create a mock object with the methods that we want to use in the test case
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });
    
    describe('delete', ()=>{

        it('should remove the indicated hero from the heroes list', ()=>{
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });

        it('should call deleteHero', ()=>{
            //return observable of true when deleteHero is called with the hero object as argument 
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });

    })


})