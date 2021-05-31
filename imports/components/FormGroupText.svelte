<script>
  import { SimpleSchema_render } from '../lib/helper';

  export let schema;
  export let key;
  export let value;
  export let id = [key, Date.now()].join('_');

  value = value || '';
</script>

<div class='row form-group'>
    <label
      for={id}
      class='col-4 text-right'
      style='margin-top: 0.25rem; margin-bottom: 0.25rem'
      >
      {schema.label(key)}
    </label>
    <input {id} class='col-8 form-control' {value}/>
</div>

