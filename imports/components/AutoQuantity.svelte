<script>
  import { createEventDispatcher } from "svelte";
  import { clickOutside } from "../lib/helper";

  const dispatch = createEventDispatcher();

  export let value = 0;

  let quantity, magnitude, unit, showPicker;

  // so that these change with props
  $: {
    quantity = 0;
    magnitude = 0;
    unit = "B";
  }

  const units = ["B", "kB", "MB", "GB", "TB"];

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

<input class="form-control" type="date" />

<div class="relative">
  <div class="input-group">
    <input class="form-control" value={quantity} />
      <button class="btn btn-secondary" on:click={onFocus}>
        <i class="bi-input-cursor" />
      </button>    
  </div>

  {#if showPicker}
    <div class="box" use:clickOutside on:click_outside={onBlur}>
      <div class="input-group col-8" style="padding: 0">
        <input
          class="form-control"
          value={magnitude}
          type="number"
          style="text-align: right;"
          on:change={setMagnitude}
        />
          <select
            class="form-control form-select"
            bind:value={unit}
            on:blur={setUnit}
          >
            {#each units as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
      </div>
    </div>
  {/if}
</div>

<style>
  .relative {
    position: relative;
  }
  .box {
    position: absolute;
    top: 40px;
    left: 0px;
    border: 5px solid green;
    display: inline-block;
  }
</style>
