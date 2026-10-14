import {test,expect} from '@playwright/test';

test('showcase works without an API and displays real catalog counts',async({page})=>{
 const apis:string[]=[];page.on('request',r=>{if(r.url().includes('/api/'))apis.push(r.url())});
 await page.goto('./');
 await expect(page.locator('.college-masthead').getByText('Panimalar Engineering College',{exact:true})).toBeVisible();
 expect(await page.locator('.college-masthead img').evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBeTruthy();
 await expect(page.locator('.problem-card')).toHaveCount(7);
 await expect(page.locator('.stat').filter({hasText:'Faculty profiles'}).locator('strong')).toHaveText('29');
 await expect(page.locator('.stat').filter({hasText:'Source-linked topics'}).locator('strong')).toHaveText('7');
 expect(apis).toEqual([]);
 await expect(page.getByRole('button',{name:/Sign in|Create account|Research teams/})).toHaveCount(0);
 expect(await page.locator('body').innerText()).not.toMatch(/\bdemo\b|fictional|AIML NBA\.xlsx/gi);
 expect(await page.locator('h1').evaluate(el=>getComputedStyle(el).cursor)).toBe('default');
 expect(await page.getByRole('searchbox',{name:'Search research topics'}).evaluate(el=>getComputedStyle(el).cursor)).toBe('text');
 await page.screenshot({path:'docs/screenshots/showcase-desktop.png',fullPage:true});
});

test('faculty is available offline and specialization links open research details',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Department faculty',exact:true}).click();
 await expect(page.locator('.faculty-card')).toHaveCount(29);
 const hod=page.locator('.faculty-card').filter({hasText:'Dr. Suresh G'});
 await expect(hod.getByText('Head of Department',{exact:true})).toBeVisible();
 await page.getByPlaceholder('Search by name, designation, or specialization').fill('Suresh');
 await expect(page.locator('.faculty-card')).toHaveCount(1);
 await hod.getByText('Explore related research',{exact:true}).click();
 await hod.getByRole('button',{name:/Recognising phishing websites/}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('button',{name:'Faculty connections',exact:true}).click();
 await expect(page.locator('.connection-list').getByRole('heading',{name:'Dr. Suresh G'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('catalog search, filters and empty-state recovery',async({page})=>{
 await page.goto('./');
 const search=page.getByRole('searchbox',{name:'Search research topics'});
 await search.fill('phishing');await expect(page.locator('.problem-card')).toHaveCount(1);
 await page.getByRole('button',{name:'Clear search',exact:true}).click();
 await page.getByRole('button',{name:'Agriculture',exact:true}).click();
 await expect(page.locator('.problem-card')).toHaveCount(1);
 await page.getByRole('button',{name:'All subjects',exact:true}).click();
 await page.getByRole('combobox',{name:'Experience level'}).selectOption('Beginner');
 await expect(page.locator('.problem-card')).toHaveCount(3);
 await search.fill('zzzznoresults');await expect(page.getByRole('heading',{name:'No topics match these filters.'})).toBeVisible();
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();await expect(page.locator('.problem-card')).toHaveCount(7);
});

test('saved topics, plan checklist and notes survive refresh and can be downloaded',async({page})=>{
 await page.goto('./');
 const first=page.locator('.problem-card').first();
 await first.locator('.bookmark-button').click();
 await page.getByRole('button',{name:/^Saved topics/}).click();await expect(page.locator('.problem-card')).toHaveCount(1);
 await page.locator('.card-title').click();
 await page.getByRole('button',{name:'Build a research plan',exact:true}).click();
 await page.locator('.plan-checklist input').first().check();
 await page.getByLabel('Research notes').fill('Investigate whether the baseline generalizes across categories.');
 await expect(page.getByText('1 of 5 steps checked')).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download research plan'}).click();
 expect((await download).suggestedFilename()).toMatch(/research-plan\.md$/);
 await page.reload();await page.getByRole('button',{name:/^Saved topics/}).click();await page.locator('.card-title').click();
 await page.getByRole('button',{name:'Build a research plan',exact:true}).click();
 await expect(page.getByLabel('Research notes')).toHaveValue('Investigate whether the baseline generalizes across categories.');
 await expect(page.locator('.plan-checklist input').first()).toBeChecked();
});

test('overview charts contain actual counts and export a summary',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Research overview',exact:true}).click();
 await expect(page.locator('.insight-metrics article').nth(0).locator('strong')).toHaveText('29');
 await expect(page.locator('.insight-metrics article').nth(1).locator('strong')).toHaveText('7');
 await expect(page.locator('.insight-metrics article').nth(3).locator('strong')).toHaveText('100%');
 await expect(page.locator('.recharts-surface').first()).toBeVisible();
 await expect(page.locator('.recharts-pie-sector')).toHaveCount(4);
 await expect(page.locator('.recharts-bar-rectangle').first()).toBeVisible();
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download summary'}).click();
 expect((await download).suggestedFilename()).toBe('research-nexus-overview.csv');
 await page.screenshot({path:'docs/screenshots/showcase-overview.png',fullPage:true});
});

test('mobile navigation, help and layout',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('./');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('button',{name:'Toggle navigation'}).click();await page.getByRole('button',{name:'Department faculty',exact:true}).click();
 await expect(page.locator('.faculty-card')).toHaveCount(29);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('button',{name:'Getting started',exact:true}).click();
 await expect(page.getByRole('dialog',{name:'Getting started'})).toBeVisible();
 await page.getByRole('button',{name:'Close getting-started guide'}).click();
 await page.getByRole('button',{name:'Toggle navigation'}).click();await page.getByRole('button',{name:'Research catalog',exact:true}).click();
 await expect(page.locator('.sidebar')).not.toBeInViewport();
 await page.screenshot({path:'docs/screenshots/showcase-mobile.png',fullPage:true});
});
