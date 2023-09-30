import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageSub: BehaviorSubject<string> = new BehaviorSubject('');
  public localStorage = this.localStorageSub.asObservable();

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.localStorageSub.next('local-storage-chage');
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
    this.localStorageSub.next('local-storage-chage');
  }
  clearStorage() {
    localStorage.clear();
    this.localStorageSub.next('local-storage-chage');
  }
}
