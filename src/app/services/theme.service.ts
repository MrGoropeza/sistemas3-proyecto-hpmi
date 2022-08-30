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
        themeLink.href = "md-light-indigo.css",
        this.darkMode = false
      )
      :
      (
        themeLink.href = "md-dark-indigo.css",
        this.darkMode = true
      );
    }
}
