<script>
  import { HostsCollection } from "../db/HostsCollection";
  import { Card, CardHeader, CardBody, CardFooter } from "sveltestrap";
  import { HostSchema } from "../db/HostsCollection";
  import { SimpleSchema_render } from "../lib/helper";
  import Table, { Pagination, Search, Sort } from "../components/Table.svelte";

  export let host_name;
  let rows = [];
  let page = 0; //first page
  let pageSize = 10; //optional, 10 by default

  let loading = true;
  let totalRowsCount = 0;
  let text = "";
  let sort = {};

  const select = (row) => () => (host_name = row.name);


  let hosts = [];
  const handler = Meteor.subscribe("hosts");
  $m: {
    loading = !handler.ready();
    const regex = {$regex : `.*${text}.*`};
    const search = text === ''? {}: {
      $or: [
        { name: regex },
        { type: regex },
        { category: regex }
      ]
    };
    const query = HostsCollection.find(search, {
      fields: { name: 1, type: 1, category: 1, vcpus: 1, memory: 1 },
      sort, 
      skip: page * pageSize, 
      limit: pageSize
    });
    totalRowsCount = query.count(false);
    rows = query.fetch();
  }

  const onPageChange = (event) => {
    page = event.detail.page;
  };

  const onSearch = (event) => {
    text = event.detail.text;
    page = 0;
  }

  const onSort = (event) => {
    newSort = {}
    newSort[event.detail.key] = event.detail.dir;
    sort = newSort;
  }
</script>

<Card style="margin-top: 1.5rem">
  <CardHeader>Hosts</CardHeader>
  <CardBody>
    <Table
      class="table table-hover"
      {loading}
      {page}
      {pageSize}
      {rows}
      {totalRowsCount}
      serverSide=true
      let:rows={rows2}
      on:search={onSearch}
      on:pageChange={onPageChange}
>
      <thead slot="head">
        <tr>
          <th>
            {HostSchema.label("name")}
            <Sort key="name" on:sort={onSort}/>
          </th>
          <th
            >{HostSchema.label("type")}<Sort
              key="type"
              on:sort={onSort}
            /></th
          >
          <th
            >{HostSchema.label("category")}<Sort
              key="category"
              on:sort={onSort}
            /></th
          >
          <th
            >{HostSchema.label("vcpus")}<Sort
              key="vcpus"
              on:sort={onSort}
            /></th
          >
          <th
            >{HostSchema.label("memory")}<Sort
              key="memory"
              on:sort={onSort}
            /></th
          >
          <th />
        </tr>
      </thead>
      <tbody>
        {#each rows2 as row}
          <tr
            on:click|preventDefault={select(row)}
            class:highlight={host_name == row.name}
          >
            <td data-label={HostSchema.label("name")}
              >{SimpleSchema_render(HostSchema, "name", row.name)}</td
            >
            <td data-label={HostSchema.label("type")}
              >{SimpleSchema_render(HostSchema, "type", row.type)}</td
            >
            <td data-label={HostSchema.label("category")}
              >{SimpleSchema_render(HostSchema, "category", row.category)}</td
            >
            <td data-label={HostSchema.label("vcpus")}
              >{SimpleSchema_render(HostSchema, "vcpus", row.vcpus)}</td
            >
            <td data-label={HostSchema.label("memory")}
              >{SimpleSchema_render(HostSchema, "memory", row.memory)}</td
            >
            <td />
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
  <CardFooter>
    {#if host_name}
      Selected: {host_name}
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
