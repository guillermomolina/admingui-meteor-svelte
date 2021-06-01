<script>
    import {
        Navbar,
        NavbarBrand,
        Nav,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        ListGroup,
        Form,
        InputGroup,
        Input,
        Button,
        Icon
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
                <Button color="primary" on:click={searchHandle}>
                    <Icon name="search" />
                </Button>
            </InputGroup>
        </Form>
        <ListGroup class="ml-auto ml-md-0">
            <Dropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <Icon name="person" />
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
            </Dropdown>
        </ListGroup>
    </Nav>
</Navbar>
