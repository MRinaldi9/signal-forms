import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
  host: {
    class: 'block p-8 bg-gray-50 min-h-screen',
  },
})
export class App {
  protected readonly title = signal('signal-forms');
}
