<script>
    import objectPath from "object-path";
    import { getContext } from "svelte";
    import { key } from "../lib/key";
    import AutoErrorMessage from "./AutoErrorMessage.svelte";

    export let label;
    export let name;
    export let type = "text";
    const { form, handleChange } = getContext(key);
    const id = [name, Date.now()].join("_");
</script>

<div class="row form-group">
    <label
        for={id}
        class="col-4 text-right"
        style="margin-top: 0.25rem; margin-bottom: 0.25rem"
    >
        {label}
    </label>
    <input
        class="col-8 form-control"
        {id}
        {name}
        {type}
        value={objectPath.get($form, name)}
        on:change={handleChange}
        on:blur={handleChange}
        {...$$props}
    />
    <AutoErrorMessage {name} />
</div>
