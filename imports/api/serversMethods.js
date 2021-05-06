import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'servers.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    ServersCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'servers.remove'(serverId) {
    check(serverId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const server = ServersCollection.findOne({ _id: serverId, userId: this.userId });

    if (!server) {
      throw new Meteor.Error('Access denied.');
    }

    ServersCollection.remove(serverId);
  },

  'servers.setIsChecked'(serverId, isChecked) {
    check(serverId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const server = ServersCollection.findOne({ _id: serverId, userId: this.userId });

    if (!server) {
      throw new Meteor.Error('Access denied.');
    }

    ServersCollection.update(serverId, {
      $set: {
        isChecked,
      },
    });
  },
});
