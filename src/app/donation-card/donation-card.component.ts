import {Component, Input, OnInit} from '@angular/core';
import {Donation} from "../donation/donation";

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.css']
})
export class DonationCardComponent implements OnInit {
  @Input() donation!: Donation;
  constructor() { }

  ngOnInit(): void {
  }

}
