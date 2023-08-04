<!-- Coach Admin -->

<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
    import rriLogo from "./../images/rri.png";

</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img
        src={rriLogo}
        class="mr-3 h-6 sm:h-9"
        alt="Riverfront Recapture Logo"
        />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Riverfront Recapture
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="lineup">Lineups</NavLi>
        <NavLi href="data">Data Input</NavLi>
        <NavLi href="/" active={true}>Back to User Home</NavLi>
    </NavUl>
</Navbar>
