import { Meteor } from 'meteor/meteor';
import { HostsCollection } from '/imports/db/HostsCollection';

Meteor.publish('hosts', function publishHosts() {
  return HostsCollection.find({});
});
