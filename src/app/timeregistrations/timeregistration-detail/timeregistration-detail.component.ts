import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Timeregistration } from '../shared/timeregistration.model';
import { TimeregistrationService } from '../shared/timeregistration.service';
import { EmployeeService } from 'src/app/employees/shared/employee.service';

@Component({
  selector: 'app-timeregistration-detail',
  templateUrl: './timeregistration-detail.component.html',
  styleUrls: ['./timeregistration-detail.component.scss']
})
export class TimeregistrationDetailComponent implements OnInit {
  @Input() timeregistration?: Timeregistration;

  constructor(
    private route: ActivatedRoute,
    private timeregistrationService: TimeregistrationService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTimeregistration();
  }

  getTimeregistration(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.timeregistrationService.getTimeregistration(id).subscribe(timeregistration => this.timeregistration = timeregistration);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.timeregistration) {
      this.timeregistrationService.updateTimeregistration(this.timeregistration)
        .subscribe(() => this.goBack());
    }
  }

}
