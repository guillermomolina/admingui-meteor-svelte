<script>
  import objectPath from "object-path";
  import { getContext } from "svelte";
  import { key } from "../lib/key";
  import AutoErrorMessage from "./AutoErrorMessage.svelte";
  import { createEventDispatcher } from "svelte";
  import { clickOutside } from "../lib/helper";
  import { SimpleSchema_render } from "../lib/helper";

  const dispatch = createEventDispatcher();

  export let label;
  export let name;
  export let schema;

  const { form, handleChange } = getContext(key);
  const units = ["B", "kB", "MB", "GB", "TB"];

  let quantity, magnitude, unit, showPicker;

  // so that these change with props
  $: {
    value = objectPath.get($form, name);
    quantity = SimpleSchema_render(schema, name, value);
    exp = value == 0 ? 0 : Math.floor(Math.log(value) / Math.log(1024));
    magnitude = (value / Math.pow(1024, exp)).toFixed(2) * 1;
    unit = units[exp];
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
    <div class="relative">
      <div class="input-group">
        <input
          class="form-control"
          id={name}
          {name}
          value={quantity}
          on:change={handleChange}
          on:blur={handleChange}
        />
       <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            <i class="bi-input-cursor" />
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <form>
              <div class="input-group">
                <input
                  class="form-control"
                  value={magnitude}
                  type="number"
                  style="text-align: right;"
                  on:change={setMagnitude}
                />
                <select
                  class="form-control form-select"
                  value={unit}
                  on:blur={setUnit}
                >
                  {#each units as option}
                    <option value={option}>{option}</option>
                  {/each}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AutoErrorMessage {name} />
</div>
