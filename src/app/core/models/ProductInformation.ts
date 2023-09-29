export class ProductInformation {
    constructor(
        public name: string = "",
        public description: string = "",
        public language: Language = Language.Vietnamese,
        public id: string = ""
    ) {}
}

export enum Language {
    Vietnamese, 
    English
}