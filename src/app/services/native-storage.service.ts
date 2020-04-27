import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativeStorageService {

  constructor(private nativeStorage: NativeStorage) { }


  async setItem(item: string, value: any) {
    try {
      await this.nativeStorage.setItem(item, value);
      return true;
    } catch(err) {
      return false;
    }
  }

  async getItem(item: string) {
    try {
      return this.nativeStorage.getItem(item);
    } catch(err) {
      return false;
    }
  }
  
}
