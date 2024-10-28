export default {
  LoginComponent: {
    welcome: '欢迎回来',
    usernameEmail: '用户名 / 邮箱',
    usernameEmailPlaceholder: '您的用户名或邮箱',
    password: '密码',
    passwordPlaceholder: '您的密码',
    login: '登录',
    registerPrompt: '没有账号？注册',
  },
  RegisterComponent: {
    title: '开始您的伟大旅程',
    text: '免费使用, 永远',
    username: '用户名',
    usernamePlaceholder: '您的用户名',
    email: '电子邮件',
    emailPlaceholder: '您的电子邮件',
    password: '密码',
    passwordPlaceholder: '您的密码',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '确认您的密码',
    register: '注册',
    loginPrompt: '已经有账号？ 登录',
  },
  WebsiteLogoComponent: {
    title: 'Career.Top',
    switchVersion: '切换游戏版本',
    current: '当前版本',
  },
  Navbar: {
    PlayersList: '球员',
    PlayerDetail: '详情',
    PlayersTrends: '成长',
    Settings: '设置',
    GetStarted: '快速开始',
    VisitGithub: '访问 Github',
    SwitchLanguage: 'Switch to English',
    Hello: '你好， ',
    Logout: '退出登录',
  },
  NoDataComponent: {
    prefix: '这里没有数据。请转到',
    getStartedPage: '快速开始页面',
    suffix: ', 开始您的旅程！',
  },
  PlayerListTable: {
    name: '名字',
    age: '年龄',
    position: '位置',
    overall: '总评',
    potential: '潜力',
  },
  PlayerDetailPage: {
    BasicInfo: {
      PlayerID: '球员ID',
      Age: '年龄',
      Skills: '技能',
      WeakFoot: '弱脚',
      Foot: '脚',
      Height: '身高',
      Weight: '体重',
      AttackingWorkRate: '进攻效率',
      DefensiveWorkRate: '防守效率',
    },
    Attributes: {
      Pace: '速度',
      Acceleration: '加速',
      SprintSpeed: '冲刺',

      Shooting: '射门',
      AttackingPosition: '进攻位置',
      Finishing: '终结',
      ShotPower: '射门力量',
      LongShots: '远射',
      Volleys: '凌空抽射',
      Penalties: '点球',

      Passing: '传球',
      Vision: '视野',
      Crossing: '传中',
      FKAccuracy: '任意球精度',
      ShortPass: '短传',
      LongPass: '长传',
      Curve: '弧线球',

      Dribbling: '盘带',
      Agility: '敏捷',
      Balance: '平衡',
      Reactions: '反应',
      BallControl: '控球',
      Composure: '冷静',

      Defending: '防守',
      Interceptions: '拦截',
      HeadingAccuracy: '头球精度',
      DefensiveAwareness: '防守意识',
      StandingTackle: '站立铲球',
      SlidingTackle: '滑铲',

      Physical: '身体素质',
      Jumping: '跳跃',
      Stamina: '耐力',
      Strength: '力量',
      Aggression: '侵略性',

      Goalkeeping: '守门',
      GKDiving: '扑救',
      GKHandling: '处理球',
      GKKicking: '踢球',
      GKReflexes: '反应',
      GKPositioning: '站位',
    },
  },
  SettingsPage: {
    Settings: '设置',

    APISecretKey: 'API 秘钥',
    ClickToCopy: '点击复制你的API秘钥',
    ClickToRefresh: '点击刷新你的API秘钥，这将会使你的旧秘钥失效',
    CopySuccessMessage: '秘钥已复制到剪贴板',
    FailedToCopyMessage: '无法复制秘钥到剪贴板，请重试',
    DoNotShareSecretKey: '警告: 不要与任何人分享您的秘钥！',

    EnableNotifications: '启用通知',
    PlayerOverallPotentialUpdate: '球员 总评/潜力 更新',
    PlayerSkillMoveUpdate: '球员 花式 能力更新',
    PlayerWeakFootUpdate: '球员 弱脚 能力更新',

    Logout: '登出',
    ClickToLogout: '点击登出',
  },
  GetStartedPage: {
    GET_STARTED_TEXT: `
# 开始
## 1. 依赖
- 最新的 **[xAranaktu/FC-24-Live-Editor](https://www.patreon.com/collection/96422?view=expanded)**。
- **API 密钥**。（您可以在 [设置页面](/settings) 管理它，但您实际上不需要它，因为我已经在下面的代码片段中为您放入了它）

## 2. 安装
1. 打开带有Live Editor的 FC24。
2. 进入职业模式。
3. 在实时编辑器中转到 \`Lua Engine\` 选项卡。
4. 粘贴下面的代码片段。`,
    SUCCESS: '成功',
    SUCCESS_MESSAGE: '已复制到剪贴板',
    ERROR: '错误',
    ERROR_MESSAGE: '复制失败。请手动复制代码。',
    COPY_TO_CLIPBOARD: '复制到剪贴板',
    HIDE_ALL_CODE: '隐藏所有代码',
    SHOW_ALL_CODE: '显示所有代码',
    CODE_NOT_SHARE_WARNING:
      '警告：这些代码包含您的秘密密钥。请勿与他人分享这些代码。',
    IMPORTANT_TIPS: `
# 重要提示 

### 1. 游戏内日期可能不完全准确！

您可能注意到，我们正在跟踪球员统计数据的增长，随着游戏内时间的变化。
但这里有一个小秘密：我们很难获取确切的游戏内日期！我们曾经从您可以在实时编辑器的表格选项卡中找到的“career_table”中提取该数据。但在某个游戏更新后，该表中的数据不再准确。有趣的是，我发现了一个模式：当您第一次进入职业模式或在比赛后，表格是准确的。

因此，根据这一点，我们不得不创建一种手动时间计算方法，通过监听游戏中的 DAY_PASSED 事件，并与我们仍然可以获取的数据进行交叉引用。这有点笨拙，我不得不添加大量冗余代码来让它工作。但目前，这是我们唯一的选择。因此，在使用该脚本时，请不要过于依赖游戏内日期，因为它可能并不准确。

请您在进入职业模式后立即运行该脚本，以获取尽可能准确的数据。否则，数据只有在您进行比赛后才会变得准确。

**我们的建议：在进入职业模式后立即运行该脚本！**

### 2. 恼人的黑窗口！它可能抢走您的焦点。

让我解释一下它是如何工作的。我们的应用程序依赖于实时编辑器提供的功能。每当游戏中触发 WEEK_PASSED 事件时，我们的 Lua 脚本会运行，收集您当前队伍中所有球员的数据并将其发送到我们的服务器。但这里有个问题：实时编辑器不提供直接向外部服务器发送 API 请求的方法，因此我们使用 Windows 的 Curl 命令来做到这一点。

不幸的是，每次我们运行该命令时，都会弹出一个黑窗口，因为我们在 Windows 系统中执行 Curl。有时，这个黑窗口可能会抢走您游戏的焦点，这真的很糟糕。虽然这并不是每次都会发生，但确实可能。它远非完美，但这是我们目前能做的最好选择。

对此带来的不便，我深表歉意，但我正在不断寻找更好的解决方案。因此，在使用该应用程序时，请不要关闭那个黑窗口——它正在忙着发送 API 请求。如果您的网络不太慢，该窗口应该会迅速消失。根据我的经验，这还算可以，因为黑窗口每个游戏周只会弹出一次。嘿，为了跟踪您球员的进展，这也是个小代价，对吧？请放心，我会继续寻找更好的解决方案，并在找到后立即更新应用程序。感谢您的理解！

### 3. 仅支持一个存档槽！

在封闭测试期间，我们仅支持一个存档槽。这是因为我们的服务器资源有限，无法为每个用户提供单独的存档。此外，我怀疑没有人会频繁地切换存档文件，所以我认为这个限制是合理的。未来，我们可能会提供更多的存档槽，但谁知道呢？未来充满惊喜！

### 4. 由于文件系统权限不足导致的问题

让我解释一下为什么这个脚本需要文件系统权限。正如我们之前提到的，我们使用命令行直接执行 curl 命令来发送您的球员数据。但是，由于众多球员属性，JSON 数据字符串可能会变得非常长，导致无法在单行的 curl 中连接所有这些数据，因为超出了命令行的允许长度。

因此，我的做法是先将这些数据写入文件，然后在命令中连接文件的路径。基于此，请确保您拥有管理员权限和文件夹的写入权限。通常，我们将写入 EA FC 游戏的根目录，如果写入失败，将显示错误：“权限被拒绝。”`,
  },
};
