import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleGuard, Reflector]
    }).compile();

    roleGuard = module.get<RoleGuard>(RoleGuard);
  });

  it('should be defined', () => {
    expect(roleGuard).toBeDefined();
  });
});
