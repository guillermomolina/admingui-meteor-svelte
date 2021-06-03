<script>
  import { getContext } from "svelte";
  import SimpleSchema from 'simpl-schema';
  import { key } from "../lib/key";
  import { getSchemaDefinitionType } from "../lib/helper";
  import AutoInput from "./AutoInput.svelte";

  export let schema;
  export let tittle;
  const { form } = getContext(key);

  const fullSchema = schema.mergedSchema();
  const fieldList = Object.keys(fullSchema);
</script>

<div class="card border-0">
  <div class="card-header bg-transparent">{tittle}</div>
  <div class="card-body">
    {#each fieldList as name}
      {#if getSchemaDefinitionType(fullSchema[name]) === String}
        <AutoInput label={schema.label(name)} {name} {...$$props} />
      {:else if getSchemaDefinitionType(fullSchema[name]) === "SimpleSchema.Integer"}
        <AutoInput label={schema.label(name)} {name} type="number" {...$$props} />
      {/if}
    {/each}
  </div>
</div>
