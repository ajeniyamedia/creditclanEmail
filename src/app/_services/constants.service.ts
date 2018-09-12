import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public obj = {
    // api_base : 'http://app.creditclan.com/creditclan_demo/p2p_admin/',
    api_base: 'http://137.117.105.90/dataupload_test/api/v2/',
    api_creditclan: ' http://137.117.105.90/dataupload_test/',
    img_base: 'http://res.cloudinary.com/africacodes-concepts-limited/image/upload/v1507989748/',
    attachments: ' http://137.117.105.90/dataupload_test/pub/attachments/'
  };

  constructor() { }

  // Reads a value from the defined constants
  read(key: string) {
    if (this.obj.hasOwnProperty(key)) {
      return this.obj[key];
    }
  }

}
