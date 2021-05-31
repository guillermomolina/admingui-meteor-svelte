<script>
    import { Meteor } from "meteor/meteor";

    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import NodesPage from "./HostPage.svelte";
    import LoginForm from "./LoginForm.svelte";

    let user = null;
    let segment = "nodes";

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
                        <NodesPage />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    {:else}
        <LoginForm />
    {/if}
</div>
