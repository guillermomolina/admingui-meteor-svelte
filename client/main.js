import 'bootstrap/dist/js/bootstrap.bundle';
import '../imports/lib/startup';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new App({
    target: document.getElementById('app'),
  });
});
