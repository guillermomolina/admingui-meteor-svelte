<script>
  import { getContext } from "svelte";
  import SimpleSchema from "simpl-schema";
  import { key } from "../lib/key";
  import { SimpleSchema_getFieldType } from "../lib/helper";
  import AutoInput from "./AutoInput.svelte";

  export let schema;
  export let tittle = null;
  export let name = null;
  const { form } = getContext(key);

  const fieldList = schema._schemaKeys.map((key) => {
    return {
      key,
      name: name === null ? key : [name, key].join("."),
      type: SimpleSchema_getFieldType(schema, key),
    };
  });
</script>

<div class="card border-0">
  <div class="card-header bg-transparent">{tittle || schema.label(name)}</div>
  <div class="card-body">
    <div class="form-inline">
      {#each fieldList as field}
        {#if field.type instanceof SimpleSchema}
          <svelte:self schema={field.type} name={field.name} />
        {:else if field.type === "SimpleSchema.Integer"}
          <AutoInput
            label={schema.label(field.key)}
            name={field.name}
            type="number"
            {...$$props}
          />
        {:else}
          <AutoInput
            label={schema.label(field.key)}
            name={field.name}
            {...$$props}
          />
        {/if}
      {/each}
    </div>
  </div>
</div>
