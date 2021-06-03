<script>
  import { HostsCollection, HostSchema } from "../db/HostsCollection";
  import AutoForm from "../components/AutoForm.svelte";

  export let host_name;
  let formProps = {
    initialValues: {},
    schema: HostSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  };

  $m: {
    if(host_name) {
      const hosts = HostsCollection.find({ name: host_name });
      if(hosts.count() === 1) {
        formProps.initialValues = hosts.fetch()[0];
      }
    }
  }
</script>

<AutoForm {...formProps}>
</AutoForm>
