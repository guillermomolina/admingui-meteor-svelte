<script>
  import { Card, CardHeader, CardBody, CardFooter, Table } from "sveltestrap";

  const tableHeading = ["Name", "Type", "Category", "Virtual CPUs", "Memory"];
  export let servers;
  export let selectedServer;

  export let cardTitle = "Servers";

  const select = server => () => selectedServer = server;
</script>

<Card class="mb-4">
  <CardHeader>
    {cardTitle}
  </CardHeader>
  <CardBody>
    <Table responsive hover>
      <thead>
        <tr>
          {#each tableHeading as heading}
            <th>{heading}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each servers as server}
          <tr on:click|preventDefault={select(server)} class:active={selectedServer && selectedServer._id == server._id} >
            <th scope="row">{server.name}</th>
            <td>{server.type}</td>
            <td>{server.category}</td>
            <td>{server.vcpus}</td>
            <td>{server.memory}</td>
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
  <CardFooter>
    {#if selectedServer}
      {selectedServer.name}
    {/if}
  </CardFooter>
</Card>
