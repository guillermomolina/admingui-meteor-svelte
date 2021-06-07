<script>
  import SimpleSchema from "simpl-schema";
  import { SimpleSchema_getFieldType } from "../lib/helper";
  import AutoInput from "./AutoInput.svelte";

  export let schema;
  export let tittle = null;
  export let name = null;

  const fieldList = schema._schemaKeys.map((key) => {
    const field = {
      key,
      name: name === null ? key : [name, key].join("."),
      type: SimpleSchema_getFieldType(schema, key),
    };
    return field;
  });
</script>

<div class="card border-0">
  <div class="card-header bg-transparent">{tittle}</div>
  <div class="card-body">
    {#each fieldList as field}
      {#if field.type instanceof SimpleSchema}
        <svelte:self
          tittle={schema.label(field.key)}
          schema={field.type}
          name={field.name}
        />
      {:else if field.type === "SimpleSchema.Integer"}
        <AutoInput
          label={schema.label(field.key)}
          name={field.name}
          type="number"
        />
      {:else}
        <AutoInput
          label={schema.label(field.key)}
          name={field.name}
        />
      {/if}
    {/each}
  </div>
</div>
