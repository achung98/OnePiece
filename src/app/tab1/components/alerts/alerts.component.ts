import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  private tips: string[] = [
    "Start small. Think Big.",
    "Cook at home, don't order out!",
    "Treat yourself, but use it as an opportunity to save."
  ]

  private sliderConfig: any = {
    'centeredSlides': true,
    'slidesPerView': 1.6
  }

  constructor() { }

  ngOnInit() {}

}
