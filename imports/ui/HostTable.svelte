<script>
  import { Card, CardHeader, CardBody, CardFooter, Table } from "sveltestrap";
  import { HostSchema } from "../db/HostsCollection";

  export let hosts;
  export let host;

  const select = (row) => () => (host = row);
</script>

<Card class="mb-4">
  <CardHeader>Hosts</CardHeader>
  <CardBody>
    <Table responsive hover>
      <thead>
        <tr>
          <th>{HostSchema.label("name")}</th>
          <th>{HostSchema.label("type")}</th>
          <th>{HostSchema.label("category")}</th>
          <th>{HostSchema.label("vcpus")}</th>
          <th>{HostSchema.label("memory")}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each hosts as row}
          <tr
            on:click|preventDefault={select(row)}
            class:highlight={host == row}
          >
            <th scope="row">{row.name}</th>
            <td>{HostSchema.schema('type').renderer(row.type)}</td>
            <td>{row.category}</td>
            <td>{row.vcpus}</td>
            <td>{HostSchema.schema('memory').renderer(row.memory)}</td>
            <td/>
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
  <CardFooter>
    {#if host.name}
      Selected: {host.name}
    {:else}
      Select a host
    {/if}
  </CardFooter>
</Card>

<style>
  .table tbody tr.highlight {
    background-color: #ddd;
  }
</style>
