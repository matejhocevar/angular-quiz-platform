import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../components/auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private authService: AuthService
  ) {
  }
}
