import { HeroComponent } from '../hero/hero.component';
import { MessageService } from '../messages/message.service';
import { HeroesComponent } from './heroes.component';
import { inject, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroService } from './hero.service';

describe('Heroes Component Deep Spec TS', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      imports: [HttpClientTestingModule],
      providers: [
        //creating HeroService instance
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe('getHeroes', () => {
    it('should call get with the correct URL', () => {
      //arrange
      //call the getHeroes method and subscribe to the observable it returns to trigger the HTTP request
      service.getHero(4).subscribe();
      //act
      // Test that url correct
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      //assert
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();

    });
  });
});
