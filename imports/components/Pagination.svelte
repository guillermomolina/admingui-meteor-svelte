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

  export let buttons = [-2, -1, 0, 1, 2];
  export let count;
  export let page = 0;
  export let pageSize;
  export let serverSide = false;

  export let labels = {
    first: "First",
    last: "Last",
    next: "Next",
    previous: "Previous",
    ...globalLabels,
  };

  $: pageCount = Math.floor(count / pageSize);

  function onChange(event, page) {
    const state = stateContext.getState();
    const detail = {
      originalEvent: event,
      page,
      pageIndex: serverSide ? 0 : page * state.pageSize,
      pageSize: state.pageSize,
    };
    dispatch("pageChange", detail);

    if (detail.preventDefault !== true) {
      stateContext.setPage(detail.page, detail.pageIndex);
    }
  }
</script>

<div class="btn-group float-md-right" role="group" aria-label="Pagination">
  <button
    class="btn btn-outline-secondary"
    disabled={page === 0}
    on:click={(e) => onChange(e, 0)}
  >
    <i class="bi-chevron-bar-left" />
  </button>
  <button
    class="btn btn-outline-secondary"
    disabled={page === 0}
    on:click={(e) => onChange(e, page - 1)}
  >
  <i class="bi-chevron-left" />
</button>
  {#each buttons as button}
    {#if page + button >= 0 && page + button <= pageCount}
      <button
        class="btn btn-outline-secondary"
        class:active={page === page + button}
        on:click={(e) => onChange(e, page + button)}
      >
        {page + button + 1}
      </button>
    {/if}
  {/each}
  <button
    class="btn btn-outline-secondary"
    disabled={page > pageCount - 1}
    on:click={(e) => onChange(e, page + 1)}
  >
  <i class="bi-chevron-right" />
</button>
  <button
    class="btn btn-outline-secondary"
    disabled={page >= pageCount}
    on:click={(e) => onChange(e, pageCount)}
  >
  <i class="bi-chevron-bar-right" />
</button>
</div>
