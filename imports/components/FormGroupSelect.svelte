<script>
    import { SimpleSchema_render } from '../lib/helper';

    export let schema;
    export let key;
    export let object = {};
    export let id = [key, Date.now()].join('_');
</script>

<div class='row form-group'>
  <label
    for={id}
    class='col-4 text-right'
    style='margin-top: 0.25rem; margin-bottom: 0.25rem'
    >
    {schema.label(key)}
  </label>
  <select {id} class='form-control col-8' bind:value={object[key]}>
    {#each schema.getAllowedValuesForKey(key) as option}
      <option value={option}>
        {SimpleSchema_render(schema, key, option)}
      </option>
    {/each}
  </select>
</div>
