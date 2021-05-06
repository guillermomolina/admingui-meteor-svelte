<script>
  import { Card, CardHeader, CardBody, CardFooter, Table } from "sveltestrap";

  const tableHeading = ["Name", "Type", "Category", "Virtual CPUs", "Memory"];
  export let servers;

  export let cardTitle = "Servers";
  export let cardIcon = "";
  export let cardColor = "";
  export let cardFooterText = "View Details";
</script>

<Card color={cardColor} class="mb-4">
  <CardHeader>
    <i class={cardIcon} />
    {cardTitle}
  </CardHeader>
  <CardBody>
    <Table responsive>
      <thead>
        <tr>
          {#each tableHeading as heading}
            <th>{heading}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each servers as server}
          <tr>
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
  <CardFooter class="d-flex align-items-center justify-content-between">
    <a class="small text-white stretched-link" href="charts">
      {cardFooterText}
    </a>
    <div class="small">
      <i class="fas fa-angle-right" />
    </div>
  </CardFooter>
</Card>
