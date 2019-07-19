import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import 'rxjs/add/operator/map';
import { Router ,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  
  constructor(private auth:AuthService,private router : Router) { }
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot )
    : Observable<boolean> | Promise<boolean> |boolean {
    return this.auth.user$.map(user => {
      if(user) {return true};
      
      this.router.navigate(['/login'],{queryParams : {return: state.url }});
      return false;
    });
  }
}
