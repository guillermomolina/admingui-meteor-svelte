<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Input,
    Label,
  } from "sveltestrap";
  import Button from "sveltestrap/src/Button.svelte";
  export let server = {
    name: "",
  };

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
      <Label>Name</Label>
      <Input bind:value={server.name} />
    </FormGroup>
  </CardBody>
  <CardFooter>
    <Button color="primary" on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
