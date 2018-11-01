import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service-user/user.service';
import { IUserProfile, IWorkPlaceDetail, IQualificationDetail } from '../../../../shared_modules/userProfile';
import { UserGeneralDetailFormComponent } from '../user-general-detail-form/user-general-detail-form.component';
import { UserProfessionalDetailFormComponent } from '../user-professional-detail-form/user-professional-detail-form.component';
import { UserWorkPlaceDetailFormComponent } from '../user-work-place-detail-form/user-work-place-detail-form.component';
import { UserQualificationDetailFormComponent } from '../user-qualification-detail-form/user-qualification-detail-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(UserGeneralDetailFormComponent)
  private userGeneralDetailFormComponent: UserGeneralDetailFormComponent;

  @ViewChild(UserProfessionalDetailFormComponent)
  private userProfessionalDetailFormComponent: UserProfessionalDetailFormComponent;

  @ViewChild(UserWorkPlaceDetailFormComponent)
  private userWorkPlaceDetailFormComponent: UserWorkPlaceDetailFormComponent;

  @ViewChild(UserQualificationDetailFormComponent)
  private userQualificationDetailFormComponent: UserQualificationDetailFormComponent;

  errorMessage: string;
  userProfile: IUserProfile;

  showGeneralDetailForm = false;
  showProfessionalDetailForm = false;
  showWorkPlaceDetailForm = false;
  showQualificationDetailForm = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUserProfile().subscribe(userProfile => {
      this.userProfile = userProfile;
    },
      error => {
        this.errorMessage = error;
      });

  }

  showGeneralDetailFormDialog(): void {
    this.showGeneralDetailForm = true;
    this.userGeneralDetailFormComponent.initializeFormOnPopUp(this.userProfile.generalDetail);
  }
  showProfessionalDetailFormDialog(): void {
    this.showProfessionalDetailForm = true;
    this.userProfessionalDetailFormComponent.initializeFormOnPopUp(this.userProfile.professionalDetail);
  }
  showWorkPlaceDetailFormDialog(workPlaceDetail: IWorkPlaceDetail): void {
    this.showWorkPlaceDetailForm = true;
    this.userWorkPlaceDetailFormComponent.initializeFormOnPopUp(workPlaceDetail);
  }
  showQualificationDetailFormDialog(qualificationDetail: IQualificationDetail): void {
    this.showQualificationDetailForm = true;
    this.userQualificationDetailFormComponent.initializeFormOnPopUp(qualificationDetail);
  }

  userGeneralDetailFormComponentSave(): void {
    this.userGeneralDetailFormComponent.onSubmit();
  }
  userProfessionalDetailFormComponentSave(): void {
    this.userProfessionalDetailFormComponent.onSubmit();
  }
  userWorkPlaceDetailFormComponentSave(): void {
    this.userWorkPlaceDetailFormComponent.onSubmit();
  }
  userQualificationDetailFormComponentSave(): void {
    this.userQualificationDetailFormComponent.onSubmit();
  }

}
