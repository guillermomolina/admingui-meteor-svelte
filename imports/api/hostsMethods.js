import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HostSchema, HostsCollection } from '../db/HostsCollection';

Meteor.methods({
  'hosts.remove'(hostId) {
    check(hostId, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    // const host = HostsCollection.findOne({ _id: hostId, userId: this.userId });

    // if (!host) {
    //   throw new Meteor.Error('Access denied.');
    // }

    HostsCollection.remove(hostId);
  },

  'hosts.insert'(host) {
    console.log(host);
    check(host, HostSchema);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    HostsCollection.insert(host);
  },

  'hosts.update'(hostId, host) {
    console.log(hostId, host);
    check(hostId, String);


      HostsCollection.simpleSchema()
    .namedContext()
    .validate(host, { modifier: false });

    //check(host, HostSchema);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    // const host = HostsCollection.findOne({ _id: hostId, userId: this.userId });

    // if (!host) {
    //   throw new Meteor.Error('Access denied.');
    // }

    HostsCollection.update(hostId, {
      $set: {
        host
      }
    });
  },
});
