<script>
  import FormInput from "./FormInput.svelte";

  export let schema;
  export let tittle;
  export let object;

  object = object || schema.clean({});
</script>

<div class="card border-0">
  <div class='card-header bg-transparent'>{tittle}</div>
  <div class='card-body'>
    {#if object}
      {#each schema._schemaKeys as subkey}
        <FormInput {schema} key={subkey} bind:value={object[subkey]} />
      {/each}
    {/if}
  </div>
</div>
