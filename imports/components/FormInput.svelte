<script>
  import SimpleSchema from 'simpl-schema';
  import { SimpleSchema_getFieldDefinition } from '../lib/helper';
  import FormGroupText from './FormGroupText.svelte';
  import FormGroupNumber from './FormGroupNumber.svelte';
  import SubForm from './SubForm.svelte';

  export let schema;
  export let key;
  export let value = '';

  let fieldType = SimpleSchema_getFieldDefinition(schema, key).type;
</script>

{#if fieldType === String}
  <FormGroupText {schema} {key} bind:value />
{:else if fieldType === 'SimpleSchema.Integer'}
  <FormGroupNumber {schema} {key} bind:value />
{:else if fieldType instanceof SimpleSchema}
  <SubForm schema={fieldType} tittle={schema.label(key)} bind:object={value} />
{/if}
