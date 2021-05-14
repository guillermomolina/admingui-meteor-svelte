<script>
	import { beforeUpdate } from 'svelte';
  import {
    ServerSchema,
    ServerLocationSchema,
    ServerCPUSchema,
    ServerMemorySchema,
    ServerDiskSchema
  } from '../db/HostsCollection';
  import FormGroupText from '../components/FormGroupText.svelte';
  import FormGroupNumber from '../components/FormGroupNumber.svelte';
  import FormGroupFrequency from '../components/FormGroupFrequency.svelte';
  import FormGroupMemory from '../components/FormGroupMemory.svelte';

  export let server;

	beforeUpdate(() => {
		server = server || {};
    server.location = server.location || {};
    server.cpu = server.cpu || {};
    server.memory = server.memory || {};
    server.disk = server.disk || {};
	});

</script>

<div class='card border-light mb-4'>
  <div class='card-header bg-transparent'>Server</div>
  <div class='card-body'>
    <FormGroupText schema={ServerSchema} key='vendor' bind:object={server}/>
    <FormGroupText schema={ServerSchema} key='serial_number' bind:object={server}/>
    <FormGroupText schema={ServerSchema} key='oracle_csi' bind:object={server}/>

    <div class='card border-light mb-4'>
      <div class='card-header bg-transparent'>Location</div>
      <div class='card-body'>
        <FormGroupText schema={ServerLocationSchema} key='cpd' bind:object={server.location}/>
        <FormGroupText schema={ServerLocationSchema} key='rack' bind:object={server.location}/>
      </div>
    </div>

    <div class='card border-light mb-4'>
      <div class='card-header bg-transparent'>CPU</div>
      <div class='card-body'>
        <FormGroupText schema={ServerCPUSchema} key='type' bind:object={server.cpu}/>
        <FormGroupFrequency schema={ServerCPUSchema} key='frequency' bind:object={server.cpu}/>
        <FormGroupNumber schema={ServerCPUSchema} key='count' bind:object={server.cpu}/>
        <FormGroupNumber schema={ServerCPUSchema} key='cores' bind:object={server.cpu}/>
        <FormGroupNumber schema={ServerCPUSchema} key='threads' bind:object={server.cpu}/>    
      </div>
    </div>

    <div class='card border-light mb-4'>
      <div class='card-header bg-transparent'>Memory</div>
      <div class='card-body'>
        <FormGroupText schema={ServerMemorySchema} key='type' bind:object={server.memory}/>
        <FormGroupNumber schema={ServerMemorySchema} key='count' bind:object={server.memory}/>
        <FormGroupMemory schema={ServerMemorySchema} key='size' bind:object={server.memory}/>
      </div>
    </div>

    <div class='card border-light mb-4'>
      <div class='card-header bg-transparent'>Disk</div>
      <div class='card-body'>
        <FormGroupText schema={ServerDiskSchema} key='type' bind:object={server.disk}/>
        <FormGroupNumber schema={ServerDiskSchema} key='count' bind:object={server.disk}/>
        <FormGroupMemory schema={ServerDiskSchema} key='size' bind:object={server.disk}/>
        <FormGroupNumber schema={ServerDiskSchema} key='rpms' bind:object={server.disk}/>
      </div>
    </div>
    
  </div>
</div>
