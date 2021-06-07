<script>
  import {
    HostsCollection,
    HostSchema,
  } from "../db/HostsCollection";
  import SubForm from "../components/SubForm.svelte";

  export let host_name = "";
  let host = HostSchema.clean({}, {getAutoValues: true});

  const handler = Meteor.subscribe("hosts");
  $m: {
    loading = !handler.ready();
    hosts = HostsCollection.find({ name: host_name });
    host = hosts.count() === 1 ? hosts.fetch()[0] : {};
  }

  const handleSubmit = () => {
    if (!host.name) return;

    if ("_id" in host) {
      const hostId = host._id;
      delete host._id;
      Meteor.call("hosts.update", hostId, host);
    } else {
      Meteor.call("hosts.insert", host);
    }
  };

</script>

<SubForm schema={HostSchema} tittle={"_id" in host ? "Modify a host" : "Add a host"} object={host} /> 
