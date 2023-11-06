
const groups = [{
  name: '学城',
  url: [
    'https://km.sankuai.com/*',
    'https://km.sankuai.com/page/*'
    // 'https://developer.chrome.com/docs/webstore/*',
    // 'https://developer.chrome.com/docs/extensions/*'
    // 'https://mdata.sjst.st.sankuai.com/xbr/',
    
  ]
}, {
  name: 'talos',
  url: [
    'https://talos.sankuai.com/*'
  ]
}]
const tabTemplate = document.getElementById('tab_template'); 
const tabTitleTemplate = document.getElementById('tab_title_template'); 
const liTemplate = document.getElementById('li_template');
const tabElements = new Set();
const tabTitleElements = new Set();
groups.forEach(async(group, index) => {
// for (const group of groups) {
  const tabs = await chrome.tabs.query({
    url: group.url
  });
  const liElements = new Set();
  for (const tab of tabs) {
    const liElement = liTemplate.content.firstElementChild.cloneNode(true);
    const title = tab.title.split('-')[0].trim();

    liElement.querySelector('.title').textContent = title;
    liElement.querySelector('.pathname').textContent = new URL(tab.url).pathname;
    liElement.querySelector('a').addEventListener('click', async () => {
      // need to focus window as well as the active tab
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
    });

    liElements.add(liElement);
  }
  const tabElement = tabTemplate.content.firstElementChild.cloneNode(true) //  标签页内容
  const tabTitleElement = tabTitleTemplate.content.firstElementChild.cloneNode(true) // 标签页标题

  tabElement.querySelector('ul').append(...liElements);
  tabTitleElement.querySelector('span').textContent = group.name

  if (index === 0) {
    tabElement.querySelector('.tab').style.display = 'block'
    tabTitleElement.querySelector('.group-name').style.color = '#f00'
  }
  tabElements.add(tabElement)
  tabTitleElements.add(tabTitleElement)

  const button = document.querySelector('button');
  button.addEventListener('click', async () => {
    const tabIds = tabs.map(({ id }) => id);
    if (tabIds.length) {
      const tabGroup = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(tabGroup, { title: group.name });
    }
  });
})
document.querySelector('.tabs').append(...tabElements);
document.querySelector('.tab-title-container').append(...tabTitleElements);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
// const collator = new Intl.Collator();
// tabs.sort((a, b) => collator.compare(a.title, b.title));
