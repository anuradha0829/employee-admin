import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',    // external HTML file
  styleUrl:    './app.component.scss'     // external SCSS file
})
export class AppComponent {}
