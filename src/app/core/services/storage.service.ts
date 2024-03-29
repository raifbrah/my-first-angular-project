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
    const value = localStorage.getItem(key)

    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch(err) {
        throw err
      }
    } else {
      return null
    }
  }
}
