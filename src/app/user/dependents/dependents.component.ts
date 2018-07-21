import { Component, OnInit } from '@angular/core';
import { DependentsService } from '../../common/services/dependents.service';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css'],
  providers: [DependentsService]
})
export class UserDependentsComponent implements OnInit {
  public dependents;
  public user;

  constructor(private dependentsService: DependentsService) { }

  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('userData'));
    this.getDependents();
  }
  getDependents() {
    const dependentObj = {
      userId: {'meta_key': 'ct_Main_membe_text_a55f', 'meta_value': this.user.ID }
    };
    this.dependentsService.getUsersDependents(dependentObj).subscribe(
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
