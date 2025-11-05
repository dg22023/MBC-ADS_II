// Duplicate legacy/stub file removed from compilation surface.
// The real component implementation is in `reserve.component.ts`.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Space } from '../../models/space.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-reserve',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
	templateUrl: './reserve.component.html',
	styleUrls: ['./reserve.component.css']
})
export class Reserve {
	space?: Space;
	form!: FormGroup;
	availableTimes: string[] = [];
	userName = '';

	constructor(
		private route: ActivatedRoute,
		private svc: ReservationService,
		private fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.svc.getSpaceById(id).subscribe(s => {
			this.space = s;
			this.availableTimes = s?.availableTimes || [];
		});

		this.userName = localStorage.getItem('userName') || '';

		this.form = this.fb.group({
			type: ['', Validators.required],
			date: ['', Validators.required],
			time: ['', Validators.required]
		});
	}

	submit() {
		if (!this.space) return;
		if (this.form.invalid) {
			alert('Complete los campos.');
			return;
		}
		const { type, date, time } = this.form.value;
		const can = this.svc.isTimeAvailable(this.space.id, date, time);
		if (!can) {
			alert('El horario ya está reservado. Elige otro.');
			return;
		}
		const reservation = {
			spaceId: this.space.id,
			userName: this.userName || 'Anon',
			date,
			time,
			type
		};
		this.svc.addReservation(reservation).subscribe(() => {
			alert('Reserva confirmada ✅');
			this.router.navigate(['/']);
		});
	}
}
