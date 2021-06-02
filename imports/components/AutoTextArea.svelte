<script>
    import {getContext} from 'svelte';
    import {key} from '../lib/key';
    export let name;
    const {form, handleChange} = getContext(key);
  </script>
  
  <!-- prettier-ignore -->
  <textarea {name} on:change={handleChange} on:blur={handleChange} {...$$props}>{$form[name]}</textarea>