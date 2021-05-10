<script>
  import { each } from "svelte/internal";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
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

  const renderType = (value) => {
    console.log(ServersSchema.schema('type'));
    return 'Server';
  };
</script>

<Card class="mb-4">
  <CardHeader>
    {cardTitle}
  </CardHeader>
  <CardBody>
    <Form>
      <FormGroup row>
        <Label class="col-sm-2 text-right">{ServersSchema.label("name")}</Label>
        <Input class="col-sm-10" bind:value={server.name} />
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-2 text-right">{ServersSchema.label("type")}</Label>
        <Input class="col-sm-10" bind:value={server.type} type="select">
          {#each ServersSchema.getAllowedValuesForKey('type') as type}
            <option>{ServersSchema.schema('type').renderer(type)}</option>
          {/each}
        </Input>
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-2 text-right"
          >{ServersSchema.label("category")}</Label
        >
        <Input class="col-sm-10" bind:value={server.category} />
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-2 text-right">{ServersSchema.label("vcpus")}</Label
        >
        <Input class="col-sm-10" bind:value={server.vcpus} />
      </FormGroup>
      <FormGroup row>
        <Label class="col-sm-2 text-right">
          {ServersSchema.label("memory")}
        </Label>
        <Input class="col-sm-10" bind:value={server.memory} />
      </FormGroup>
    </Form>
  </CardBody>
  <CardFooter>
    <Button color="primary" on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
