
export function SimpleSchema_render(schema, key, value) {
    definition = schema.schema(key);
    if ('renderer' in definition) {
        return definition.renderer(value);
    }
    return value;
};