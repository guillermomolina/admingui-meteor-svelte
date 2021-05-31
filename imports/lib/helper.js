
export function SimpleSchema_render(ss, key, value) {
    definition = ss.schema(key);
    if ('renderer' in definition) {
        return definition.renderer(value);
    }
    return value;
};

export function SimpleSchema_getFieldDefinition(ss, name) {
    const def = ss.getDefinition(name);
    if (!def) return;

    return {
        ...def,
        ...(def.type && def.type[0]) || {},
    };
};
