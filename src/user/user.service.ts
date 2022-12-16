import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserModel } from './user.interface';

@Injectable()
export class UserService {
  //TODO: implement database
  private users: Array<UserModel> = [];

  public findAll(): Array<UserModel> {
    return this.users;
  }

  public findOne(id: number): UserModel {
    const user: UserModel = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public create(user: UserModel): UserModel {
    //if the name is already assigned to another user
    const nameExists: boolean = this.users.some(
      (item) => item.name === user.name,
    );

    if (nameExists) {
      throw new UnprocessableEntityException('User name already exists.');
    }

    const maxId: number = Math.max(...this.users.map((user) => user.id), 0);
    const id = maxId + 1;

    const newUser: UserModel = {
      ...user,
      id,
    };

    this.users.push(newUser);

    return newUser;
  }

  public delete(id: number): void {
    const index: number = this.users.findIndex((user) => user.id === id);

    //if user not found
    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }

  public update(id: number, user: UserModel): UserModel {
    //if user not found
    const index: number = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    //if the name is already assigned to another user
    const nameExists: boolean = this.users.some(
      (item) => item.name === user.name,
    );

    if (nameExists) {
      throw new UnprocessableEntityException('User name already exists.');
    }

    const updatedUser: UserModel = {
      ...user,
      id,
    };

    this.users[index] = updatedUser;

    return updatedUser;
  }
}
