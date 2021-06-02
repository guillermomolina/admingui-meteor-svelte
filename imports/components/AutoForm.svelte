<script>
  import { setContext } from "svelte";
  import { createForm } from "../lib/createForm";
  import { key } from "../lib/key";

  import AutoSubForm from "./AutoSubForm.svelte";

  export let initialValues = {};
  export let validate = null;
  export let schema;
  export let onSubmit = () => {
    throw new Error(
      "onSubmit is a required property in <Form /> when using the fallback context"
    );
  };
  export let context = createForm({
    initialValues,
    onSubmit,
    validate,
    schema,
  });
  const {
    form,
    errors,
    touched,
    state,
    handleChange,
    handleSubmit,
    updateField,
    updateInitialValues,
    updateTouched,
    updateValidateField,
    validateField,
  } = context;
  setContext(key, {
    form,
    errors,
    touched,
    state,
    handleChange,
    handleSubmit,
    updateField,
    updateInitialValues,
    updateTouched,
    updateValidateField,
    validateField,
  });
</script>

<form on:submit={handleSubmit} {...$$restProps}>
  <slot
    {form}
    {errors}
    {touched}
    {state}
    {handleChange}
    {handleSubmit}
    {updateField}
    {updateInitialValues}
    {updateTouched}
    {updateValidateField}
    {validateField}
  />

  <AutoSubForm tittle="Add" {schema}/>

  <button type="submit">submit</button>
</form>
