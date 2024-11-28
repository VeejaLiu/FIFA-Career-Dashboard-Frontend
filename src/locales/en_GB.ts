export default {
  LoginComponent: {
    welcome: 'Welcome to back',
    usernameEmail: 'Username / Email',
    usernameEmailPlaceholder: 'your username or email',
    password: 'Password',
    passwordPlaceholder: 'your password',
    login: 'Login',
    registerPrompt: "Don't have an account? Register",
  },
  RegisterComponent: {
    title: 'Start your great journey',
    text: 'Free to use, forever',
    username: 'Username',
    usernamePlaceholder: 'your username',
    email: 'Email',
    emailPlaceholder: 'your email',
    password: 'Password',
    passwordPlaceholder: 'your password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'confirm your password',
    register: 'Register',
    loginPrompt: 'Already have an account? Login',
  },
  WebsiteLogoComponent: {
    title: 'Career.Top',
    switchVersion: 'Switch Game Version',
    current: 'Current',
  },
  Navbar: {
    PlayersList: 'Players',
    PlayerDetail: 'Player Detail',
    PlayersTrends: 'Players Trends',
    Settings: 'Settings',
    GetStarted: 'Get Started',
    VisitGithub: 'Visit Github',
    SwitchLanguage: '切换为中文',
    Hello: 'Hi, ',
    Logout: 'Sign out',
  },
  NoDataComponent: {
    prefix: 'No data here. Please go to the',
    getStartedPage: 'Get Started Page',
    suffix: 'to start your journey!',
  },
  PlayerListTable: {
    name: 'Name',
    age: 'Age',
    position: 'Pos',
    overall: 'Ovr',
    potential: 'Pot',
  },
  PlayerDetailPage: {
    BasicInfo: {
      PlayerID: 'ID',
      Age: 'Age',
      Skills: 'Skills',
      WeakFoot: 'Weak Foot',
      Foot: 'Foot',
      Height: 'Height',
      Weight: 'Weight',
      AttackingWorkRate: 'Att. WR',
      DefensiveWorkRate: 'Def. WR',
      PlayerName: 'Name',
      OverallRating: 'Ovr',
      Potential: 'Pot',
    },
    Attributes: {
      Pace: 'Pace',
      Acceleration: 'Acceleration',
      SprintSpeed: 'Sprint Speed',

      Shooting: 'Shooting',
      AttackingPosition: 'Attacking Position',
      Finishing: 'Finishing',
      ShotPower: 'Shot Power',
      LongShots: 'Long Shots',
      Volleys: 'Volleys',
      Penalties: 'Penalties',

      Passing: 'Passing',
      Vision: 'Vision',
      Crossing: 'Crossing',
      FKAccuracy: 'Free Kick Accuracy',
      ShortPass: 'Short Pass',
      LongPass: 'Long Pass',
      Curve: 'Curve',

      Dribbling: 'Dribbling',
      Agility: 'Agility',
      Balance: 'Balance',
      Reactions: 'Reactions',
      BallControl: 'Ball Control',
      Composure: 'Composure',

      Defending: 'Defending',
      Interceptions: 'Interceptions',
      HeadingAccuracy: 'Heading Accuracy',
      DefensiveAwareness: 'Defensive Awareness',
      StandingTackle: 'Standing Tackle',
      SlidingTackle: 'Sliding Tackle',

      Physical: 'Physical',
      Jumping: 'Jumping',
      Stamina: 'Stamina',
      Strength: 'Strength',
      Aggression: 'Aggression',

      Goalkeeping: 'Goalkeeping',
      GKDiving: 'Diving',
      GKHandling: 'Handling',
      GKKicking: 'Kicking',
      GKReflexes: 'Reflexes',
      GKPositioning: 'Positioning',
    },
  },

  SettingsPage: {
    Settings: 'Settings',
    APISecretKey: 'API Secret Key',
    ClickToCopy: 'Click to copy your API secret key',
    ClickToRefresh:
      'Click to refresh your API secret key, this will invalidate your old key',
    CopySuccessMessage: 'Secret key copied to clipboard',
    FailedToCopyMessage:
      'Failed to copy secret key to clipboard, please try again',
    DoNotShareSecretKey: 'Warning: Do not share your secret key with anyone!',
    EnableNotifications: 'Enable Notifications',
    PlayerOverallPotentialUpdate: 'Player Ovr/Pot Update',
    PlayerSkillMoveUpdate: 'Player Skill Move Update',
    PlayerWeakFootUpdate: 'Player Weak Foot Update',
    Logout: 'Logout',
    ClickToLogout: 'Click here to logout',
  },

  GetStartedPage: {
    GET_STARTED_TEXT: `
# Get Started
## 1. Dependencies
- Latest **[xAranaktu/FC-24-Live-Editor](https://www.patreon.com/collection/96422?view=expanded)** or **[xArnatu/FC-25-Live-Editor](https://www.patreon.com/collection/779838?view=expanded)**.
- **Secret API key**. (You can manage it from [Setting Page](/settings), BUT you don't really need it because I have put it in the code snippet below for you)
      
## 2. Installation
1. Open the FC24/FC25 with Live Editor.
2. Enter career mode.
3. Go to the \`Lua script\` tab in the live editor.
4. Paste the code snippet below.
      `,
    SUCCESS: 'Success',
    SUCCESS_MESSAGE: 'Copied to clipboard',
    ERROR: 'Error',
    ERROR_MESSAGE: 'Failed to copy. Please manually copy the code.',
    COPY_TO_CLIPBOARD: 'Copy to clipboard',
    HIDE_ALL_CODE: 'Hide all code',
    SHOW_ALL_CODE: 'Show all code',
    CODE_NOT_SHARE_WARNING:
      'Warning: These codes contain your secret key. Do not share these codes with others.',
    IMPORTANT_TIPS: `
# Important Notes & Tips

### 1. In-game Date Might Not Be Perfectly Accurate!

You might have noticed that we’re tracking player stat growth as the in-game time changes.  
BUT here’s a little secret: it’s tricky for us to get the exact in-game date! We used to pull that data from the “career_table” you can find in the Live Editor under the Table tab. But after a certain game update, the data in that table isn’t accurate anymore. Interestingly, I found a pattern: the table is accurate when you first enter Career Mode or after you play a match. 

So, based on that, we had to create a manual time calculation method by listening to the DAY_PASSED event in the game and cross-referencing it with the data we can still get. It’s a bit clunky, and I had to add a bunch of redundant code to make it work. But for now, that’s our only option. So, when using this script, don’t rely too heavily on the in-game date, as it might not be spot-on.  

And please, run this script immediately after entering Career Mode to get the most accurate data possible. Otherwise, the data will only become accurate after you play a match.  

**Our Tip: Run this script right after entering Career Mode!**

### 2. The Annoying Black Window! It Might Steal Your Focus.

Let me explain how this works. Our application relies on the functions provided by Live Editor. Whenever the WEEK_PASSED event is triggered in the game, our Lua script runs, collecting data from all your current team players and sending it to our server. But here’s the catch: Live Editor doesn’t offer a way to send API requests directly to an external server, so we’re using Windows’ Curl command to do that. 

Unfortunately, every time we run that command, a black window pops up because we’re executing Curl in the Windows system. And sometimes, this black window might steal focus from your game, which is a bummer. It doesn’t happen every time, but it’s possible. It’s far from perfect, but it’s the best we can do right now. 

I’m sorry about this inconvenience, but I’m constantly searching for a better solution. So, while using this application, please don’t close that black window—it’s busy sending the API request. If your network isn’t too slow, the window should disappear quickly. In my experience, it’s bearable since the black window only pops up once per in-game week. And hey, it’s a small price to pay for keeping track of your players’ progress, right? Rest assured, I’m on the lookout for a better solution, and I’ll update the application as soon as we find one. Thanks for your understanding!

### 3. Only One Save Slot Supported!

During the closed beta, we’re only supporting one save slot. This is because our server resources are limited, and we can’t provide a separate save for every single user. Plus, I doubt anyone is switching save files back and forth that often, so I think this limitation is fair. In the future, we might offer more save slots, but who knows? The future is full of surprises!

### 4. Issues Caused by Insufficient File System Permissions

Let me explain why this script requires file system permissions. As we mentioned earlier, we use the command line to directly execute a curl command to send your player data. However, due to the numerous player attributes, the JSON data string can get very long, making it impossible to concatenate all this data in a single line of curl, as it exceeds the command line's allowed length. 

Therefore, what I do is write this data to a file first and then concatenate the file's path in the command. Based on this, please ensure you have administrative privileges and write permissions for the folder. Generally, we will write to the root directory of the EA FC game, and if writing fails, an error will be displayed: "Permission denied."`,
  },
};
