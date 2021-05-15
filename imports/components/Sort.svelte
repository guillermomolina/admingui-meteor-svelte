<script context="module">
  let globalLabels;

  export function setLabels(labels) {
    globalLabels = labels;
  }
</script>

<script>
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  const stateContext = getContext("state");

  export let dir = 0;
  export let key;
  export let labels = {
    asc: { title: "Ascending", icon: "fa-sort-up" },
    desc: { title: "Desceding", icon: "fa-sort-down" },
    unsorted: { title: "Unsorted", icon: "fa-sort" },
    ...globalLabels
  };

  function onClick(event) {
    const state = stateContext.getState();
    let rows;

    const detail = {
      originalEvent: event,
      key,
      dir: dir !== 1 ? 1 : -1,
      rows: state.filteredRows
    };

    dispatch("sort", detail);

    if (detail.preventDefault !== true) {
      dir = detail.dir;
    }
    stateContext.setRows(detail.rows);
  }
</script>

<span class="sort" on:click={onClick}>
  {#if dir == 1}
    <span title={labels.asc.title}>
      <i class="fas {labels.asc.icon}" />
    </span>
  {:else if dir == -1}
    <span title={labels.desc.title}>
      <i class="fas {labels.desc.icon}" />
    </span>
  {:else}
    <span title={labels.unsorted.title}>
      <i class="fas {labels.unsorted.icon}" />
    </span>
  {/if}
</span>
