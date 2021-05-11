<script>
  import { Card, CardHeader, CardBody, CardFooter, Table } from "sveltestrap";
  import { HostSchema } from "../db/HostsCollection";
  import { SimpleSchema_render } from '../lib/helper';

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
            <td>{SimpleSchema_render(HostSchema, 'type', row.type)}</td>
            <td>{SimpleSchema_render(HostSchema, 'category', row.category)}</td>
            <td>{SimpleSchema_render(HostSchema, 'vcpus', row.vcpus)}</td>
            <td>{SimpleSchema_render(HostSchema, 'memory', row.memory)}</td>
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
