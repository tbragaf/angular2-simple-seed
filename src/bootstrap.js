import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { Application } from './app/app.js';

bootstrap(Application, [ROUTER_PROVIDERS]);