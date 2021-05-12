<script>
    import {
        FormGroup,
        Input,
        Label,
    } from 'sveltestrap';
    import { SimpleSchema_render } from '../lib/helper';

    export let schema;
    export let key;
    export let object;
</script>


<FormGroup row>
    <Label
      class='col-sm-2 text-right'
      style='margin-top: 0.25rem; margin-bottom: 0.25rem'
      >
      {schema.label(key)}
    </Label>
    <Input class='col-sm-10' bind:value={object[key]} type='select'>
      {#each schema.getAllowedValuesForKey(key) as option}
        <option value={option}>
          {SimpleSchema_render(schema, key, option)}
        </option>
      {/each}
    </Input>
</FormGroup>
