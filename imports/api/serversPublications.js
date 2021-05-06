import { Meteor } from 'meteor/meteor';
import { ServersCollection } from '/imports/db/ServersCollection';

Meteor.publish('servers', function publishServers() {
  return ServersCollection.find({});
});
