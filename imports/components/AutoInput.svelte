<script>
    import objectPath from "object-path";
    import { getContext } from "svelte";
    import { FormGroup, Input, Label } from 'sveltestrap';
    import { key } from "../lib/key";
    import AutoErrorMessage from "./AutoErrorMessage.svelte";

    export let label;
    export let name;
    export let type = "text";
    const { form, handleChange } = getContext(key);
    const id = [name, Date.now()].join("_");
</script>

<div class="form-group">
    <label
        for={id}
        class="text-right"
        style="margin-top: 0.25rem; margin-bottom: 0.25rem"
    >
        {label}
    </label>
    <input
        class="form-control"
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

<FormGroup>
    <Label>Type here</Label>
    <Input type="text" value={objectPath.get($form, name)} />
</FormGroup>