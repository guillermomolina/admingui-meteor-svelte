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

  export let filter = (row, text, index) => {
    text = text.toLowerCase();
    for (let i in row) {
      if (
        row[i]
          .toString()
          .toLowerCase()
          .indexOf(text) > -1
      ) {
        return true;
      }
    }
    return false;
  };
  export let index = -1;
  export let text = "";

  export let labels = {
    placeholder: "Search",
    ...globalLabels
  };

  async function onSearch(event) {
    const state = stateContext.getState();
    const detail = {
      originalEvent: event,
      filter,
      index,
      text,
      page: state.page,
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      rows: state.filteredRows
    };
    dispatch("search", detail);

    if (detail.preventDefault !== true) {
      if (detail.text.length === 0) {
        stateContext.setRows(state.rows);
      } else {
        stateContext.setRows(
          detail.rows.filter(r => detail.filter(r, detail.text, index))
        );
      }
      stateContext.setPage(0, 0);
    } else {
      stateContext.setRows(detail.rows);
    }
  }
</script>

<div class="search float-md-end" style="margin-bottom: 1rem">
  <input
    class="form-control"
    type="search"
    aria-label={labels.placeholder}
    title={labels.placeholder}
    placeholder={labels.placeholder}
    bind:value={text}
    on:keyup={onSearch} />
</div>
