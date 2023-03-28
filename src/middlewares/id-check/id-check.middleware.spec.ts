import { IdCheckMiddleware } from './id-check.middleware';

describe('IdCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new IdCheckMiddleware()).toBeDefined();
  });
});
