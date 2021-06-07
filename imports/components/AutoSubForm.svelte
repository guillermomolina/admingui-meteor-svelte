<script>
  import objectPath from "object-path";
  import SimpleSchema from "simpl-schema";
  import { getContext } from "svelte";
  import { key } from "../lib/key";
  import {
    SimpleSchema_getFieldType,
    SimpleSchema_getFieldDefinition,
  } from "../lib/helper";
  import AutoInput from "./AutoInput.svelte";
  import AutoSelect from "./AutoSelect.svelte";

  export let schema;
  export let tittle = null;
  export let name = null;

  const { form } = getContext(key);

  const fieldList = schema._schemaKeys.map((key) => {
    const field = {
      key,
      name: name === null ? key : [name, key].join("."),
      type: SimpleSchema_getFieldType(schema, key),
    };
    return field;
  });
</script>

{#if !name || objectPath.get($form, name)}
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
        {:else if SimpleSchema_getFieldDefinition(schema, field.key).allowedValues}
          <AutoSelect
            label={schema.label(field.key)}
            name={field.name}
            {schema}
          />
        {:else}
          <AutoInput
            label={schema.label(field.key)}
            name={field.name}
            {schema}
          />
        {/if}
      {/each}
    </div>
  </div>
{/if}
