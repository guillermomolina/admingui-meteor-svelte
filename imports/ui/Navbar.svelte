<script>
    import {
        Navbar,
        NavbarBrand,
        Nav,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        ListGroup,
        Form,
        InputGroup,
        InputGroupAddon,
        Input,
        Button,
    } from "sveltestrap";

    export let segment;
    export let color;
    export let title;

    function searchHandle() {
        event.preventDefault();
    }
</script>

<Navbar class="navbar-expand" {color} dark expand="md">
    <NavbarBrand href=".">{title}</NavbarBrand>
    <Nav class="ml-auto" navbar>
        <Form inline>
            <InputGroup>
                <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="Search for..."
                />
                <InputGroupAddon addonType={"append"}>
                    <Button color="primary" on:click={searchHandle}>
                        <i class="fas fa-search" />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
        <ListGroup class="ml-auto ml-md-0">
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <i class="fas fa-user fa-fw ml-3" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <a class="dropdown-item" href="settings">Settings</a>
                    </DropdownItem>
                    <DropdownItem>
                        <a class="dropdown-item" href="activity_log"
                            >Activity Log</a
                        >
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <a
                            class="dropdown-item"
                            href="pages/authentication/login"
                        >
                            Logout
                        </a>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </ListGroup>
    </Nav>
</Navbar>
