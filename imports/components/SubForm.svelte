<script>
  import { Card, CardHeader, CardBody } from 'sveltestrap';
  import FormInput from './FormInput.svelte';

  export let schema;
  export let tittle;
  export let key;
  export let object;

  object = object || {};
  $: value = key in object? object[key]: {}; 

  const setValue = () => {
    object[key] = value;
  }
</script>

<Card class='border-0'>
  <CardHeader class='bg-transparent'>{tittle}</CardHeader>
  <CardBody>
    {#each schema._schemaKeys as subkey}
      <FormInput {schema} key={subkey} bind:object={object} />
    {/each}
  </CardBody>
</Card>
