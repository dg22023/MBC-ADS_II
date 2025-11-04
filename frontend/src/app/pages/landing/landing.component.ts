import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Space } from '../../models/space.model';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {  // 👈 SIN standalone
  spaces: Space[] = [];

  constructor(private svc: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.svc.getSpaces().subscribe(s => this.spaces = s);
  }

  goToReserve(space: Space) {
    const user = localStorage.getItem('userName');
    if (!user) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: `/reserve/${space.id}` }});
      return;
    }
    this.router.navigate(['/reserve', space.id]);
  }
}
