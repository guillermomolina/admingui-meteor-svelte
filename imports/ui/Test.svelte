<script>
    import AutoQuantity from "../components/AutoQuantity.svelte";
  
    let currentQuantity = 0;
  
    const onQuantityChange = d => {
      currentDate = d.detail;
    };
  </script>  

  <h1>svelte-dates</h1>
  <AutoQuantity
    on:quantitychange={onQuantityChange}
    value={currentQuantity}/>