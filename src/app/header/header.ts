import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Playground</h1>
    </header>
    <nav class="flex mb-8 gap-4">
      <a
        class="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
        routerLink="employee-form"
        routerLinkActive="ring-4 ring-blue-400 bg-blue-700"
        >Employee Form</a
      >
      <a
        class="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
        routerLink="employee-posts"
        routerLinkActive="ring-4 ring-blue-400 bg-blue-700"
        >Employee Posts</a
      >
    </nav>
  `,
  styles: ``,
})
export class Header {}
