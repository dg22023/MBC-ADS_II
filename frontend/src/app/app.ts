// Duplicate legacy/stub file removed from compilation surface.
// Original file created a standalone-style component that conflicted
// with the real `AppComponent` implementation in `app.component.ts`.
// Keep this file as a harmless stub to avoid accidental inclusion.

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class App {
	protected title = 'mbc-adsii-front';
}
