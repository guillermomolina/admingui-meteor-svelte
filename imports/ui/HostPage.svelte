<script>
    import HostTable from "./HostTable.svelte";
    import HostForm from "./HostForm.svelte";

    let host_name = "";

</script>

<HostTable bind:host_name />
<HostForm {host_name} />
