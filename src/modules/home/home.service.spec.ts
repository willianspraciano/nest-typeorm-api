import { HomeService } from './home.service';

describe('HomeService', () => {
  let homeService: HomeService;

  beforeEach(() => {
    homeService = new HomeService();
  });

  it('should be defined', () => {
    expect(homeService).toBeDefined();
  });

  it('should return server status', () => {
    const result = homeService.getStatus();
    expect(result).toEqual({ status: 'Server running!' });
  });
});
