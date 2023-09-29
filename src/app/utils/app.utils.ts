export class AppUtils {
    static generateQueriesUrl(baseUrl: string, searchObject?: object): string {
        if(!searchObject)
          return baseUrl;
        let queriesUrl = baseUrl + "?";
        for(const [key, value] of Object.entries(searchObject)) {
          if(value) {
            if(Array.isArray(value)) {
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
}