import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Space } from '../../models/space.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
	selector: 'app-landing',
	standalone: true,
	imports: [
		CommonModule, 
		ReactiveFormsModule, 
		FormsModule, 
		MatFormFieldModule, 
		MatInputModule, 
		MatSelectModule, 
		MatButtonModule, 
		MatCheckboxModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class Landing implements OnInit {
	spaces: Space[] = [];
	selectedSpace?: Space;
	form!: FormGroup;
	availableTimes: string[] = [];
	tipos: string[] = ['Aula', 'Laboratorio', 'Sala', 'Otro'];
	timeSlots: string[] = [];
	endTimeOptions: string[] = [];
	equipmentOptions: string[] = [];
	equipmentSelected: { [k: string]: boolean } = {};
	userName = '';

	sidebarCollapsed: boolean = false;

		constructor(private svc: ReservationService, private fb: FormBuilder, private router: Router) {}

		toggleSidebar() {
			this.sidebarCollapsed = !this.sidebarCollapsed;
		}

		goToLogin() {
			this.router.navigate(['/login'], { queryParams: { redirectTo: '/' } });
		}

		goToReservation() {
			setTimeout(() => {
				const el = document.getElementById('reserva');
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 50);
		}

	ngOnInit(): void {
		this.svc.getSpaces().subscribe(s => {
			this.spaces = s;
			if (s.length) {
				this.selectedSpace = s[0];
				this.availableTimes = s[0].availableTimes;
			}
		});
		this.timeSlots = this.generateTimeSlots('06:00', '21:00', 15);
		this.endTimeOptions = [...this.timeSlots];
		this.userName = localStorage.getItem('userName') || '';
		this.form = this.fb.group({
			spaceId: [null, Validators.required],
			type: ['', Validators.required],
			date: ['', Validators.required],
			startTime: ['', Validators.required],
			endTime: ['', Validators.required],
			capacity: [1, [Validators.required, Validators.min(1)]],
			proyector: [false],
			pc: [false],
			otro: [false]
		});
		this.form.get('spaceId')?.valueChanges.subscribe(id => {
			const found = this.spaces.find(s => s.id === +id);
			this.selectedSpace = found;
			this.availableTimes = found?.availableTimes || [];
			this.form.patchValue({
				type: found?.type || '',
				capacity: 1
			});
			this.updateEquipmentOptions(found?.type || '');
		});

		this.form.get('type')?.valueChanges.subscribe(t => {
			this.updateEquipmentOptions(t || '');
		});

		this.form.get('startTime')?.valueChanges.subscribe(start => {
			if (!start) {
				this.endTimeOptions = [...this.timeSlots];
				return;
			}
			const idx = this.timeSlots.indexOf(start);
			this.endTimeOptions = idx >= 0 ? this.timeSlots.slice(idx + 1) : [...this.timeSlots];
			const curEnd = this.form.get('endTime')?.value;
			if (curEnd && this.endTimeOptions.indexOf(curEnd) === -1) {
				this.form.get('endTime')?.setValue('');
			}
		});
	}

	generateTimeSlots(start: string, end: string, intervalMin: number): string[] {
		const toMinutes = (hms: string) => {
			const [h, m] = hms.split(':').map(Number);
			return h * 60 + m;
		};
		const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
		const res: string[] = [];
		let cur = toMinutes(start);
		const last = toMinutes(end);
		while (cur <= last) {
			const hh = Math.floor(cur / 60);
			const mm = cur % 60;
			res.push(`${pad(hh)}:${pad(mm)}`);
			cur += intervalMin;
		}
		return res;
	}

	updateEquipmentOptions(type: string) {
		const map: { [k: string]: string[] } = {
			'Aula': ['Proyector', 'PC', 'Pizarra', 'Micrófono', 'Extensión'],
			'Laboratorio': ['PC', 'Cables', 'Cámara', 'Impresora', 'Licencias'],
			'Sala': ['Televisión', 'Videoconferencia', 'Altavoces', 'Pizarra'],
			'Otro': ['Microfono', 'Extension', 'Adaptador']
		};
		this.equipmentOptions = map[type] || ['Proyector', 'PC', 'Pizarra'];
		this.equipmentSelected = {};
		this.equipmentOptions.forEach(e => (this.equipmentSelected[e] = false));
	}

	submit() {
		if (!this.selectedSpace) return;
		if (this.form.invalid) {
			alert('Complete los campos.');
			return;
		}
			const { type, date, startTime, endTime, capacity, proyector, pc, otro } = this.form.value;
			if (capacity > (this.selectedSpace?.capacity || 1)) {
			alert('La capacidad excede el máximo permitido.');
			return;
		}
			if (!startTime || !endTime) {
				alert('Seleccione horario de inicio y fin.');
				return;
			}
			const time = `${startTime}-${endTime}`;
			const formattedDate = date instanceof Date ? 
				date.toISOString().split('T')[0] : 
				date;
			const can = this.svc.isTimeAvailable(this.selectedSpace.id, formattedDate, time);
		if (!can) {
			alert('El horario ya está reservado. Elige otro.');
			return;
		}
			const equipment: string[] = Object.keys(this.equipmentSelected).filter(k => this.equipmentSelected[k]);
			if (!equipment.length) {
				if (proyector) equipment.push('Proyector');
				if (pc) equipment.push('PC');
				if (otro) equipment.push('Otro');
			}
		const reservation = {
			spaceId: this.selectedSpace.id,
			userName: this.userName || 'Anon',
			date: formattedDate,
			time,
			type,
			capacity,
			equipment
		};
				this.svc.addReservation(reservation).subscribe(() => {
					alert('Reserva confirmada');
					this.form.reset();
					this.router.navigate(['/login'], { queryParams: { redirectTo: '/' } });
				});
	}

			onEquipmentChange(checked: boolean, option: string) {
				this.equipmentSelected[option] = !!checked;
			}
}
