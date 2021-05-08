<script>
    import { Meteor } from "meteor/meteor";
    import { Container } from "sveltestrap";

    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Footer from "./Footer.svelte";
    import ServersPage from "./ServersPage.svelte";
    import LoginForm from "./LoginForm.svelte";

    let user = null;
    let segment = "servers";

    let theme = "dark";
    let color = "dark";
    let title = "Admin GUI";

    $m: {
        Meteor.loginWithPassword("user", "password");
        user = Meteor.user();
    }

    const logout = () => Meteor.logout();
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="app">
    {#if user}
        <div class="main">
            <!-- <div class="user" on:click={logout}>
                {user.username} 🚪
            </div> -->

            <Navbar {segment} {color} {title} />
            <div id="layoutSidenav">
                <!-- <Sidebar {segment} {theme} /> -->
                <div id="layoutSidenav_content">
                    <main>
                        <Container fluid={true}>
                            <ServersPage />
                        </Container>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    {:else}
        <LoginForm />
    {/if}
</div>
