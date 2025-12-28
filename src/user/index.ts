import { Db } from "mongodb"
import { buildQuery, Repository, SearchBuilder } from "mongodb-extension"
import { Log, Search, UseCase } from "onecore"
import { UserController } from "./controller"
import { User, UserFilter, userModel, UserRepository, UserService } from "./user"
export * from "./controller"
export * from "./user"

export class MongoUserRepository extends Repository<User, string> implements UserRepository {
  constructor(db: Db) {
    super(db, "users", userModel)
  }
}
export class UserUseCase extends UseCase<User, string, UserFilter> implements UserService {
  constructor(search: Search<User, UserFilter>, repository: UserRepository) {
    super(search, repository)
  }
}

export function useUserController(db: Db, log: Log): UserController {
  const builder = new SearchBuilder<User, UserFilter>(db, "user", buildQuery, userModel)
  const repository = new MongoUserRepository(db)
  const service = new UserUseCase(builder.search, repository)
  return new UserController(service, log)
}
