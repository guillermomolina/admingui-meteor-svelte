import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const HostsCollection = new Mongo.Collection('hosts');

export const OperatingSystemSchema = new SimpleSchema({
    'name': String,
    'version': String,
    'revision': String,
}, { requiredByDefault: false });

export const ServerLocationSchema = new SimpleSchema({
    'rack': String,
    'cpd': { type: String, label: 'CPD' }
}, { requiredByDefault: false });

export const ServerCPUSchema = new SimpleSchema({
    'type': String,
    'frequency': Number,
    'count': SimpleSchema.Integer,
    'cores': SimpleSchema.Integer,
    'threads': SimpleSchema.Integer,
}, { requiredByDefault: false });

export const ServerMemorySchema = new SimpleSchema({
    'type': String,
    'count': SimpleSchema.Integer,
    'size': Number,
}, { requiredByDefault: false });

export const ServerDiskSchema = new SimpleSchema({
    'type': String,
    'count': SimpleSchema.Integer,
    'rpms': { type: SimpleSchema.Integer, label: 'RPMs' },
    'size': Number,
}, { requiredByDefault: false });

export const ServerSchema = new SimpleSchema({
    'vendor': String,
    'serial_number': String,
    'oracle_csi': { type: String, label: 'Oracle CSI' },
    'location': ServerLocationSchema,
    'cpu': { type: ServerCPUSchema, label: 'CPU' },
    'memory': ServerMemorySchema,
    'disk': ServerDiskSchema,
}, { requiredByDefault: false });

export const HostSchema = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        optional: false
    },
    domain: String,
    type: {
        type: String,
        allowedValues: ['server', 'logical-domain', 'kernel-zone', 'solaris10-zone', 'zone'],
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
        optional: true,
        custom: function () {
            let isTypeServer = this.field('type').value === 'server';

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
}, { requiredByDefault: false });

HostsCollection.attachSchema(HostSchema);

