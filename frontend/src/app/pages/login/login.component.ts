import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  redirectTo: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]  // simulado
    });
    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
  }

  login() {
    if (this.form.invalid) {
      alert('Complete los campos.');
      return;
    }
    const userName = this.form.value.userName;
    localStorage.setItem('userName', userName);
    // Redirigir a la página original o a /
    if (this.redirectTo) {
      this.router.navigateByUrl(this.redirectTo);
    } else {
      this.router.navigate(['/']);
    }
  }
}
