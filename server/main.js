import '/imports/lib/startup';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { null_to_empty } from 'svelte/internal';
import { HostsCollection } from '/imports/db/HostsCollection';
import '/imports/api/hostsMethods';
import '/imports/api/hostsPublications';
import { importHosts } from '/imports/lib/hostsImport';

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
    importHosts('/home/guille/Red/Temporal/hosts.csv');
  }

});
