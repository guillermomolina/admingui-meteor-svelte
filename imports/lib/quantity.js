
export class UnitPrefix {
    name;
    symbol;
    power;

    constructor(name, symbol, power) {
        this.name = name;
        this.symbol = symbol;
        this.power = power;
    }
}


export const mili = new UnitPrefix('mili', 'm', -1);
export const micro = new UnitPrefix('micro', 'μ', -2);
export const nano = new UnitPrefix('nano', 'n', -3);
export const pico = new UnitPrefix('pico', 'p', -4);

export const kilo = new UnitPrefix('kilo', 'k', 1);
export const mega = new UnitPrefix('mega', 'M', 2);
export const giga = new UnitPrefix('giga', 'G', 3);
export const tera = new UnitPrefix('tera', 'T', 4);
export const peta = new UnitPrefix('peta', 'P', 5);
export const exa = new UnitPrefix('exa', 'E', 6);
export const zetta = new UnitPrefix('zetta', 'Z', 7);
export const yotta = new UnitPrefix('yotta', 'Y', 8);

export const decimalUnitPrefixes = [
    new UnitPrefix('', '', 0),
    kilo,
    mega,
    giga,
    tera,
    peta,
    exa,
    zetta,
    yotta
];
decimalUnitPrefixes[-1] = mili;
decimalUnitPrefixes[-2] = micro;
decimalUnitPrefixes[-3] = nano;
decimalUnitPrefixes[-4] = pico;

export const kibi = new UnitPrefix('kibi', 'Ki', 1);
export const mebi = new UnitPrefix('mebi', 'Mi', 2);
export const gibi = new UnitPrefix('gibi', 'Gi', 3);
export const tebi = new UnitPrefix('tebi', 'Ti', 4);
export const pebi = new UnitPrefix('pebi', 'Pi', 5);
export const exbi = new UnitPrefix('exbi', 'Ei', 6);
export const xebi = new UnitPrefix('xebi', 'Zi', 7);
export const yobi = new UnitPrefix('yobi', 'Yi', 8);

export const binaryUnitPrefixes = [
    new UnitPrefix('', '', 0),
    kibi,
    mebi,
    gibi,
    tebi,
    pebi,
    exbi,
    xebi,
    yobi
];


export class Unit {
    name;
    symbol;
    quantity;
    base;
    prefixes;
    isBynary;

    constructor(name, symbol, quantity, isBynary=false) {
        this.name = name;
        this.symbol = symbol;
        this.quantity = quantity;
        this.isBynary = isBynary;
        this.base = isBynary? 1024 : 1000;
        this.prefixes = isBynary? binaryUnitPrefixes: decimalUnitPrefixes;
    }

    getPrefixes
}

export class DecimalUnit extends Unit {
    constructor(name, symbol, quantity) {
        super(name, symbol, quantity, false);
    }
}

export class BinaryUnit extends Unit {
    constructor(name, symbol, quantity) {
        super(name, symbol, quantity, true);
    }
}

export class Quantity {
    value;
    unit;

    constructor(value, unit) {
        this.unit = unit;
        this.value = value;
    }

    getMagnitude() {
        const power = this.getPower();
        const base = this.unit.base;
        return value / Math.pow(base, power);
    }

    getPrefix() {
        const power = this.getPower();
        const prefixes = this.unit.prefixes;

        return prefixes[power];
    }

    getScaledUnit() {
        const symbol = this.unit.symbol;
        return this.getPrefix() + symbol;
    }

    getPower() {
        if (this.value === 0) {
            return 0;
        }

        const base = this.unit.base;
        return Math.floor(Math.log(this.value) / Math.log(base));
    }

    toString() {
        const values = [this.getMagnitude().toFixed(2), this.getScaledUnit()];

        return values.join(' ');
    }
}

//export const bit = new BinaryUnit('bit', 'b', 'binary digit');
export const byte = new BinaryUnit('byte', 'B', 'binary octet');

export class MemoryBinaryQuantity extends Quantity {
    constructor(magnitudeOrValue, prefix) {
        super(magnitudeOrValue, byte);
        console.log(magnitudeOrValue);
    }
}

Quantity.types = {
    MemoryBinaryQuantity: MemoryBinaryQuantity
}

Quantity.getType = function (typeAsString) {
    return this.types[typeAsString];
}