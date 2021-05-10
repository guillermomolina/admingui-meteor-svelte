<script>
  import { Card, CardHeader, CardBody, CardFooter, Table } from "sveltestrap";
  import { ServersSchema } from "../db/ServersCollection";

  export let servers;
  export let server;

  const select = (row) => () => (server = row);
</script>

<Card class="mb-4">
  <CardHeader>Servers</CardHeader>
  <CardBody>
    <Table responsive hover>
      <thead>
        <tr>
          <th>{ServersSchema.label("name")}</th>
          <th>{ServersSchema.label("type")}</th>
          <th>{ServersSchema.label("category")}</th>
          <th>{ServersSchema.label("vcpus")}</th>
          <th>{ServersSchema.label("memory")}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each servers as row}
          <tr
            on:click|preventDefault={select(row)}
            class:highlight={server == row}
          >
            <th scope="row">{row.name}</th>
            <td>{ServersSchema.schema('type').renderer(row.type)}</td>
            <td>{row.category}</td>
            <td>{row.vcpus}</td>
            <td>{ServersSchema.schema('memory').renderer(row.memory)}</td>
            <td>{server == row}</td>
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
  <CardFooter>
    {#if server.name}
      Selected: {server.name}
    {:else}
      Select a server
    {/if}
  </CardFooter>
</Card>

<style>
  .table tbody tr.highlight {
    background-color: #ddd;
  }
</style>
