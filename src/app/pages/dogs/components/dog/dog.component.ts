import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogComponent {
  @Input() imgSrc!: string;
  @Input() name!: string;
  @Input() favorite!: boolean;
  @Input() favoriteChangeInProgress!: boolean;
  @Output() favoriteClick = new EventEmitter<void>();
}
