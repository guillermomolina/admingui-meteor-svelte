import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const HostsCollection = new Mongo.Collection('hosts');

export const OperatingSystemSchema = new SimpleSchema({
    'name': String,
    'version': String,
    'revision': String,
}, { requiredByDefault: false });

export const ServerSchema = new SimpleSchema({
    'vendor': String,
    'serial_number': String,
    'oracle_csi': String,
    'location': Object,
    'location.rack': String,
    'location.cpd': String,
    'cpu': Object,
    'cpu.type': String,
    'cpu.frequency': Number,
    'cpu.count': SimpleSchema.Integer,
    'cpu.cores': SimpleSchema.Integer,
    'cpu.threads': SimpleSchema.Integer,
    'memory': Object,
    'memory.type': String,
    'memory.count': SimpleSchema.Integer,
    'memory.size': Number,
    'disk': Object,
    'disk.type': String,
    'disk.rpm': { type: SimpleSchema.Integer, label: 'RPMs' },
    'disk.size': Number,
    'disk.count': SimpleSchema.Integer,
}, { requiredByDefault: false });

export const HostSchema = new SimpleSchema({
    name: String,
    domain: String,
    type: {
        type: String,
        allowedValues: ['server', 'ldom', 'kernel-zone', 'zone'],
        renderer: (value) => {
            return {
                server: 'Server',
                ldom: 'Logical domain',
                'kernel-zone': 'Kernel Zone',
                zone: 'Zone'
            }[value];
        }
    },
    class: String,
    architecture: String,
    container: {
        type: String,
        optional: true
    },
    category: {
        type: String,
        allowedValues: ['desenvolupament', 'preproduccio', 'produccio', 'integracio', 'gestio'],
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
    vcpus: { type: SimpleSchema.Integer, label: 'Virtual CPUs' },
    memory: {
        type: Number,
        renderer: (value) => {
            var i = Math.floor(Math.log(value) / Math.log(1024));
            return (value / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        }
    },
    operating_system: OperatingSystemSchema,
    server: {
        type: ServerSchema,
        optional: true
    }
}, { requiredByDefault: false });

HostsCollection.attachSchema(HostSchema);