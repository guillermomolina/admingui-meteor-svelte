import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { HostsCollection } from '/imports/db/HostsCollection';
import '/imports/api/hostsMethods';

if (Meteor.isServer) {
  describe('Hosts', () => {
    describe('methods', () => {
      const userId = Random.id();
      let hostId;

      beforeEach(() => {
        HostsCollection.remove({});
        hostId = HostsCollection.insert({
          text: 'Test Host',
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned host', () => {
        mockMethodCall('hosts.remove', hostId, { context: { userId } });

        assert.equal(HostsCollection.find().count(), 0);
      });

      it("can't delete host without an user authenticated", () => {
        const fn = () => mockMethodCall('hosts.remove', hostId);
        assert.throw(fn, /Not authorized/);
        assert.equal(HostsCollection.find().count(), 1);
      });

      it("can't delete host from another owner", () => {
        const fn = () =>
          mockMethodCall('hosts.remove', hostId, {
            context: { userId: 'somebody-else-id' },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(HostsCollection.find().count(), 1);
      });

      it('can change the status of a host', () => {
        const originalHost = HostsCollection.findOne(hostId);
        mockMethodCall('hosts.setIsChecked', hostId, !originalHost.isChecked, {
          context: { userId },
        });

        const updatedHost = HostsCollection.findOne(hostId);
        assert.notEqual(updatedHost.isChecked, originalHost.isChecked);
      });

      it('can insert new hosts', () => {
        const text = 'New Host';
        mockMethodCall('hosts.insert', text, {
          context: { userId },
        });

        const hosts = HostsCollection.find({}).fetch();
        assert.equal(hosts.length, 2);
        assert.isTrue(hosts.some(host => host.text === text));
      });
    });
  });
}
