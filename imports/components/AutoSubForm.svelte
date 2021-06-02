<script>
  import { getContext } from "svelte";
  import SimpleSchema from 'simpl-schema';
  import { key } from "../lib/key";
  import { SimpleSchema_getFieldType } from "../lib/helper";
  import AutoInput from "./AutoInput.svelte";
  import AutoSubForm from "./AutoSubForm.svelte";

  export let schema;
  export let tittle;
  const { form } = getContext(key);
</script>

<div class="card border-0">
  <div class="card-header bg-transparent">{tittle}</div>
  <div class="card-body">
    {#each schema._schemaKeys as name}
      {#if SimpleSchema_getFieldType(schema, name) === String}
        <AutoInput label={schema.label(name)} {name} {...$$props} />
      {:else if SimpleSchema_getFieldType(schema, name) === "SimpleSchema.Integer"}
        <AutoInput label={schema.label(name)} {name} type="number" {...$$props} />
      {:else if SimpleSchema_getFieldType(schema, name) instanceof SimpleSchema}
        <AutoSubForm
          schema={SimpleSchema_getFieldType(schema, name)}
          tittle={schema.label(name)}
          form={$form[name]}
        /> 
      {/if}
    {/each}
  </div>
</div>
