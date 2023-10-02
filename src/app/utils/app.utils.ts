import { trigger, state, style, animate, transition, } from '@angular/animations'

export class AppUtils {
  static generateQueriesUrl(baseUrl: string, searchObject?: object): string {
    if (!searchObject)
      return baseUrl;
    let queriesUrl = baseUrl + "?";
    for (const [key, value] of Object.entries(searchObject)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(element => {
            queriesUrl += (`${key}=${element}&`);
          });
        }
        else {
          queriesUrl += (`${key}=${value}&`);
        }
      }
    }
    return queriesUrl;
  }
  static mapReplacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()),
      };
    } else {
      return value;
    }
  }

  static mapReviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

  static getCart(): Map<string, number> {
    let cartString = localStorage.getItem("cart");
    let mapProductIdQuantity: Map<string, number> = new Map();
    if (cartString)
      mapProductIdQuantity = JSON.parse(cartString, AppUtils.mapReviver);
    return mapProductIdQuantity;
  }

  static simpleAnimation = trigger('simpleAnimation', [
    transition(':enter', [
      style({ transform: 'translateY(50%)', opacity: 0 }),
      animate('500ms ease', style({ transform: 'translateY(0%)', opacity: 1 }))
    ]),
  ]);
}