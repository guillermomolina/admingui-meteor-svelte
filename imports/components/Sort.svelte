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
    asc: { title: "Ascending", html: "&#8593;" },
    desc: { title: "Desceding", html: "&#8595;" },
    unsorted: { title: "Unsorted", html: "&#8645;" },
    ...globalLabels
  };

  function onClick(event) {
    const state = stateContext.getState();
    let rows;

    const detail = {
      originalEvent: event,
      key,
      dir: dir !== -1 ? -1 : 1,
      rows: state.filteredRows
    };

    dispatch("sort", detail);

    if (detail.preventDefault !== true) {
      dir = detail.dir;
    }
    stateContext.setRows(detail.rows);
  }
</script>

<style>
  .sort {
    right: 0;
    cursor: pointer;
    position: absolute;
    padding: 0 0.25em;
    color: #999;
  }
</style>

<span class="sort" on:click={onClick}>
  {#if dir == 1}
    <span title={labels.asc.title}>
      {@html labels.asc.html}
    </span>
  {:else if dir == -1}
    <span title={labels.desc.title}>
      {@html labels.desc.html}
    </span>
  {:else}
    <span title={labels.unsorted.title}>
      {@html labels.unsorted.html}
    </span>
  {/if}
</span>
