export function SimpleSchema_getFieldDefinition(ss, name) {
    const def = ss.getDefinition(name);
    if (!def) return;

    return {
        ...def,
        ...(def.type && def.type[0]) || {},
    };
};

export function SimpleSchema_render(ss, name, value) {
    definition = SimpleSchema_getFieldDefinition(ss, name);
    if (definition && 'renderer' in definition) {
        return definition.renderer(value) || '';
    }

    return value;
};

export function SimpleSchema_getFieldType(ss, name) {
    const fd = SimpleSchema_getFieldDefinition(ss, name);
    return fd ? fd.type : fd;
}


export function getSchemaDefinitionType(def) {
    return (def.type && def.type.definitions && def.type.definitions[0].type);
};


export function renderMemory(value) {
    if (isNaN(value)) {
        return '';
    }
    var i = value == 0 ? 0 : Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}


export function renderFrequency(value) {
    if (isNaN(value)) {
        return '';
    }
    var i = value == 0 ? 0 : Math.floor(Math.log(value) / Math.log(1000));
    return (value / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['Hz', 'kHz', 'MHz', 'GHz', 'THz'][i];
}