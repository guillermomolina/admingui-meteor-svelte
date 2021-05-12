<script>
    import {
        FormGroup,
        Input,
        InputGroup,
        InputGroupAddon,
        Label,
    } from 'sveltestrap';

    const units = ['B', 'kB', 'MB', 'GB', 'TB'];

    export let schema;
    export let key;
    export let object;
    $: value = key in object? object[key]: 0; 
    $: exp = Math.floor(Math.log(value) / Math.log(1024));
    $: number = (value / Math.pow(1024, exp)).toFixed(2) * 1;
    $: unit = units[exp];

    const setValue = () => {
       new_exp = units.indexOf(unit);
       object[key] = number * Math.pow(1024, new_exp);
    }

    const setUnit = (event) => {
        new_exp = units.indexOf(event.target.value);
        object[key] = number * Math.pow(1024, new_exp);
    }
</script>


<FormGroup row>
    <Label
        class='col-sm-2 text-right'
        style='margin-top: 0.25rem; margin-bottom: 0.25rem'
    >
        {schema.label(key)}
    </Label>
    <InputGroup class='col-sm-10' style='padding: 0'>
        <Input bind:value={number} type='number' on:change={setValue}/>
        <InputGroupAddon addonType='append'>
            <Input bind:value={unit}  type='select'  on:change={setUnit}>
                {#each units as option}
                    <option value={option}>{option}</option>
                {/each}
            </Input>
        </InputGroupAddon>
    </InputGroup>
</FormGroup>
