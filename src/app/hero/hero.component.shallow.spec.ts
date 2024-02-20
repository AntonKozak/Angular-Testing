import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroComponent } from './hero.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('HeroComponent (shallow tests)', () => { 
    // creating a variable to hold the component instance
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        //creating model for testing the component in isolation 
        TestBed.configureTestingModule({
            //declarations same as ngModule declarations
            declarations: [HeroComponent],
            //schemas same as ngModule schemas
            schemas: [NO_ERRORS_SCHEMA],
        });
        //creating the component instance
        fixture = TestBed.createComponent(HeroComponent);
        //accessing the component instance
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    });

    it('should have the correct hero', () => {
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag', () => {
        //wrapper around the component's template and detects changes
        fixture.detectChanges();
        //debugElement more like a wrapper around the DOM element that represents the container for the component's template
        fixture.debugElement.nativeElement.querySelector('a');
        // nativeElement accessing the DOM element that represents the container for the component's template
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

    
});