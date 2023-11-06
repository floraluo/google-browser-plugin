# chrome扩展插件

## 谷歌插件的作用和重要性

谷歌插件是一种强大的工具，可以扩展浏览器的功能，提供定制化的体验。它们可以为用户提供各种增强功能，如广告拦截、网页翻译、密码管理等。它通过增加附加组件的方式，使用户能够根据个人需求自定义浏览器的功能，从而提高工作效率和用户体验。对于开发者来说，插件是实现创意和解决问题的理想平台。插件不仅能够为用户提供有用的工具，还可以为开发者带来商业机会和社区认可。

个性化定制：谷歌插件为用户提供了个性化定制浏览器的能力。无论是更改主题、添加快捷方式，还是调整布局，用户可以根据自己的喜好和需求对浏览器进行定制，使其更符合个人的使用习惯和风格。

增强功能：谷歌插件为浏览器增加了各种功能和工具。用户可以通过安装插件来拓展浏览器的能力，例如广告拦截器、翻译工具、密码管理器、截图工具等。这些插件大大提高了浏览器的实用性和功能性，使用户能够更高效地完成各种任务。

提升效率：谷歌插件可以帮助用户提高工作和学习效率。例如，时间管理插件可以帮助用户管理时间、设置提醒；笔记插件可以帮助用户快速记录灵感和重要信息；待办事项插件可以帮助用户进行任务管理和提醒等。这些插件的存在使得用户能够更好地组织自己的工作和学习，提高生产力。

根据功能和使用方式的不同，也可以将Google插件分为多种类型，例如：

浏览器操作类插件：如广告拦截器、密码管理器等，主要用于增强用户对浏览器的控制能力；

网页修改类插件：如用户样式表、网页字体修改器等，主要用于改变网页的外观和布局；

其他类型：如翻译软件、天气预报插件等。

它们能够个性化定制浏览器、增强功能、提升效率，并且通过开发者社区促进插件开发的创新和进步。谷歌插件不仅提升了用户的浏览体验，还为开发者提供了一个创造和分享自己工具的平台。通过使用和探索谷歌插件，我们可以充分发挥浏览器的潜力，提高工作效率和生活品质。

## 插件结构

谷歌插件的内部机制是通过一系列的文件和目录来实现的，一个Google插件通常由以下组成部分组成：

清单文件（Manifest）：清单文件是插件的核心，它定义了插件的元数据和行为。其中包含插件的名称、版本号、描述、图标等信息，还包括了插件的权限和所需的资源文件。

HTML/CSS/JavaScript文件：这些文件负责实现插件的功能和用户界面。HTML文件定义了插件的结构，CSS文件用于样式定义，而JavaScript文件则包含了与插件交互的代码逻辑。

背景页面（Background Page）：背景页面是插件的后台运行环境，用于处理事件、执行后台任务和与浏览器进行通信。

内容脚本（Content Script）：内容脚本是一段JavaScript代码，可以在特定的网页上注入并与之交互。它可以访问当前页面的DOM结构和JavaScript对象，以实现对页面的修改和操作。

选项页面（Options Page）：选项页面提供了插件的设置选项，允许用户自定义插件的行为和外观。

这些文件共同构成了插件的基本结构，定义了插件的行为和外观。

Google插件在浏览器中的运行方式与Web页面类似，都是基于HTML、CSS和JavaScript技术实现的。它们可以使用Chrome提供的API（应用程序接口）来访问浏览器的功能，并与其他Web技术进行交互。

## 运行方式

Google插件的运行原理可以总结为以下几个步骤：

插件加载：当用户打开浏览器时，浏览器会加载已安装的插件。插件的清单文件将被读取，并解析出插件的基本信息和配置。

背景页面启动：插件的背景页面将在插件加载后启动。背景页面是插件的核心，它会执行初始化操作、注册事件监听器，并提供插件的后台功能和API。

内容脚本注入：当用户访问特定网页时，内容脚本将被注入到页面中。内容脚本可以修改页面的DOM结构、监听页面事件，并与页面进行交互。

消息传递与通信：插件的各个组件可以通过消息传递机制进行通信。背景页面可以发送消息给内容脚本，或者接收来自内容脚本的消息，以实现数据交换和功能协调。

用户界面展示：插件可以在浏览器界面上展示自定义的用户界面，如工具栏按钮、弹出窗口等。用户可以通过与插件界面交互来使用插件提供的功能和选项。

定期更新和升级：插件开发者可以定期发布更新和升级版本，用户的浏览器将自动检查并安装新版本的插件。

当用户安装了一个Google插件后，该插件的代码将会被下载到用户的本地计算机上，并在以后的浏览器会话中执行。用户可以通过Chrome浏览器的扩展管理器对已安装的插件进行启用或禁用。

## 演示

【设置】-【扩展程序】-【开发者模式】

### Manifest 说明

完整的配置说明：https://developer.chrome.com/docs/extensions/mv3/manifest/

```json
{
  // Required
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0",

  // Recommended
  "action": { // 浏览器动作，该字段用于定义当用户单击浏览器操作按钮时执行的操作
    "default_popup": "popup.html", // 弹出窗口的 HTML 文件路径
    "default_title": "My Extension", // 鼠标指针悬停在浏览器操作按钮上显示的默认标题
    "default_icon": { // 默认图标的文件路径
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "default_locale": "en",
  "description": "This is a sample extension",
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  },
   
  // Optional
  "permissions": [ 
    // 权限，该字段定义了插件需要访问的资源和功能，例如浏览器标签、存储、网络等等。
    // https://developer.chrome.com/docs/extensions/mv3/declare_permissions/#permissions
    "tabs", // 访问标签
    "storage" // 访问扩展的本地存储
  ],
  "host_permissions": [ // 主机权限,允许扩展程序与 URL 的匹配模式进行交互。
    "*://*/*", // 所有网页
    "https://*/*", // 所有https协议网页
    "https://km.sankuai.com/*" // 学城
  ],
  "background": { // 后台脚本，该字段在后台长时间运行的脚本，也称为持久化背景页
    "service_worker": "service-worker.js",
  },
  "content_scripts": [ // 注入内容脚本
    {
      "matches": [
        "https://example.com/*"
      ],
      "js": [
        "content.js"
      ],
      "css": [
        "styles.css"
      ]
    }
  ]
}
```

### action 说明

#### helloworld体验

1. 创建 manifest.json 文件：

  ```json
  {
    "manifest_version": 3,
    "name": "Hello Extensions",
    "description": "Base Level Extension",
    "version": "1.0",
    "action": {
      "default_popup": "hello.html",
      "default_icon": "hello_extensions.png"	
    }
  }
  ```

2. 创建 html 文件：

  ```html
  <html>
    <body>
      <h1>Hello Extensions</h1>
    </body>
  </html>
  ```

### content-scripts 说明

content.js 的最主要的作用就是与页面进行交互，通过JavaScript语言来改变页面的展示效果或者实现某些特定的功能。例如，我们可以使用 content.js 在网页上添加新的按钮、文本框、下拉框等控件，以方便用户对网页进行操作。content.js 可以轻松地对DOM元素进行增删改查等操作，例如，在页面上隐藏某些元素、修改文字或颜色等。

content.js 还可以向当前页面注入JavaScript代码，以实现更加复杂的功能。例如，可以通过注入JS脚本，来自动化测试网页、爬取网页数据等。

```
"content_scripts": [
  {
    "matches": [
      "http://*/*",
      "https://*/*",
      "<all_urls>"
    ],
    "js": [
      "content.js"
    ],
    "css": [
      "content.css"
    ]
  }
],
```

### background 说明

background 是一个后台服务脚本文件，它在插件安装后一直在后台运行，负责处理与浏览器和其他组件的交互、事件处理和数据存储等重要任务。它与前台脚本（即内容脚本）和弹出式窗口脚本共同构成了谷歌插件的完整结构。

没有打开插件的弹出式窗口或活动标签页也会在插件安装后一直在后台运行。这使得插件能够在用户不直接与其交互的情况下执行任务和逻辑。

所以它的生命周期与插件的生命周期紧密相关。它会在插件启动时被加载和初始化，在插件关闭时被卸载。在生命周期管理中，background 可以执行一些初始化操作、设置定时任务、注册事件监听器等。
```
"background": {
    "service_worker": "service-worker.js"
  },
```

#### 生命周期

##### ServiceWorkerRegistration.install 

安装过程触发的第一个事件

##### chrome.runtime.onInstalled

扩展插件更新、谷歌浏览器更新时，插件第一次安装完成出发（不是脚本文件）
```
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'hello guys',
    id: 'id'
  });
});
```
##### ServiceWorkerRegistration.active

脚本activate事件被触发

### homepage_url

```
"homepage_url": "https://www.meituan.com/",
```

## 分享一个小插件
1. 内置自己使用高频两个网站分组
2. 自动展开当前域名所有打开页面列表
3. 自定义分组名称
4. 点击列表自动跳转到对应网页
![image](https://github.com/floraluo/google-browser-plugin/assets/11729393/8fdbcc22-dca4-4f99-8d6f-6aff63d7c445)

