<script>
    import { SimpleSchema_render } from '../lib/helper';

    export let schema;
    export let key;
    export let object;
</script>

<div class='row form-group'>
    <label
      for={key}
      class='col-sm-2 text-right'
      style='margin-top: 0.25rem; margin-bottom: 0.25rem'
      >
      {schema.label(key)}
    </label>
    <input id={key} class='col-sm-10 form-control' bind:value={object[key]} />
</div>
