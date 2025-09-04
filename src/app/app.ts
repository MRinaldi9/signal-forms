import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Playground</h1>
    <nav class="flex ">
      <a class="m-2 p-2 border border-black rounded" routerLink="signal-forms">Signal Forms</a>
    </nav>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('signal-forms');
}
