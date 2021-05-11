import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'hosts.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    HostsCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'hosts.remove'(hostId) {
    check(hostId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const host = HostsCollection.findOne({ _id: hostId, userId: this.userId });

    if (!host) {
      throw new Meteor.Error('Access denied.');
    }

    HostsCollection.remove(hostId);
  },

  'hosts.setIsChecked'(hostId, isChecked) {
    check(hostId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const host = HostsCollection.findOne({ _id: hostId, userId: this.userId });

    if (!host) {
      throw new Meteor.Error('Access denied.');
    }

    HostsCollection.update(hostId, {
      $set: {
        isChecked,
      },
    });
  },
});
