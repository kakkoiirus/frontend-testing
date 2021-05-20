import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  user: { name: string; favorite_content_id: [] } = { name: '', favorite_content_id: [] };
  submitting = false;
  @Input() data: any;

  constructor(
    private dataService: DataService
  ) {}

  onSubmit(): void {
    this.submitting = true;

    this.dataService.addUser(this.user, this.data.content, this.data.tvChannels).subscribe((data) => {
      this.data.users.push(data);
      this.submitting = false;
    });
  }

  ngOnInit(): void {
  }

}
