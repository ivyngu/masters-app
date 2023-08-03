"use strict";
/*
On startup of the website, this script will run & scrap HereNow event data to set up our own Firebase database.
*/
/*
import playwright from 'playwright'
import { submitEvent } from './db/dataQuery.js'

(async () => {
    
        const browser = await playwright.chromium.launch({headless: true});
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // using heat sheets page
        await page.goto('https://herenow.com/results/#/races/21140/heats');
        await page.waitForTimeout(5000); // wait for 5 seconds to load up
        
        // search for thurs data
        const thurs = await search(page);
        for (let i = 0; i < thurs.length; i++) {
            submitEvent(thurs[i]);
        }
        
        // fri data
        page.locator('button', { hasText: "Fri"}).click();
        await page.waitForTimeout(5000);
        const fri = await search(page);
        for (let i = 0; i < fri.length; i++) {
            submitEvent(fri[i]);
        }
    
        // sat data
        page.locator('button', { hasText: "Sat"}).click()
        await page.waitForTimeout(5000);
        const sat = await search(page);
        for (let i = 0; i < sat.length; i++) {
            submitEvent(sat[i]);
        }
    
        // sun data
        page.locator('button', { hasText: "Sun"}).click()
        await page.waitForTimeout(5000);
        const sun = await search(page)
        for (let i = 0; i < sun.length; i++) {
            submitEvent(sun[i]);
        }

        console.log("All events have been logged in the database.")
    
        await browser.close();
    })();

async function search(page: { locator: (arg0: string, arg1: { hasText: string; }) => any; }) {
    // locates all events with rf
    const rf = page.locator('tr.ng-scope', { hasText: "Riverfront Recapture, Inc."})
    let rfCount = await rf.count();
    
    const data = [] // stores all event info
    
    for (let i = 0; i < rfCount; i++) {
        let curr = rf.nth(i);
        const code = await curr.locator("td > span.flightCode").innerText();
        const timeTemp = await curr.locator("td > span.flightTime").innerText();
        const time = timeTemp.split(" ");
        const name = await curr.locator("td > span.flightName").innerText();
        
        const lanes = [];
        const boats = await curr.locator("td.ng-scope");
        
        for (let i = 0; i < 8; i++) {
            let curr = boats.nth(i);
            const teams = await curr.locator("div").allTextContents();
            const team = teams[0].trim();
            if (team.includes("Riverfront Recapture, Inc.")) {
                lanes.push(i + 1);
            }
        }
        
        for (let i = 0; i < lanes.length; i++) {
            const lane = lanes[i];
            data.push([ time[0], time[1], code, name, lane ]);
        }
        
    }
    return data;
}*/ 
//# sourceMappingURL=hooks.server.js.map