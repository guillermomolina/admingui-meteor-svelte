<script>
    import { beforeUpdate } from "svelte";

    const units = ['B', 'kB', 'MB', 'GB', 'TB'];

    export let schema;
    export let key;
    export let object;
    export let id = [key, Date.now()].join('_');

    object = object || {};

    $: value = key in object? object[key]: 0; 
    $: exp = Math.floor(Math.log(value) / Math.log(1024)) | 0;
    $: number = (value / Math.pow(1024, exp)).toFixed(2) * 1;
    $: unit = units[exp];

    const setValue = () => {
       new_exp = units.indexOf(unit);
       object[key] = number * Math.pow(1024, new_exp);
       console.log(object[key]);
    }

    const setUnit = (event) => {
        new_exp = units.indexOf(event.target.value);
        object[key] = number * Math.pow(1024, new_exp);
    }


</script>


<div class='row form-group' >
    <label
        for={id}
        class='col-4 text-right'
        style='margin-top: 0.25rem; margin-bottom: 0.25rem'
    >{ schema.label(key) }</label>
    <div {id} class='input-group col-8' style='padding: 0'>
        <input class='form-control' bind:value={number} type='number' on:change={setValue}/>
        <div class='input-group-append'>
            <select class='form-control' bind:value={unit}  type='select'  on:blur={setUnit}>
                {#each units as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
