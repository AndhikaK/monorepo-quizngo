import { User } from '../entities/users.entity';

export interface ICreateUser {
  name: User['name'];
  email: User['email'];
  password: User['password'];
}
