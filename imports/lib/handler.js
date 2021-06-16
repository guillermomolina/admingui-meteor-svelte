import { isNullish } from './helper';

export class Handler {
    value;

    constructor(value) {
        this.value = value;
    }

    render() {
        return isNullish(this.value)? '': this.value.toString();
    }
}

export class ByteHandler extends Handler {

    constructor(value) {
        super(value)
    }
}