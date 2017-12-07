import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../user/authentication.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  ngOnInit() {
  }

}
