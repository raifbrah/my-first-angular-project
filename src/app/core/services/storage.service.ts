import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string): any {
    const users = localStorage.getItem(key)

    if (typeof users === 'string') {
      return JSON.parse(users)
    } else {
      return null
    }
  }
}
