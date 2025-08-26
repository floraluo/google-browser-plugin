const { join } = require("path")

const groups = {
  // xuecheng: {
  //   name: '学城',
  //   url: [
  //     'https://km.sankuai.com/*',
  //     'https://km.sankuai.com/page/*'
  //   ]
  // }, 
  // talos: {
  //   name: 'talos',
  //   url: [
  //     'https://talos.sankuai.com/*'
  //   ]
  // },
  // mbr_config: {
  //   name: 'MBR配置后台',
  //   url: [
  //     'http://localhost:5555/*',
  //     'https://mdata.sankuai.com/xbr/manage/*',
  //     'https://mdata.sjst.st.sankuai.com/xbr/manage/*',
  //     'https://mdata.sjst.test.sankuai.com/xbr/manage/*',
  //     'https://1960-lnruv-sl-mdata.sjst.test.sankuai.com/xbr/manage/*',
  //     'https://1960-fkork-sl-mdata.sjst.test.sankuai.com/xbr/manage/*',
  //     'https://1960-flfin-sl-mdata.sjst.test.sankuai.com/xbr/manage/*',
  //   ]
  // },
  // mbt_runtime: {
  //   name: 'MBR前台',
  //   url: [
  //     'https://.*mdata.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //     'https://mdata.sjst.st.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //     'https://mdata.sjst.test.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //     'https://1960-lnruv-sl-mdata.sjst.test.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //     'https://1960-fkork-sl-mdata.sjst.test.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //     'https://1960-flfin-sl-mdata.sjst.test.sankuai.com/steamer/steamer-mbr-config-pages/*',
  //   ]
  // },
  juejin: {
    name: '掘金',
    url: [
      'https://juejin.cn/*',
    ]
  },
  taobao: {
    name: '淘宝',
    url: [
      'https://.*.taobao.com/*',
      'https://.*.tmall.com/*',
      'https://.*.alicdn.com/*',
      'https://.*.1688.com/*',
      'https://.*.taobao.com/market/*',
      'https://.*.tmall.com/market/*',
      'https://.*.alicdn.com/market/*',
    ]
  },
  github: {
    name: 'Github',
    url: [
      'https://github.com/*',
      'https://gist.github.com/*',
    ]
  },
}
// 自动设置当前窗口地址
await chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, async (tabs) => {
  const url = tabs[0].url
  const { origin } = new URL(url)
  document.querySelector('#groupUrl').value = origin + '/*'
  await setSameOriginList(origin + '/*')
})
// 列出当前窗口同域名的其他页面
async function setSameOriginList(url) {
  const liTemplate = document.getElementById('li_template');
  const sameOriginTabs = await chrome.tabs.query({
    url: [url]
  })
  const liElements = new Set();
  for (const tab of sameOriginTabs) {
    const liElement = liTemplate.content.firstElementChild.cloneNode(true);
    const title = tab.title.trim();

    liElement.querySelector('.title').textContent = title;
    liElement.querySelector('.pathname').textContent = new URL(tab.url).pathname;
    liElement.querySelector('a').addEventListener('click', async () => {
      // need to focus window as well as the active tab
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
    });

    liElements.add(liElement);
  }
  document.querySelector('ul').append(...liElements);
}
const handleBtnClick = async (e) => {
  const id = e.target.id
  if (e.target.tagName === 'BUTTON') {
    let url
    let name
    if (id === 'customGroup') {
      const groupName = document.querySelector('#groupName').value
      const groupUrl = document.querySelector('#groupUrl').value
      if (!groupName || !groupUrl) return
      url = groupUrl.split(',')
      name = groupName
    } else {
      url = groups[id].url
      name = groups[id].name
    }
    const tabs = await chrome.tabs.query({
      url
    });
    const tabIds = tabs.map(({ id }) => id);
    if (tabIds.length) {
      const tabGroup = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(tabGroup, { title: name });
    }
  }
}
const buttonContainer = document.querySelector('.button-container');
const customGroup = document.querySelector('#customGroup');

buttonContainer.addEventListener('click', handleBtnClick);
customGroup.addEventListener('click', handleBtnClick);