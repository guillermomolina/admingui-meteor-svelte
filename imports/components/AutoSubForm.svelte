<script>
  import objectPath from "object-path";
  import SimpleSchema from "simpl-schema";
  import { getContext } from "svelte";
  import { key } from "../lib/key";
  import {
    SimpleSchema_getFieldType,
    SimpleSchema_getFieldDefinition,
  } from "../lib/helper";
  import { util } from '../lib/util';
  import AutoInput from "./AutoInput.svelte";
  import AutoSelect from "./AutoSelect.svelte";

  export let schema;
  export let label = null;
  export let name = null;

  const { form } = getContext(key);

  let subschema = util.isNullish(name)? schema: SimpleSchema_getFieldType(schema, name);

  const fieldList = subschema._schemaKeys.map((key) => {
    const field = {
      key,
      name: name === null ? key : [name, key].join("."),
      type: SimpleSchema_getFieldType(subschema, key),
    };
    return field;
  });
</script>

{#if !name || objectPath.get($form, name)}
  <div class="card border-0">
    <div class="card-header bg-transparent">{label}</div>
    <div class="card-body">
      {#each fieldList as field}
        {#if field.type instanceof SimpleSchema}
          <svelte:self
            label={schema.label(field.name)}
            name={field.name}
            {schema}
          />
        {:else if SimpleSchema_getFieldDefinition(schema, field.name).allowedValues}
          <AutoSelect
            label={schema.label(field.name)}
            name={field.name}
            {schema}
          />
        {:else}
          <AutoInput
            label={schema.label(field.name)}
            name={field.name}
            {schema}
          />
        {/if}
      {/each}
    </div>
  </div>
{/if}
