<script>
    const unit_name = 'Hz';
    const exp_names = ['', 'k', 'M', 'G', 'T'];
    const units = ['Hz', 'kHz', 'MHz', 'GHz', 'THz'];
    const multiplier = 1024;

    export let schema;
    export let key;
    export let value = 0;
    export let id = [key, Date.now()].join('_');

    $: exp = Math.floor(Math.log(value) / Math.log(multiplier)) | 0;
    $: number = (value / Math.pow(multiplier, exp)).toFixed(2) * 1;
    $: unit = units[exp];

    const setValue = () => {
       new_exp = units.indexOf(unit);
       value = number * Math.pow(multiplier, new_exp);
    }

    const setUnit = (event) => {
        new_exp = units.indexOf(event.target.value);
        value = number * Math.pow(multiplier, new_exp);
    }
</script>


<div class='row form-group' >
    <label
        for={id}
        class='col-4 text-right'
        style='margin-top: 0.25rem; margin-bottom: 0.25rem'
    >
    { schema.label(key) }
    </label>
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
