import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route) {
    return this.authService.isAuthenticated();
  }
}

@Injectable()
export class SignUpGuard implements CanActivate, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return environment.allowRegistrations;
  }

  canLoad(route: Route) {
    return environment.allowRegistrations;
  }
}
