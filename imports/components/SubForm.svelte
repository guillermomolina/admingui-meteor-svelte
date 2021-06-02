<script>
  import FormInput from "./FormInput.svelte";

  export let schema;
  export let tittle;
  export let object;

</script>

{console.log(3,object)}
<div class="card border-0">
  <div class='card-header bg-transparent'>{tittle}</div>
  <div class='card-body'>
    {#if object}
      {#each schema._schemaKeys as subkey}
        <FormInput {schema} key={subkey} value={object[subkey]} />
      {/each}
    {/if}
  </div>
</div>
