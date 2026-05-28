/**
 * STARLIGHT RIVALS — Site Configuration
 */

const SITE_CONFIG = {
  name: "Starlight Rivals",
  tagline: "a discord for women who'd rather talk to girls than dudes.",
  description:
    "starlight rivals. women only discord. we game. we yap. no men.",

  assets: {
    logo: "assets/logo.png",
    oliAvatar: "assets/oli.webp",
    nuggieKingdom: "assets/nuggie-kingdom.png",
    nuggieDiscordUrl: "https://discord.nuggiekingdom.com/",
  },

  discord: {
    inviteUrl: "https://discord.gg/Z8bnQyh5",
    serverId: "1481186540918018104",
    headline: "pull up",
    subtext:
      "women only discord. play stuff, yap in voice, send clips. no guys. just girls. Way better vibes.",
    ranksHeadline: "starling, moonling, dreamling",
    ranksIntro:
      "our ranks track how deep you are in the constellation. everyone starts as a starling when they join. show up, game, and stick around to rise through moonling and dreamling.",
    ranks: [
      {
        name: "starling",
        tier: "01",
        theme: "starling",
        tagline: "first light",
        blurb: "you just got here. fresh face. welcome to the squad, stargazer.",
      },
      {
        name: "moonling",
        tier: "02",
        theme: "moonling",
        tagline: "in orbit",
        blurb: "you're a regular now. you show up, you game, you're part of the crew.",
      },
      {
        name: "Dreamling",
        tier: "03",
        theme: "dreamling",
        tagline: "Core of the cosmos",
        blurb: "the moderators of the server. they basically run the vibe at this point... thank god.",
      },
    ],
    features: [
      "lfg and game night channels",
      "clip sharing when you pop off",
      "voice chat that's actually fun",
      "events, chaos, and drama",
    ],
    gate: {
      badge: "space cadet check",
      title: "confirm before launch",
      body:
        "as a space cadet boarding the starlight spacecraft, do you identify as a woman? this is a women-only discord — if that's not you, you'll be ejected from the craft after joining. no hard feelings, just keeping the vibes right.",
      dismissLabel: "abort launch",
      continueLabel: "beam me up",
    },
  },

  minecraft: {
    headline: "modded minecraft",
    subtext:
      "we run modded seasons sometimes. fresh worlds, different modpacks, same crew. collab with nuggie kingdom and other discord servers. women led on the MC side, not women only. everyone welcome there.",
    status: "check discord for the current season",
    mapPageUrl: "minecraft.html",
    mapHeadline: "minecraft",
    mapSubtext: "grab the pack, hop on modrinth, and meet us in-game.",
    mapPlaceholderText: "map coming soon…",
    bluemapUrl: "http://173.240.151.165:9007/#world2:-545:87:705:150:0:0:0:1:flat",
    nuggieUrl: "https://discord.nuggiekingdom.com/",
    musicVideoId: "YMEblRM4pGc",
    steps: [
      "join the discord",
      "peep the minecraft announcements",
      "grab the modpack and connect guide",
      "go build dumb stuff with us",
    ],
    pack: {
      name: "cobbleverse x starlight",
      label: "current pack",
      logo: "assets/cobbleverse-starlight.png",
      description:
        "a starlight rivals fork of cobbleverse — the cobblemon pack everyone and their mom is playing. same cozy cobblemon loop you know, plus community features, performance tuning, and qol addons we actually want on the server. built for our crew, not a random curseforge dump.",
      downloadUrl:
        "https://storage.googleapis.com/nuggiekingdompack/COBBLEVERSE%20x%20Starlight%201.7.0.mrpack",
      modrinthUrl: "https://modrinth.com/app",
      serverIp: "mc.starlightrivals.com",
      ramMinGb: 4,
      ramMaxGb: 6,
      headerVideoId: "2tsCcWbiYgA",
      headerVideoStart: 20,
    },
    connectionGuide: {
      subtext:
        "six steps from zero to in-game. we'll walk you through it — takes like ten minutes if modrinth behaves.",
      steps: [
        {
          title: "download the pack",
          text: "hit the button below. it'll pull the modpack file straight to your downloads folder.",
          action: "download",
        },
        {
          title: "install modrinth",
          text: "modrinth is the launcher we use for this pack. grab it now so you're ready for the next step.",
          action: "modrinth",
        },
        {
          title: "import the modpack",
          text: "open modrinth → click the + button → choose import modpack → select the file you just downloaded.",
          action: null,
        },
        {
          title: "check your ram",
          text: "before you launch, bump allocated ram to at least 4–6gb in modrinth settings. cobblemon packs are hungry.",
          action: null,
        },
        {
          title: "launch the pack",
          text: "hit play on cobbleverse x starlight in modrinth. first boot takes a minute — grab water.",
          action: null,
        },
        {
          title: "join the server",
          text: "in minecraft: multiplayer → add server → paste the ip below → connect. see you in the overworld.",
          action: "copyIp",
        },
      ],
    },
  },

  oli: {
    name: "oli",
    nameDecor: "",
    role: "founder",
    quote:
      "i literally just made this to game with the girlies, that's it <3",
    bio:
      "oli runs the server. sets up game nights (if she is not lazy). keeps it from going feral (unless the drama is too good). she's why any of this exists tbh.",
    avatar: "assets/oli.webp",
    tiktok: "https://www.tiktok.com/@olipoppii",
  },

  about: {
    headline: "women only discord",
    paragraphs: [
      "starlight rivals is a women only gaming discord. ranked, cozy games, whatever. the point is playing with other women without guys in the mix.",
      "sound like your thing? join the discord. it's just women.",
    ],
    stats: [
      { numeric: 50, suffix: "+", label: "members" },
      { numeric: 24, suffix: "/7", label: "chat" },
      { symbol: "∞", label: "sessions" },
    ],
    features: [
      {
        title: "game together",
        text: "find people for marvel rivals, minecraft, indies. whatever you're on.",
        icon: "squad",
        character: "assets/card-game-together.png",
      },
      {
        title: "women only",
        text: "discord is girls only. that's the whole point. no boys club energy.",
        icon: "shield",
        character: "assets/card-women-only.png",
      },
      {
        title: "always something",
        text: "voice, text, events. someone's usually around.",
        icon: "pulse",
        character: "assets/card-always-something.png",
      },
    ],
  },

  heroVideoId: "yaH9qnvdvkA",
  heroVideoStart: 20,
  musicVideoId: "uc1f-Msff8Q",
  musicVolume: 45,
  heroBadge: "women only discord",
  ctaFinalText: "we're probably in voice. just join.",

  links: {
    twitter: "",
    instagram: "",
    tiktok: "",
  },

  meta: {
    title: "starlight rivals | women only gaming discord",
    description:
      "women only discord for gaming together. modded minecraft collab with nuggie kingdom.",
    themeColor: "#7c3aed",
  },

  preloader: {
    minDurationMs: 2500,
    enterLabel: "enter",
    loadingText: "loading the stars…",
    readyText: "tap enter. we're waiting.",
  },

  footer: {
    developedBy: "nuggie kingdom",
    developedByUrl: "https://discord.nuggiekingdom.com/",
  },
};
