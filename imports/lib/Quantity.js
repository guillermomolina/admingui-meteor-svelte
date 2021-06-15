export class Unit {
    name;
    symbol;
    quantity;
    constructor(name, symbol, quantity) {
        this.name = name;
        this.symbol = symbol;
        this.quantity = quantity;
    }
}

export class UnitPrefix {
    name;
    symbol;
    power;
    base;
    constructor(name, symbol, power, base = 1000) {
        this.name = name;
        this.symbol = symbol;
        this.power = power;
        this.base = base;
    }
}

export const pico = new UnitPrefix('pico', 'p', -4);
export const nano = new UnitPrefix('nano', 'n', -3);
export const micro = new UnitPrefix('micro', 'μ', -2);
export const mili = new UnitPrefix('mili', 'm', -1);

export const kilo = new UnitPrefix('kilo', 'k', 1);
export const mega = new UnitPrefix('mega', 'M', 2);
export const giga = new UnitPrefix('giga', 'G', 3);
export const tera = new UnitPrefix('tera', 'T', 4);
export const peta = new UnitPrefix('peta', 'P', 5);
export const exa = new UnitPrefix('exa', 'E', 6);
export const zetta = new UnitPrefix('zetta', 'Z', 7);
export const yotta = new UnitPrefix('yotta', 'Y', 8);

export const DecimalUnitPrefixes = [
    pico,
    nano,
    micro,
    mili,
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

export class BinaryUnitPrefix extends UnitPrefix {
    constructor(name, symbol, power) {
        super(name, symbol, power, 1024);
    }
}

export const kibi = new BinaryUnitPrefix('kibi', 'Ki', 1);
export const mebi = new BinaryUnitPrefix('mebi', 'Mi', 2);
export const gibi = new BinaryUnitPrefix('gibi', 'Gi', 3);
export const tebi = new BinaryUnitPrefix('tebi', 'Ti', 4);
export const pebi = new BinaryUnitPrefix('pebi', 'Pi', 5);
export const exbi = new BinaryUnitPrefix('exbi', 'Ei', 6);
export const xebi = new BinaryUnitPrefix('xebi', 'Zi', 7);
export const yobi = new BinaryUnitPrefix('yobi', 'Yi', 8);

export const BinaryUnitPrefixes = [
    new UnitPrefix('', '', 0, 1024),
    kibi,
    mebi,
    gibi,
    tebi,
    pebi,
    exbi,
    xebi,
    yobi
];

export class Magnitude {
    value;
    constructor(value) {
        this.value = value;
    }
}

export class Quantity {
    magnitude;
    unit;
    constructor(magnitudeOrValue, unit) {
        this.unit = unit;
        this.magnitude = magnitudeOrValue instanceof Magnitude? magnitudeOrValue: new Magnitude(magnitudeOrValue);
    }
}

//export const bit = new Unit('bit', 'b', 'binary digit');
export const byte = new Unit('byte', 'B', 'binary octet');

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