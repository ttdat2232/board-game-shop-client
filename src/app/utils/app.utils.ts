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
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()),
      };
    } else {
      return value;
    }
  }

  static mapReviver(key: any, value: any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}