import '../imports/lib/startup';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServersCollection } from '/imports/db/ServersCollection';
import '/imports/api/serversMethods';
import '/imports/api/serversPublications';
import { null_to_empty } from 'svelte/internal';

const insertServer = (server, user) => {
  server.userId = user._id
  server.createdAt = new Date(),
  ServersCollection.insert(server);
}

const SEED_USERNAME = 'user';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ServersCollection.find().count() === 0) {
    [
      {
        name: 'desa2-1',
        domain: 'base.des',
        type: 'server',
        class: 'sun4v',
        architecture: 'sparc',
        container: null,
        category: 'desenvolupament',
        operating_system: {
          name: 'Solaris',
          version: '11.4',
          revision: '11.4.31.88.5'
        },
        server: {
          vendor: 'Oracle',
          serial_number: '2113NMC001',
          oracle_csi: '23483523',
          location: {
            rack: 'B3',
            cpd: 'NSS'
          },
          cpu: {
            type: 'SPARC M8',
            frequency: 5067,
            count: 1,
            cores: 32,
            threads: 8
          },
          memory: {
            type: 'DDR4-2400',
            count: 16,
            size: 32768
          },
          disk: {
            type: 'SAS3',
            rpm: 10000,
            size: 1090000,
            count: 2
          }
        },
        vcpus: 256,
        memory: 512*1024*1024
      },
      {
        name: 'testp1-1',
        domain: 'gestio.sys',
        type: 'server',
        class: 'sun4v',
        architecture: 'sparc',
        container: null,
        category: 'gestio',
        operating_system: {
          name: 'Solaris',
          version: '11.4',
          revision: '11.4.31.88.5'
        },
        server: {
          vendor: 'Oracle',
          serial_number: '1825NN835H',
          oracle_csi: '21856476',
          location: {
            rack: 'B3',
            cpd: 'NSS'
          },
          cpu: {
            type: 'SPARC M8',
            frequency: 5067,
            count: 1,
            cores: 32,
            threads: 8
          },
          memory: {
            type: 'DDR4-2400',
            count: 8,
            size: 32768
          },
          disk: {
            type: 'SAS3',
            rpm: 10000,
            size: 600000,
            count: 2
          }
        },
        vcpus: 256,
        memory: 256*1024*1024
      },
    ].forEach(server => insertServer(server, user));
  }

});
