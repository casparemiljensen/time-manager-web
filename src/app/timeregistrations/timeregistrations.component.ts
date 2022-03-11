import { Component, OnInit } from '@angular/core';
import { Timeregistration } from './shared/timeregistration.model';
import { Employee } from '../employees/shared/employee.model';
import { TimeregistrationService } from './shared/timeregistration.service';
import { EmployeeService } from '../employees/shared/employee.service';

@Component({
  selector: 'app-timeregistrations',
  templateUrl: './timeregistrations.component.html',
  styleUrls: ['./timeregistrations.component.scss']
})
export class TimeregistrationsComponent implements OnInit {
  timeregistrations: Timeregistration[] = [];
  employees: Employee[] = [];

  selectedEmp!: Employee;

  constructor(private timeregistrationService:TimeregistrationService, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getTimeregistrations();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  getTimeregistrations(): void {
    this.timeregistrationService.getTimeregistrations()
        .subscribe(timeregistrations => this.timeregistrations = timeregistrations);
  }

  add(startTime: string, endTime: string, employeeId: number): void {
    if (!startTime && endTime) { return; }
    this.timeregistrationService.addTimeregistration({ startTime, endTime, employeeId } as unknown as Timeregistration)
      .subscribe(timeregistration => {
        this.timeregistrations.push(timeregistration);
      });
  }

  delete(timeregistration:Timeregistration):void {
    this.timeregistrations = this.timeregistrations.filter(tr => tr !== timeregistration);
    this.timeregistrationService.deleteTimeregistration(timeregistration.id).subscribe();
  }


  get selectedEmpMod() {
    return this.selectedEmp;
  }

  set selectedEmpMod(value) {
    this.selectedEmp = value;
  }
}

