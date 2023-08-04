<script>
    import { Tabs, TabItem } from 'flowbite-svelte';
    import { Thursday, Friday, Saturday, Sunday } from '../db/dataQuery.js'
    import EventCards from '../components/EventCards.svelte';
	import UserNavBar from '../components/UserNavBar.svelte';
	import SearchBar from '../components/SearchBar.svelte';
  
    let tCards = Thursday;
    let fCards = Friday;
    let sCards = Saturday;
    let suCards = Sunday;

  </script>

  <UserNavBar></UserNavBar>
  <Tabs style="underline">
    <TabItem title="Search">
        <SearchBar></SearchBar>
    </TabItem>
    <TabItem open title="Thursday">
        <EventCards bind:cards={tCards}/>  
    </TabItem>
    <TabItem title="Friday">
        <EventCards bind:cards={fCards}/>  
    </TabItem>
    <TabItem title="Saturday">
        <EventCards bind:cards={sCards}/>  
    </TabItem>
    <TabItem title="Sunday">
        <EventCards bind:cards={suCards}/>  
    </TabItem>
    <TabItem title="Results"></TabItem>
  </Tabs>
  