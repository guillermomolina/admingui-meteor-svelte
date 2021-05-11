<script>
    import { Meteor } from "meteor/meteor";
    import { HostsCollection } from "../db/HostsCollection";
    import HostTable from "./HostTable.svelte";
    import HostForm from "./HostForm.svelte";

    let incompleteCount;
    let hosts = [];
    let host = {
        name: "",
        operating_system: {
        }
    };

    const handler = Meteor.subscribe("hosts");
    $m: {
        isLoading = !handler.ready();

        query = HostsCollection.find({}, { sort: { createdAt: -1 } });
        hosts = query.fetch();

        incompleteCount = query.count();

        pendingHostsTitle = `${
            incompleteCount ? ` (${incompleteCount})` : ""
        }`;
    }
</script>

<HostTable {hosts} bind:host />
<HostForm {host} />
