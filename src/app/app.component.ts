import {AfterViewInit, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./template/navbar/navbar.component";
import {SidebarComponent} from "./template/sidebar/sidebar.component";
import jQuery from 'jquery';
import * as $ from 'jquery';
import {FooterComponent} from "./template/footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {EnderecoFormComponent} from "./empresa/endereco-form/endereco-form.component";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FooterComponent,
    RouterOutlet, CurrencyMaskModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  })
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    (function ($) {
      "use strict";

      // Add active state to sidbar nav links
      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        // @ts-ignore
        if (this.href === path) {
          $(this).addClass("active");
        }
      });

      // Toggle the side navigation
      $("#sidebarToggle").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);
  }
}
