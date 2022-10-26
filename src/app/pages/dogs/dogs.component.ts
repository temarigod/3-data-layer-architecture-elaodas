import {
  ChangeDetectionStrategy,
  Component,
  TrackByFunction,
} from '@angular/core';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces/dog.interface';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
  providers: [DogsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsComponent {
  constructor(public readonly dogsService: DogsService) {}

  public trackBy: TrackByFunction<Dog> = (_, dog): string => {
    return dog.id;
  };
}
