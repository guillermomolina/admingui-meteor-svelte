<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Button,
  } from 'sveltestrap';
  import {
    OperatingSystemSchema,
    HostSchema,
  } from '../db/HostsCollection';
  import FormGroupMemory from '../components/FormGroupMemory.svelte';
  import FormGroupSelect from '../components/FormGroupSelect.svelte';
  import FormGroupText from '../components/FormGroupText.svelte';
  import FormGroupNumber from '../components/FormGroupNumber.svelte';
  import ServerSubForm from './ServerSubForm.svelte';
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
      <FormGroupText schema={HostSchema} key='name' bind:object={host}/>
      <FormGroupSelect schema={HostSchema} key='category' bind:object={host}/>
      <FormGroupSelect schema={HostSchema} key='type' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='class' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='architecture' bind:object={host}/>
      <FormGroupText schema={HostSchema} key='container' bind:object={host}/>
      <FormGroupNumber schema={HostSchema} key='vcpus' bind:object={host}/>
      <FormGroupMemory schema={HostSchema} key='memory' bind:object={host}/>

      <Card class='mb-4 border-light'>
        <CardHeader class='bg-transparent'>Operating system</CardHeader>
        <CardBody>
          <FormGroupText schema={OperatingSystemSchema} key='name' bind:object={host.operating_system}/>
          <FormGroupText schema={OperatingSystemSchema} key='version' bind:object={host.operating_system}/>
          <FormGroupText schema={OperatingSystemSchema} key='revision' bind:object={host.operating_system}/>
        </CardBody>
      </Card>

      {#if 'type' in host && host.type === 'server'}
        <ServerSubForm server={host.server} />
      {/if}
    </Form>
  </CardBody>
  <CardFooter>
    <Button color='primary' on:click={handleSubmit}>Submit</Button>
  </CardFooter>
</Card>
