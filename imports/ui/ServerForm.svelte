<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Input,
    Button,
    Label,
  } from "sveltestrap";
  import { ServersSchema } from "../db/ServersCollection";
  export let server;

  const handleSubmit = () => {
    if (!server.name) return;

    Meteor.call("servers.insert", newServer);
  };

  export let cardTitle = "Add a server";
</script>

<Card class="mb-4">
  <CardHeader>
    {cardTitle}
  </CardHeader>
  <CardBody>
    <FormGroup>
      <Label>{ServersSchema.label("name")}</Label>
      <Input bind:value={server.name} />
    </FormGroup>
  </CardBody>
  <CardFooter>
    <Button color="primary" on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
