export function SimpleSchema_getFieldDefinition(ss, name) {
    const def = ss.getDefinition(name);
    if (!def) return;

    return {
        ...def,
        ...(def.type && def.type[0]) || {},
    };
};

export function SimpleSchema_render(ss, name, value) {
    const fd = SimpleSchema_getFieldDefinition(ss, name);
    if(name.endsWith('frequency'))
        console.log(value);
    if (fd && 'renderer' in fd) {      
        return fd.renderer(value) || '';
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


export function renderBytes(value) {
    if (isNaN(value)) {
        return '';
    }
    var i = value == 0 ? 0 : Math.floor(Math.log(value) / Math.log(1024));
    return (value / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}


export function renderHeartz(value) {
    if (isNaN(value)) {
        return '';
    }
    var i = value == 0 ? 0 : Math.floor(Math.log(value) / Math.log(1000));
    return (value / Math.pow(1000, i)).toFixed(2) * 1 + ' ' + ['Hz', 'kHz', 'MHz', 'GHz', 'THz'][i];
}

export function clickOutside(node) {
    const handleClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node)
        )
      }
    }
  
      document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
      }
  }