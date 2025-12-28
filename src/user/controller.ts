import { Controller } from "express-ext"
import { Log } from "onecore"
import { User, UserFilter, UserService } from "./user"

export class UserController extends Controller<User, string, UserFilter> {
  constructor(service: UserService, log: Log) {
    super(log, service)
  }
}
