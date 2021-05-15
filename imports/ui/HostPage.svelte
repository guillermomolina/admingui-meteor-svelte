<script>
  import { Col, Container, Row } from "sveltestrap";
  import HostTable from "./HostTable.svelte";
  import HostForm from "./HostForm.svelte";

  let host_name = "";
</script>

<Container fluid>
  <Row>
    <Col lg="8"><HostTable bind:host_name /></Col>
    <Col lg="4"><HostForm {host_name} /></Col>
  </Row>
</Container>
