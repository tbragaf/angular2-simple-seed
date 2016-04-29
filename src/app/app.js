import { Component, ElementRef } from 'angular2/core';

@Component({
  selector: 'application',
  templateUrl: './app.html',
  moduleId: __moduleName
})
export class Application {
  constructor(elementRef : ElementRef) {
    this.elementRef = elementRef;
  }
}