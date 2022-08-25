import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    darkMode : boolean = false;

    switchTheme() {
      let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

      (this.darkMode)
      ?
      (
        themeLink.href = "lara-light-teal.css",
        this.darkMode = false
      )
      :
      (
        themeLink.href = "lara-dark-teal.css",
        this.darkMode = true
      );
    }
}
