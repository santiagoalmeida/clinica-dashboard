import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNav } from './top-nav/top-nav';
import { SideBar } from './side-bar/side-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule, 
    TopNav,
    SideBar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
  sidebarVisible = true;

  onToggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
