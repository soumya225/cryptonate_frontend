import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService,CampaignService } from '../../_services';

@Component({
  selector: 'app-create-campaign3',
  templateUrl: './create-campaign3.component.html',
  styleUrls: ['./create-campaign3.component.css']
})

export class CreateCampaign3Component implements OnInit {
  campaignInfo;

  title = "";
  date = "";
  selectedTags =  [];
  description = "";
  goal = "";
  //pic: FormControl
  url="";

  constructor(private auth: AuthService,
    private campaignService: CampaignService,
    private router: Router) {
    this.campaignInfo = JSON.parse(<string>localStorage.getItem("campaigns"));
  }

  ngOnInit(): void {
   // this.pic = new FormControl(this.campaignInfo.image_url ? this.campaignInfo.image_url : "");
    if(this.campaignInfo) {
      this.title = this.campaignInfo.title;
      this.date = this.campaignInfo.date;
      this.selectedTags = this.campaignInfo.selectedTags;
      this.description = this.campaignInfo.description;
      this.goal = this.campaignInfo.goal;
    } else {
      this.router.navigate(['/Dashboard']);
    }
  }
  onSelect(e)
  {
    if(e.target.files){
      var reader:FileReader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
  onSubmit()
  {
    const res = {
      title: this.title,
      description: this.description,
      selectedTags: this.selectedTags,
      date: this.date,
      goal: this.goal,
      image_url: this.url
    };

    localStorage.setItem("campaigns",JSON.stringify(res));
    localStorage.setItem("image_url",this.url);
    this.router.navigate(["/Fundraise/Review"]);
  }
}


