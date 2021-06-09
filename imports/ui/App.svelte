<script>
    import { Meteor } from "meteor/meteor";
    import { Styles } from 'sveltestrap';

    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    // import NodesPage from "./HostPage.svelte";
    import NodesPage from "./Test.svelte";
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

<Styles />

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="app">
    {#if user}
        <div class="main">
            <!-- <div class="user" on:click={logout}>
                {user.username} 🚪
            </div> -->

            <Header {segment} {color} {title} />
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
