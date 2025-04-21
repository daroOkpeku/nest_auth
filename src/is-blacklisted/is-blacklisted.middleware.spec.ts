import { IsBlacklistedMiddleware } from './is-blacklisted.middleware';

describe('IsBlacklistedMiddleware', () => {
  it('should be defined', () => {
    expect(new IsBlacklistedMiddleware()).toBeDefined();
  });
});
