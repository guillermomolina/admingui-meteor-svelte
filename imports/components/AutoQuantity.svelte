<script>
  import objectPath from "object-path";
  import { getContext } from "svelte";
  import { key } from "../lib/key";
  import AutoErrorMessage from "./AutoErrorMessage.svelte";
  import { createEventDispatcher } from "svelte";
  import { SimpleSchema_getFieldType } from "../lib/helper";
import { Unit } from "../lib/quantity";

  const dispatch = createEventDispatcher();

  export let label;
  export let name;
  export let schema;

  const { form, handleChange } = getContext(key);
  const type = Quantity.getType(SimpleSchema_getFieldType(schema, name));

  let quantity;

  // so that these change with props
  $: {
    value = objectPath.get($form, name);
    quantity = new type(value);
  }

  // handlers
  const onFocus = () => {
    showPicker = true;
  };

  const onBlur = () => {
    showPicker = false;
  };

  const onDateChange = (d) => {
    showPicker = false;
    dispatch("quantitychange", d.detail);
  };

  const setMagnitude = () => {};
  const setUnit = () => {};
</script>

<div class="row mb-3">
  <label for={name} class="col-sm-4 col-form-label" style="text-align: right;">
    {label}
  </label>
  <div class="col-sm-8">
    <div class="input-group">
      <input
        class="form-control flex-fill"
        value={quantity.getMagnitude()}
        type="number"
        style="text-align: right;"
        on:change={setMagnitude}
      />
      <select class="form-control form-select flex-column col-1" value={quantity.getScaledPrefix()} on:blur={setUnit} style="max-width: 33%;">
        {#each quantity.Unit.prefixes as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>
  <AutoErrorMessage {name} />
</div>
