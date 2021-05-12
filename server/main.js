import '../imports/lib/startup';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HostsCollection } from '/imports/db/HostsCollection';
import '/imports/api/hostsMethods';
import '/imports/api/hostsPublications';
import { null_to_empty } from 'svelte/internal';

const insertHost = (host, user) => {
  host.userId = user._id
  host.createdAt = new Date(),
  HostsCollection.insert(host);
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

  if (HostsCollection.find().count() === 0) {
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
        vcpus: 256,
        memory: 512.0 * Math.pow(1024, 3),
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
            frequency: 5.067 * Math.pow(1024, 3),
            count: 1,
            cores: 32,
            threads: 8
          },
          memory: {
            type: 'DDR4-2400',
            count: 16,
            size: 32.0 * Math.pow(1024, 3)
          },
          disk: {
            type: 'SAS3',
            rpm: 10000,
            size: 1.0 * Math.pow(1024, 4),
            count: 2
          }
        }
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
        vcpus: 256,
        memory: 256.0 * Math.pow(1024, 3),
        host: {
          vendor: 'Oracle',
          serial_number: '1825NN835H',
          oracle_csi: '21856476',
          location: {
            rack: 'B3',
            cpd: 'NSS'
          },
          cpu: {
            type: 'SPARC M8',
            frequency: 5.067 * Math.pow(1024, 3),
            count: 1,
            cores: 32,
            threads: 8
          },
          memory: {
            type: 'DDR4-2400',
            count: 8,
            size: 32.0 * Math.pow(1024, 3)
          },
          disk: {
            type: 'SAS3',
            rpm: 10000,
            size: 600.0 * Math.pow(1024, 3),
            count: 2
          }
        }
      },
      {
        name: 'des-antic-a1',
        domain: 'base.des',
        type: 'ldom',
        class: 'sun4v',
        architecture: 'sparc',
        container: 'desa2-1',
        category: 'desenvolupament',
        operating_system: {
          name: 'Solaris',
          version: '11.4',
          revision: '11.4.31.88.5'
        },
        vcpus: 64,
        memory: 64.0 * Math.pow(1024, 3),
      },
      {
        name: 'des-empleat-app0-1',
        domain: 'base.des',
        type: 'kernel-zone',
        class: 'sun4v',
        architecture: 'sparc',
        container: 'desa2-1',
        category: 'desenvolupament',
        operating_system: {
          name: 'Solaris',
          version: '11.4',
          revision: '11.4.31.88.5'
        },
        vcpus: 8,
        memory: 8.0 * Math.pow(1024, 3),
      },
      {
        name: 'des-app1',
        domain: 'base.des',
        type: 'zone',
        class: 'sun4v',
        architecture: 'sparc',
        container: 'des-antic-a1',
        category: 'desenvolupament',
        operating_system: {
          name: 'Solaris',
          version: '10',
          revision: '10'
        },
        vcpus: 8,
        memory: 8.0 * Math.pow(1024, 3),
      }
    ].forEach(host => insertHost(host, user));
  }

});
