// Duplicate legacy/stub file removed from compilation surface.
// The real component implementation is in `login.component.ts`.

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule, 
		ReactiveFormsModule, 
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class Login {
	form = this.fb.group({
		userName: ['', Validators.required],
		password: ['', Validators.required]
	});
	redirectTo: string | null = null;

	constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
		this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
	}

	login() {
		if (this.form.invalid) {
			alert('Complete los campos.');
			return;
		}
		const userName = this.form.value.userName;
		localStorage.setItem('userName', userName as string);
		if (this.redirectTo) {
			this.router.navigateByUrl(this.redirectTo);
		} else {
			this.router.navigate(['/']);
		}
	}

	goToReservation() {
		this.router.navigate(['/']);
	}
}
