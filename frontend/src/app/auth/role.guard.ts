// src/app/auth/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // expected roles spelled in route data as array: data.roles = ['admin']
    const expectedRoles: string[] = route.data['roles'] || [];

    return this.auth.user$().pipe(
      map(user => {
        if (!user) {
          // not logged in -> redirect to login
          this.auth.login(state.url);
          return false;
        }

        // user may not have roles claim; assume roles in user['https://minibooking.com/roles'] or user['roles']
        const userRoles: any = (user as any)?.['https://minibooking.com/roles'] || (user as any)?.roles || [];

        if (!expectedRoles || expectedRoles.length === 0) {
          // no role requirement
          return true;
        }

        // ensure array and compare
        const hasRole = Array.isArray(userRoles) && userRoles.some((r: any) => expectedRoles.includes(r));
        if (!hasRole) {
          // redirect to landing or unauthorized page
          this.router.navigate(['/landing']);
          return false;
        }

        return true;
      })
    );
  }
}
