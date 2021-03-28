import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(private jwtHelper:JwtHelperService , private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
     const token = localStorage.getItem("jwt")
     if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    
    this.router.navigate(["/login"]);
    return false;

  }

}
