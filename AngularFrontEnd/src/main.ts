import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
  <head>
    <title>My app</title>
    <meta charset="UTF-8" />
    <base href="/" />
  </head>
  <body>
    <label>Enter your phone number</label>
    <br />
    <input type="text" [(ngModel)]="phoneNumber" />
    <br /><br />
    <label>Who do you want to talk to?</label>
    <br />
    <input type="text" [(ngModel)]="persona" />
    <br /><br />
    <button type="button" (click)="makeCall()">Let's talk!</button>
  </body>`,
})
export class App {
  public phoneNumber = '';
  public persona = '';
  private username = '<redacted>';
  private password = '<redacted>';

  public makeCall() {
    const personObj = {
      persona: this.persona,
    };

    fetch(
      'https://studio.twilio.com/v2/Flows/FW672d048735a7e7a550bf8e1b258b4aec/Executions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
        },
        body: new URLSearchParams({
          To: `+1${this.phoneNumber}`,
          From: '<VerifiedCallerID>',
          Parameters: JSON.stringify(personObj),
        }),
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

bootstrapApplication(App);
