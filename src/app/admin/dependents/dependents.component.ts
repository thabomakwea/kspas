import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../../common/services/dependents.service';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css'],
  providers: [DependentsService]
})
export class DependentsComponent implements OnInit {
  public dependents;
  constructor(private dependentsService: DependentsService) { }

  ngOnInit() {
    this.getDependents();
  }
  getDependents() {
    this.dependentsService.getDependents().subscribe(
      res => {
        this.dependents = res.posts;
        console.log('Res: ', res.posts);
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }
}
