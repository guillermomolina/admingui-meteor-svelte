<script context="module">
  import Pagination, {
    setLabels as _setPaginationLabels
  } from "./Pagination.svelte";
  import Search, { setLabels as _setSearchLabels } from "./Search.svelte";
  import Sort, { setLabels as _setSortLabels } from "./Sort.svelte";
  export { Pagination, Search, Sort };

  let globalLabels;

  export function setTableLabels(labels) {
    globalLabels = labels;
  }

  export const setPaginationLabels = _setPaginationLabels;
  export const setSearchLabels = _setSearchLabels;
  export const setSortLabels = _setSortLabels;
</script>

<script>
  import { createEventDispatcher, setContext } from "svelte";
  const dispatch = createEventDispatcher();

  export let loading = false;
  export let page = 0;
  export let pageIndex = 0;
  export let pageSize = 10;
  export let responsive = true;
  export let totalRowsCount = 1;
  export let rows;
  export let serverSide = false;
  export let labels = {
    empty: "No records available",
    loading: "Loading data",
    ...globalLabels
  };

  $: filteredRows = rows;
  $: visibleRows = filteredRows.slice(pageIndex, pageIndex + pageSize);
  $: count = serverSide? totalRowsCount - 1: filteredRows.length - 1

  setContext("state", {
    getState: () => ({
      page,
      pageIndex,
      pageSize,
      rows,
      filteredRows
    }),
    setPage: (_page, _pageIndex) => {
      page = _page;
      pageIndex = _pageIndex;
    },
    setRows: _rows => (filteredRows = _rows)
  });

  function onPageChange(event) {
    dispatch("pageChange", event.detail);
  }

  function onSearch(event) {
    dispatch("search", event.detail);
  }
</script>

<slot name="top">
  <div class="slot-top">
    <svelte:component this={Search} on:search={onSearch} />
  </div>
</slot>

<table class={'table ' + $$props.class} class:responsive>
  <slot name="head" />
  {#if loading}
    <tbody>
      <tr>
        <td class="center" colspan="100%">
          <span>
            {@html labels.loading}
          </span>
        </td>
      </tr>
    </tbody>
  {:else if visibleRows.length === 0}
    <tbody>
      <tr>
        <td class="center" colspan="100%">
          <span>
            {@html labels.empty}
          </span>
        </td>
      </tr>
    </tbody>
  {:else}
    <slot rows={visibleRows} />
  {/if}
  <slot name="foot" />
</table>

<slot name="bottom">
  <div class="slot-bottom">
    <svelte:component
      this={Pagination}
      {page}
      {pageSize}
      {serverSide}
      {count}
      on:pageChange={onPageChange} />
  </div>
</slot>
