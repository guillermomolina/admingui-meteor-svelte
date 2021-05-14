<script>
    import { SimpleSchema_render } from '../lib/helper';

    export let schema;
    export let key;
    export let object = {};
</script>

<div class='row form-group'>
  <label
    for={key}
    class='col-sm-2 text-right'
    style='margin-top: 0.25rem; margin-bottom: 0.25rem'
    >
    {schema.label(key)}
  </label>
  <select id={key} class='form-control col-sm-10' bind:value={object[key]}>
    {#each schema.getAllowedValuesForKey(key) as option}
      <option value={option}>
        {SimpleSchema_render(schema, key, option)}
      </option>
    {/each}
  </select>
</div>
