import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import {FormBuilder} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  users = [];
  total_users: number;
  closeResult: string
  user_ind: any
  data_user;

  constructor(private modalService: NgbModal,
              private router: Router,
              private _userService: UserService,
              private formBuilder: FormBuilder,) {
    this.data_user = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      occupation: [''],
      organization: [''],
      location: [''],
      socmed: [''],
      website_url: [''],
      wallet_address: [''],
      organization_email: [''],
      about: [''],
      author_id: ['']
    });
  }

  ngOnInit(): void {
    //call backend APIs
    // save into campaigns and display campaigns

    this._userService.getUser()
      .subscribe(users => {
        this.users = users;
        this.total_users = Object.keys(users).length
      });
  }

  open(content, user_id: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this._userService.getUserById(user_id)
      .subscribe(user_ind => {
        this.user_ind = user_ind;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    let values = this.data_user.value

    this._userService.updateUser(
      values.first_name,
      values.last_name,
      values.email,
      values.occupation,
      values.organization,
      values.location,
      values.socmed,
      values.wallet_address,
      values.website_url,
      values.organization_email,
      values.about,
      values.author_id
    );
    this.modalService.dismissAll();
  }
}
