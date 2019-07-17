import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthService,private router : Router,private userService : UserService){
    auth.user$.subscribe(user => {
      userService.save(user); 

      if(!user) return;
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      
      if(!localStorage) return;
      
      localStorage.removeItem(returnUrl);
      router.navigateByUrl(returnUrl);
    })
  }
}

