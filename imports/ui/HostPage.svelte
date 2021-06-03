<script>
  import HostTable from "./HostTable.svelte";
  import HostForm from "./HostForm.svelte";

  let host_name = null;
  let loading = true;

  const handler = Meteor.subscribe("hosts");
  $m: {
    loading = !handler.ready();
  }

</script>

<div class="container-fluid">
  <div class="row">
    <div class="col-lg-8"><HostTable {loading} bind:host_name /></div>
    <div class="col-lg-4"><HostForm {host_name} /></div>
  </div>
</div>
