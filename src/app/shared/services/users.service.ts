import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {User} from '../models/user.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi{
  constructor(public http: HttpClient) {
    super(http);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(map(user => user[0] ? user[0] : undefined));
    }
  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
