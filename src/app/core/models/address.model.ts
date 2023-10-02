export class BaseAddress {
    constructor(
        public name: string,
        public code: number,
        public division_type: string,
        public codename: string,
    ) { }
}
export class Ward extends BaseAddress {
    constructor(
        name: string,
        code: number,
        division_type: string,
        codename: string,
        public district_code: number
    ) {
        super(name, code, division_type, codename);
    }
}
export class District extends BaseAddress {
    constructor(
        name: string,
        code: number,
        division_type: string,
        codename: string,
        public province_code: number,
        public wards: Ward[] = []
    ) {
        super(name, code, division_type, codename);
    }
}
export class Division extends BaseAddress {
    constructor(
        name: string,
        code: number,
        division_type: string,
        codename: string,
        public phone_code: number,
        public districts: District[] = []
    ) {
        super(name, code, division_type, codename);
    }
}
