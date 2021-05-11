<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
    Label,
  } from 'sveltestrap';
  import { OperatingSystemSchema, HostSchema, ServerSchema } from '../db/HostsCollection';
  import { SimpleSchema_render } from '../lib/helper';
  export let host;

  const handleSubmit = () => {
    if (!host.name) return;

    Meteor.call('hosts.insert', newHost);
  };
</script>

<Card class='mb-4'>
  <CardHeader>
    {'_id' in host ? 'Modify a host' : 'Add a host'}
  </CardHeader>
  <CardBody>
    <Form>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('name')}</Label
        >
        <Input class='col-sm-10' bind:value={host.name} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('category')}</Label
        >
        <Input class='col-sm-10' bind:value={host.category} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('type')}</Label
        >
        <Input class='col-sm-10' bind:value={host.type} type='select'>
          {#each HostSchema.getAllowedValuesForKey('type') as type}
            <option>{SimpleSchema_render(HostSchema, 'type', type)}</option>
          {/each}
        </Input>
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('class')}</Label
        >
        <Input class='col-sm-10' bind:value={host.class} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('architecture')}</Label
        >
        <Input class='col-sm-10' bind:value={host.architecture} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('container')}</Label
        >
        <Input class='col-sm-10' bind:value={host.container} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{HostSchema.label('vcpus')}</Label
        >
        <Input class='col-sm-10' bind:value={host.vcpus} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
        >
          {HostSchema.label('memory')}
        </Label>
        <InputGroup class='col-sm-10' style='padding: 0'>
          <Input bind:value={host.memory} type='number' />
          <InputGroupAddon addonType='append'>
            <Input type='select'>
              <option>MB</option>
              <option>GB</option>
              <option>TB</option>
            </Input>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>

      <h5>Operating system</h5>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{OperatingSystemSchema.label('name')}</Label
        >
        <Input class='col-sm-10' bind:value={host.operating_system.name} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{OperatingSystemSchema.label('version')}</Label
        >
        <Input class='col-sm-10' bind:value={host.operating_system.version} />
      </FormGroup>
      <FormGroup row>
        <Label
          class='col-sm-2 text-right'
          style='margin-top: 0.25rem; margin-bottom: 0.25rem'
          >{OperatingSystemSchema.label('revision')}</Label
        >
        <Input class='col-sm-10' bind:value={host.operating_system.revision} />
      </FormGroup>

      {#if 'server' in host && host.type === 'server'}
        <h5>Server</h5>
        <FormGroup row>
          <Label
            class='col-sm-2 text-right'
            style='margin-top: 0.25rem; margin-bottom: 0.25rem'
            >{ServerSchema.label('vendor')}</Label
          >
          <Input class='col-sm-10' bind:value={host.server.vendor} />
        </FormGroup>
      {/if}

    </Form>
  </CardBody>
  <CardFooter>
    <Button color='primary' on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
