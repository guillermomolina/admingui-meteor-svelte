<script>
  import {
    Card,
    CardHeader,
    CardBody
  } from "sveltestrap";
  import FormGroupText from "./FormGroupText.svelte";

  export let schema;
  export let object;

  object = object || {};
  $: value = key in object? object[key]: ''; 

  const setValue = () => {
    object[key] = value;
  }

</script>

<Card class="border-0">
  <CardHeader class="bg-transparent">Operating system</CardHeader>
  <CardBody>
  </CardBody>
</Card>
