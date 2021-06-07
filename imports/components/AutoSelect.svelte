<script>
  import objectPath from "object-path";
  import { FormGroup, Input, Label } from "sveltestrap";
  import { getContext } from "svelte";
  import { key } from "../lib/key";
  import AutoErrorMessage from "./AutoErrorMessage.svelte";
  import { SimpleSchema_render } from '../lib/helper';

  export let schema;
  export let label;
  export let name;
  const { form, handleChange } = getContext(key);
</script>

<div class="row mb-3">
  <label for={name} class="col-sm-4 col-form-label" style="text-align: right;">
      {label}
  </label>
  <div class="col-sm-8">
      <select  id={name} class='form-select form-control col-sm-8' value={objectPath.get($form, name) || ''}>
        {#each schema.getAllowedValuesForKey(name) as option}
          <option value={option} selected={objectPath.get($form, name) === option}>
            {SimpleSchema_render(schema, name, option)}
          </option>
        {/each}
  </div>
  <AutoErrorMessage {name} />
</div>