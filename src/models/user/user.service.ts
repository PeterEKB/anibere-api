import { Injectable } from '@nestjs/common';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private fakeDB: any[] = [
    {
      id: 'TestUser01',
      username: 'test01',
      password: 'test1234',
      name: {
        first: 'Jane',
        last: 'Doe',
      },
      image: 'assets/images/JaneDoe.png',
    },
    {
      id: 'TestUser02',
      username: 'test02',
      password: 'test1234',
      name: {
        first: 'John',
        last: 'Doe',
      },
      image: 'assets/images/JaneDoe.png',
    },
  ];

  #login$ = new Subject();

  test$ = new Observable((observer) => {
    observer.next({data: { cont: 'Connected' }});
    this.#login$
      .pipe(
        tap((x) => {
          observer.next(x);
        }),
      )
      .subscribe();
  });
  updatelogin(val: any) {
    this.#login$.next({data: {result: val}});;
  }

  validateUser(name: string, pass: string): User | string {
    const find: { User; username; password } | undefined =
      this.#xxfindByUsername(name);
    if (find !== undefined) {
      if (find.password == pass) {
        return this.formatUserInfo(find);
      } else {
        return 'Invalid password provided.';
      }
    } else {
      return 'Username not found.';
    }
  }
  async getUserById(id: string): Promise<User | string> {
    const find: User | undefined = this.#xxfindById(id);
    if (find !== undefined) {
      return this.formatUserInfo(find);
    } else {
      return 'User Id not found.';
    }
  }

  //!------------------------------!\\

  #xxfindByUsername(username: string) {
    const index = this.fakeDB.findIndex(
      (obj) => obj.username.toLowerCase() == username.toLowerCase(),
    );
    if (index !== -1) return this.fakeDB[index];
    else return undefined;
  }
  #xxfindById(id: string) {
    const index = this.fakeDB.findIndex(
      (obj) => obj.id.toLowerCase() == id.toLowerCase(),
    );
    return this.fakeDB[index];
  }

  //!------------------------------!\\

  formatUserInfo(info): User {
    let res = { ...info };
    delete res.password;
    return res;
  }
}
