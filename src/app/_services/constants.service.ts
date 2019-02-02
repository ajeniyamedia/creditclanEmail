import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  public obj = {
    // api_base : 'http://app.creditclan.com/creditclan_demo/p2p_admin/',
    api_base: 'https://dataupload.creditclan.com/api/v2/',
    api_creditclan: ' https://dataupload.creditclan.com/',
    img_base: 'http://res.cloudinary.com/africacodes-concepts-limited/image/upload/v1507989748/',
    attachments: ' https://dataupload.creditclan.com/pub/attachments/'
  };

  constructor() { }

  // Reads a value from the defined constants
  read(key: string) {
    if (this.obj.hasOwnProperty(key)) {
      return this.obj[key];
    }
  }

}
