import { Component } from '@angular/core';

@Component({
  selector: 'app-error-unauthorized',
  template: `
    <error-code
      code="403"
      [title]="'Permission denied!'"
      [message]="'You do not have permission to access the requested data.'"
    ></error-code>
  `,
})
export class UnauthorizedComponent {}
