<script>
    import objectPath from "object-path";
    import { FormGroup, Input, Label } from "sveltestrap";
    import { getContext } from "svelte";
    import { key } from "../lib/key";
    import AutoErrorMessage from "./AutoErrorMessage.svelte";
    import { SimpleSchema_render } from "../lib/helper";

    export let label;
    export let name;
    export let schema;
    export let type = "text";
    const { form, handleChange } = getContext(key);
</script>

<div class="row mb-3">
    <label for={name} class="col-sm-4 col-form-label" style="text-align: right;">
        {label}
    </label>
    <div class="col-sm-8">
        <input
            class="form-control"
            id={name}
            {name}
            {type}
            value={SimpleSchema_render(schema, name, objectPath.get($form, name))}
            on:change={handleChange}
            on:blur={handleChange}
        />
    </div>
    <AutoErrorMessage {name} />
</div>


<!-- <div class="row mb-3">
    <label for={name} class="col-sm-4 col-form-label" style="text-align: right;">
        {label}
    </label>
    <div class="col-sm-8">
        <input
            class="form-control"
            id={name}
            {name}
            {type}
            value={objectPath.get($form, name) || ''}
            on:change={handleChange}
            on:blur={handleChange}
        />
    </div>
    <AutoErrorMessage {name} />
</div> -->
