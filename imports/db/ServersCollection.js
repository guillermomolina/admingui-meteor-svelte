import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

export const ServersCollection = new Mongo.Collection('servers');

export const ServersSchema = new SimpleSchema({
    name: String,
    domain: String,
    type: { 
        type: String, 
        allowedValues: ["server", "ldom", "kernel-zone", "zone"] 
    },
    class: String,
    architecture: String,
    container: String,
    category: String,
    operating_system: Object,
    'operating_system.name': String,
    'operating_system.version': String,
    'operating_system.revision': String,
    server: Object,
    'server.vendor': String,
    'server.serial_number': String,
    'server.oracle_csi': String,
    'server.location': Object,
    'server.location.rack': String,
    'server.location.cpd': String,
    'server.cpu': Object,
    'server.cpu.type': String,
    'server.cpu.frequency': SimpleSchema.Integer,
    'server.cpu.count': SimpleSchema.Integer,
    'server.cpu.cores': SimpleSchema.Integer,
    'server.cpu.threads': SimpleSchema.Integer,
    'server.memory': Object,
    'server.memory.type': String,
    'server.memory.count': SimpleSchema.Integer,
    'server.memory.size': SimpleSchema.Integer,
    'server.disk': Object,
    'server.disk.type': String,
    'server.disk.rpm': { type: SimpleSchema.Integer, label: 'RPMs' },
    'server.disk.size': SimpleSchema.Integer,
    'server.disk.count': SimpleSchema.Integer,
    vcpus: { type: SimpleSchema.Integer, label: 'Virtual CPUs' },
    memory: SimpleSchema.Integer
});

ServersCollection.attachSchema(ServersSchema);