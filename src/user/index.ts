import { Controller } from 'express-ext';
import { Db } from 'mongodb';
import { buildQuery, Repository, SearchBuilder } from 'mongodb-extension';
import { Manager, SearchResult } from 'onecore';
import { User, UserFilter, userModel, UserRepository, UserService } from './user';
export * from './user';

export class MongoUserRepository extends Repository<User, string> implements UserRepository {
  constructor(db: Db) {
    super(db, 'users', userModel.attributes);
  }
}
export class UserManager extends Manager<User, string, UserFilter> implements UserService {
  constructor(find: (s: UserFilter, limit?: number, offset?: number | string, fields?: string[]) => Promise<SearchResult<User>>, repository: UserRepository) {
    super(find, repository);
  }
}
export class UserController extends Controller<User, string, UserFilter> {
  constructor(log: (msg: string) => void, userService: UserService) {
    super(log, userService);
  }
}

export function useUser(db: Db): UserService {
  const builder = new SearchBuilder<User, UserFilter>(db, 'users', buildQuery, userModel.attributes);
  const repository = new MongoUserRepository(db);
  return new UserManager(builder.search, repository);
}
export function useUserController(log: (msg: string) => void, db: Db): UserController {
  return new UserController(log, useUser(db));
}
