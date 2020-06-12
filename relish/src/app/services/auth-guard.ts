import { authService } from './auth-service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class authGuard implements CanActivate {
    constructor(private authService: authService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean|UrlTree {
            const routeurl: string = state.url;
            return this.isLogin(routeurl);
        }

        isLogin(routeurl: string) {
            if (this.authService.isLoggedIn()) {
                return true;
            }
            this.authService.redirectUrl = routeurl;
            this.router.navigate([''], {queryParams: {returnUrl: routeurl}});
        }
    
}