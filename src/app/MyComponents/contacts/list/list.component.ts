import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public contactID!: string;
  public contact = new Contact('', '', '', '', '');
  public message!: string;
  public isSuccess: boolean = false;
  public isError: boolean = false;
  public contactData: any[] = []
  constructor(private _cs: ContactService, private _acroute: ActivatedRoute) { }



  ngOnInit(): void {
    this._acroute.params.subscribe(param => {
      this.contactID = param.id!;
    })

    this._cs.listAllContactsByUser().subscribe(response => {
      console.log(response.contacts)
      this.contactData = response.contacts;
    }, err => {
      console.log(err)
    })


  }

  onDelete(id:any) {
    this._cs.deleteContactByID(id).subscribe(response => {
      console.log(response)
      this.message = response.message
      this.isError = false
      this.isSuccess = true
    }, err => {
      console.log(err)
      this.message = err.error.message
      this.isError = true
      this.isSuccess = false
    })

    this._cs.listAllContactsByUser().subscribe(response => {
      console.log(response.contacts)
      this.contactData = response.contacts;
    }, err => {
      console.log(err)
    })
  }

}
