import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
jsonData:any[];
applicationForm: FormGroup;
submissionMessage: string = '';

@ViewChild('exampleModal') modal: ElementRef;

  constructor(private service:ServiceService,private fb: FormBuilder,private el: ElementRef, private renderer: Renderer2) {  this.applicationForm = fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    qualification: ['', Validators.required],
    resume: [null, Validators.required]
  });}
  ngAfterViewInit() {
    if (this.modal) {
      const modal = new bootstrap.Modal(this.modal.nativeElement);
      modal.hide();
    }
  }

  ngOnInit() {
    this.service.getJsondata().subscribe((data:any)=>{
      this.jsonData = data.jobs;
      console.log("data is going to load")
      console.log(this.jsonData)
    })
  }
  onFileChange(event) {
   

    if (event.target.files && event.target.files.length > 0) {
      const file = (event.target.files[0] as File);
      this.applicationForm.get('resume').setValue(file);
      console.log(this.applicationForm.get('resume').value); // Log the value, not the result of setValue
    }
  }

//   closeModal() {
   
//     const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
//     modal.hide();
// console.log(modal)
// }
  // submitApplication() {
   
  //   if (this.applicationForm.valid) {
      
    
  //     const applicationData = this.applicationForm.value;

  //     this.service.submitApplication(applicationData)
  //       .subscribe(response => {
  //         console.log('Application submitted successfully', response);

  //       });
  //       this.applicationForm.reset();

  //   }
   

  // }


  submitApplication() {
    if (this.applicationForm.valid) {
    

    const formData = new FormData();
    formData.append('name', this.applicationForm.get('name').value);
    formData.append('email', this.applicationForm.get('email').value);
    formData.append('contact', this.applicationForm.get('contact').value);
    formData.append('qualification', this.applicationForm.get('qualification').value);
    formData.append('resume', this.applicationForm.get('resume').value);

    this.service.submitApplication(formData).subscribe(
      (response: any) => {
        this.submissionMessage = response.message;
        console.log('Server response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
}