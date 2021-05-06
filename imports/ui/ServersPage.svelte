<script>
    import { Meteor } from "meteor/meteor";
    import { ServersCollection } from "../db/ServersCollection";
    import ServerTable from "./ServerTable.svelte";
    import ServerForm from "./ServerForm.svelte";

    let incompleteCount;
    let servers = [];

    const handler = Meteor.subscribe("servers");
    $m: {
        isLoading = !handler.ready();

        query = ServersCollection.find({}, { sort: { createdAt: -1 } });
        servers = query.fetch();

        incompleteCount = query.count();

        pendingServersTitle = `${
            incompleteCount ? ` (${incompleteCount})` : ""
        }`;
    }
</script>


<ServerTable {servers} />
<ServerForm />
