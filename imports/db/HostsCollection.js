import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { renderMemory, renderFrequency } from '../lib/helper';

export const HostsCollection = new Mongo.Collection('hosts');

export const OperatingSystemSchema = new SimpleSchema({
    'name': {
        type: String,
        defaultValue: ''
    },
    'version': {
        type: String,
        defaultValue: ''
    },
    'revision': {
        type: String,
        defaultValue: ''
    },
});

export const ServerLocationSchema = new SimpleSchema({
    'rack': {
        type: String,
        defaultValue: ''
    },
    'cpd': { 
        type: String,
        defaultValue: '',
        label: 'CPD' 
    }
});

export const ServerCPUSchema = new SimpleSchema({
    'type': {
        type: String,
        defaultValue: ''
    },
    'frequency': {
        type: Number,
        defaultValue: 0,
        renderer: renderFrequency
    },
    'count': {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
    'cores': {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
    'threads': {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
});

export const ServerMemorySchema = new SimpleSchema({
    'type': {
        type: String,
        defaultValue: ''
    },
    'count': {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
    'size': {
        type: Number,
        defaultValue: 0,
        renderer: renderMemory
    },
});

export const ServerDiskSchema = new SimpleSchema({
    'type': {
        type: String,
        defaultValue: ''
    },
    'count': {
        type: SimpleSchema.Integer,
        defaultValue: 0
    },
    'rpms': { 
        type: SimpleSchema.Integer,
        defaultValue: 0, 
        label: 'RPMs' 
    },
    'size': {
        type: Number,
        defaultValue: 0,
        renderer: renderMemory
    },
});

export const ServerSchema = new SimpleSchema({
    'vendor': {
        type: String,
        defaultValue: ''
    },
    'serial_number': {
        type: String,
        defaultValue: ''
    },
    'oracle_csi': { 
        type: String,
        defaultValue: '', 
        label: 'Oracle CSI' 
    },
    'location': {
        type: ServerLocationSchema,
        defaultValue: {}
    },
    'cpu': { 
        type: ServerCPUSchema, 
        label: 'CPU',
        defaultValue: {}
    },
    'memory':  {
        type: ServerMemorySchema,
        defaultValue: {}
    },
    'disk':  {
        type: ServerDiskSchema,
        defaultValue: {}
    },
});

export const HostSchema = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        defaultValue: ''
    },
    domain: {
        type: String,
        defaultValue: ''
    },
    type: {
        type: String,
        defaultValue: '',
        allowedValues: ['', 'server', 'logical-domain', 'kernel-zone', 'solaris10-zone', 'zone'],
        renderer: (value) => {
            return {
                server: 'Server',
                'logical-domain': 'Logical domain',
                'kernel-zone': 'Kernel Zone',
                'solaris10-zone': 'Solaris 10 Zone',
                zone: 'Zone'
            }[value];
        }
    },
    class: {
        type: String,
        defaultValue: ''
    },
    architecture: {
        type: String,
        defaultValue: ''
    },
    container: {
        type: String,
        defaultValue: ''
    },
    category: {
        type: String,
        defaultValue: '',
        allowedValues: ['', 'desenvolupament', 'preproduccio', 'produccio', 'integracio', 'gestio'],
        renderer: (value) => {
            return {
                desenvolupament: 'Desenvolupament',
                preproduccio: 'Preproducció',
                produccio: 'Producció',
                integracio: 'Integració',
                gestio: 'Gestió'
            }[value];
        }
    },
    vcpus: { 
        type: SimpleSchema.Integer,
        defaultValue: 0, 
        label: 'Virtual CPUs' },
    memory: {
        type: Number,
        defaultValue: 0,
        renderer: renderMemory
    },
    operating_system: {
        type: OperatingSystemSchema,
        defaultValue: {}
    },
    server: {
        type: ServerSchema,
        optional: true,
        custom: function () {
            const isTypeServer = this.field('type').value === 'server';

            if (isTypeServer) {
                // inserts
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
                }

                // updates
                else if (this.isSet) {
                    if (this.operator === "$set" && this.value === null || this.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
                    if (this.operator === "$unset") return SimpleSchema.ErrorTypes.REQUIRED;
                    if (this.operator === "$rename") return SimpleSchema.ErrorTypes.REQUIRED;
                }
            } else {
                // updates
                /* if (this.isSet || this.value !== null) {
                     return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED;
                 }*/
            }
        }
    }
});

HostsCollection.attachSchema(HostSchema);

