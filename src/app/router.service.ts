import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private static router: Router;

  constructor(router: Router) {
    RouterService.router = router;
  }

  static getRouter(): Router {
    return RouterService.router;
  }
}