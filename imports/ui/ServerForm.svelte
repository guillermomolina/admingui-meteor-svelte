<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
  } from "sveltestrap";
  import Button from "sveltestrap/src/Button.svelte";
  export let user = null;
  let newServer = {
    name: "",
  };

  const handleSubmit = () => {
    if (!newServer.name) return;

    Meteor.call("servers.insert", newServer);

    // Clear form
    newServer = {
      name: "",
    };
  };

  export let cardTitle = "Add a server";
  export let cardColor = "";
</script>

<Form>
  <Card color={cardColor} class="mb-4">
    <CardHeader>
      {cardTitle}
    </CardHeader>
    <CardBody>
      <FormGroup>
        <Label for="server_name">Name</Label>
        <Input
          type="text"
          name="name"
          id="server_name"
          placeholder="with a placeholder"
          bind:value={newServer.name}
        />
      </FormGroup>
    </CardBody>
    <CardFooter>
      <Button color="primary" type="submit">Submit</Button>
    </CardFooter>
  </Card>
</Form>
