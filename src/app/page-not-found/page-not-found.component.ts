import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('menuNav') menuNav!: ElementRef;
  @ViewChild('menuNavItem') menuNavItem!: ElementRef;
  public showMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    if (!this.showMenu) {
      this.hamburger.nativeElement.classList.add('open');
      this.navbar.nativeElement.classList.add('open');
      this.menuNav.nativeElement.classList.add('open');
      this.showMenu = true;
    } else {
      this.hamburger.nativeElement.classList.remove('open');
      this.navbar.nativeElement.classList.remove('open');
      this.menuNav.nativeElement.classList.remove('open');
      this.showMenu = false;
    }
  }

}
