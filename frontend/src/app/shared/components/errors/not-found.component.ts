import { Component } from '@angular/core';

@Component({
  selector: 'app-error-not-found',
  template: `
    <error-code
      code="404"
      [title]="'Page not found!'"
      [message]="'This is not the web page you are looking for.'"
    ></error-code>
  `,
})
export class NotFoundComponent {}
