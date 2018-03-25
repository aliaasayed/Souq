import { TestBed, inject } from '@angular/core/testing';

import { UsersProfileService } from './users-profile.service';

describe('UsersProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersProfileService]
    });
  });

  it('should be created', inject([UsersProfileService], (service: UsersProfileService) => {
    expect(service).toBeTruthy();
  }));
});
