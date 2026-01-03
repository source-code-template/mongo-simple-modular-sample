import { Db } from "mongodb"
import { Repository } from "mongodb-extension"
import { Log, UseCase } from "onecore"
import { UserController } from "./controller"
import { User, UserFilter, userModel, UserRepository, UserService } from "./user"
export * from "./controller"
export * from "./user"

export class MongoUserRepository extends Repository<User, string, UserFilter> implements UserRepository {
  constructor(db: Db) {
    super(db, "users", userModel)
  }
}
export class UserUseCase extends UseCase<User, string, UserFilter> implements UserService {
  constructor(repository: UserRepository) {
    super(repository)
  }
}

export function useUserController(db: Db, log: Log): UserController {
  const repository = new MongoUserRepository(db)
  const service = new UserUseCase(repository)
  return new UserController(service, log)
}
