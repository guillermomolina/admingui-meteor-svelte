<script>
  import { HostSchema } from "../db/HostsCollection";
  import AutoForm from "../components/AutoForm.svelte";

  export let host_name = "";

  const formProps = {
    schema: HostSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  };
</script>

<AutoForm {...formProps}>
</AutoForm>
