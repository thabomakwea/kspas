import { Component, OnInit, TemplateRef } from '@angular/core';
import { DependentsService } from '../../common/services/dependents.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css'],
  providers: [DependentsService, BsModalService]
})
export class UserDependentsComponent implements OnInit {
  public dependents;
  public dependent: any;
  public user;
  modalRef: BsModalRef;
  loadDependents = false;
  constructor(private dependentsService: DependentsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('userData'));
    this.getDependents();
  }
  getDependents() {
    const dependentObj = {
      userId: {'meta_key': 'ct_Main_membe_text_a55f', 'user_id': this.user.ID}
    };
    this.dependentsService.getUsersDependents(dependentObj).subscribe(
      res => {
        if (res.lentgh > 0) { this.loadDependents = true; }
        this.dependents = res.map(
          data => {
            return data.dependentMeta;
          }
        );
        console.log('Res: ', this.dependents);
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }
    openModal(template: TemplateRef<any>, dependent) {
      console.log('dependent:', dependent);
      const dependentObj = {
        firstName: dependent.ct_name_text_e394[0],
        lastName: dependent.ct_Last_name_text_3960[0],
        dob: dependent.ct_Date_of_bi_text_e345[0],
        dependentType: dependent.ct_Dependent__text_c916[0],
        idNumber: dependent.ct_ID_text_e7e5[0],
        mainMemeberId: dependent.ct_Main_membe_text_a55f[0]
      };
      this.dependent = dependentObj;
      this.modalRef = this.modalService.show(template);
      console.log('dependent: ', this.dependent);
    }
}
