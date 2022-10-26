import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
