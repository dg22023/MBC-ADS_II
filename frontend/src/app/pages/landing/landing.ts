// Duplicate legacy/stub file removed from compilation surface.
// The real component implementation is in `landing.component.ts`.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { Space } from '../../models/space.model';

@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class Landing {
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
