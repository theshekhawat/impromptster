import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  @ViewChild('menuButton') menuButton!: ElementRef;
  @ViewChild('hamburger') hamburger!: ElementRef;
  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('menuNav') menuNav!: ElementRef;
  @ViewChild('menuNavItem') menuNavItem!: ElementRef;
  public showMenu = false;
  public imgBasePath = ConstantsService.imageAssetsBasePath;

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
