import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Space } from '../../models/space.model';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
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
    // Verificar disponibilidad
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
