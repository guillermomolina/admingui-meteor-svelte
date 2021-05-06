import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { ServersCollection } from '/imports/db/ServersCollection';
import '/imports/api/serversMethods';

if (Meteor.isServer) {
  describe('Servers', () => {
    describe('methods', () => {
      const userId = Random.id();
      let serverId;

      beforeEach(() => {
        ServersCollection.remove({});
        serverId = ServersCollection.insert({
          text: 'Test Server',
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned server', () => {
        mockMethodCall('servers.remove', serverId, { context: { userId } });

        assert.equal(ServersCollection.find().count(), 0);
      });

      it("can't delete server without an user authenticated", () => {
        const fn = () => mockMethodCall('servers.remove', serverId);
        assert.throw(fn, /Not authorized/);
        assert.equal(ServersCollection.find().count(), 1);
      });

      it("can't delete server from another owner", () => {
        const fn = () =>
          mockMethodCall('servers.remove', serverId, {
            context: { userId: 'somebody-else-id' },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(ServersCollection.find().count(), 1);
      });

      it('can change the status of a server', () => {
        const originalServer = ServersCollection.findOne(serverId);
        mockMethodCall('servers.setIsChecked', serverId, !originalServer.isChecked, {
          context: { userId },
        });

        const updatedServer = ServersCollection.findOne(serverId);
        assert.notEqual(updatedServer.isChecked, originalServer.isChecked);
      });

      it('can insert new servers', () => {
        const text = 'New Server';
        mockMethodCall('servers.insert', text, {
          context: { userId },
        });

        const servers = ServersCollection.find({}).fetch();
        assert.equal(servers.length, 2);
        assert.isTrue(servers.some(server => server.text === text));
      });
    });
  });
}
