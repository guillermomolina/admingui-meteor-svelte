<script>
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
  } from 'sveltestrap';
  import { beforeUpdate } from 'svelte';
  import {
    OperatingSystemSchema,
    HostSchema,
    ServerSchema,
  } from '../db/HostsCollection';
  import { SimpleSchema_render } from '../lib/helper';
  import FormGroupMemory from '../components/FormGroupMemory.svelte';
  import FormGroupSelect from '../components/FormGroupSelect.svelte';
  import FormGroupText from '../components/FormGroupText.svelte';
  import FormGroupNumber from '../components/FormGroupNumber.svelte';
  export let host;
  $: server = 'server' in host? host.server : { vendor: ''};
  let host_memory_number = 0;

  beforeUpdate(() => {
  });

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
      <FormGroupText schema={HostSchema} key='name' bind:object={host}/>
      <FormGroupSelect schema={HostSchema} key='category' bind:object={host}/>
      <FormGroupSelect schema={HostSchema} key='type' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='class' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='architecture' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='container' bind:object={host}/>
      <FormGroupNumber schema={HostSchema} key='vcpus' bind:object={host}/>
      <FormGroupMemory schema={HostSchema} key='memory' bind:object={host}/>

      <h5 class="text-center">Operating system</h5>
      <FormGroupText schema={OperatingSystemSchema} key='name' bind:object={host.operating_system}/>
      <FormGroupText schema={OperatingSystemSchema} key='version' bind:object={host.operating_system}/>
      <FormGroupText schema={OperatingSystemSchema} key='revision' bind:object={host.operating_system}/>

      {#if host.type === 'server' && 'server' in host}
        <h5 class="text-center">Server</h5>
        <FormGroupText schema={ServerSchema} key='vendor' bind:object={host.server}/>
      {/if}
    </Form>
  </CardBody>
  <CardFooter>
    <Button color='primary' on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
