import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getItem<T>(key: string): T {
    const value = localStorage.getItem(key)

    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as T
      } catch(err) {
        throw err
      }
    } else {
      return null as T
    }
  }
}
