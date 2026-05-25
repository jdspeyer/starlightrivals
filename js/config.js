/**
 * STARLIGHT RIVALS — Site Configuration
 */

const SITE_CONFIG = {
  name: "Starlight Rivals",
  tagline: "A Discord for women who'd rather talk to girls than dudes.",
  description:
    "Starlight Rivals. Women only Discord. We game. We yap. No men.",

  assets: {
    logo: "assets/logo.png",
    oliAvatar: "assets/oli.webp",
    nuggieKingdom: "assets/nuggie-kingdom.png",
    nuggieDiscordUrl: "https://discord.nuggiekingdom.com/",
  },

  discord: {
    inviteUrl: "https://discord.gg/Z8bnQyh5",
    serverId: "1481186540918018104",
    headline: "Pull up",
    subtext:
      "Women only Discord. Play stuff, yap in voice, send clips. No guys. Just girls. Way better vibes.",
    ranksHeadline: "Starling, Moonling, Dreamling",
    ranksIntro:
      "Our ranks track how deep you are in the constellation. Everyone starts as a Starling when they join. Show up, game, and stick around to rise through Moonling and Dreamling.",
    ranks: [
      {
        name: "Starling",
        tier: "01",
        theme: "starling",
        tagline: "First light",
        blurb: "You just got here. Fresh face. Welcome to the squad, stargazer.",
      },
      {
        name: "Moonling",
        tier: "02",
        theme: "moonling",
        tagline: "In orbit",
        blurb: "You're a regular now. You show up, you game, you're part of the crew.",
      },
      {
        name: "Dreamling",
        tier: "03",
        theme: "dreamling",
        tagline: "Core of the cosmos",
        blurb: "The OGs. Been here forever. You basically run the vibe at this point.",
      },
    ],
    features: [
      "LFG and game night channels",
      "Clip sharing when you pop off",
      "Voice chat that's actually fun",
      "Events, giveaways, chaos",
    ],
    gate: {
      badge: "Space Cadet Check",
      title: "Confirm before launch",
      body:
        "As a space cadet boarding the Starlight spacecraft, do you identify as a woman? This is a women-only Discord — if that's not you, you'll be ejected from the craft after joining. No hard feelings, just keeping the vibes right.",
      dismissLabel: "Abort Launch",
      continueLabel: "Beam Me Up",
    },
  },

  minecraft: {
    headline: "Modded Minecraft",
    subtext:
      "We run modded seasons sometimes. Fresh worlds, different modpacks, same crew. Collab with Nuggie Kingdom and other Discords. Women led on the MC side, not women only. Everyone welcome there.",
    status: "Check Discord for the current season",
    mapPageUrl: "minecraft.html",
    mapHeadline: "Modded Minecraft",
    mapSubtext:
      "We run modded seasons sometimes. Fresh worlds, different modpacks, same crew. Collab with Nuggie Kingdom and other Discords. Women led on the MC side, not women only. Everyone welcome there.",
    mapPlaceholderText: "Map coming soon…",
    bluemapUrl: "",
    nuggieUrl: "https://discord.nuggiekingdom.com/",
    steps: [
      "Join the Discord",
      "Peep the Minecraft announcements",
      "Grab the modpack and connect guide",
      "Go build dumb stuff with us",
    ],
  },

  oli: {
    name: "Oli",
    nameDecor: "",
    role: "Founder",
    quote:
      "I literally made this because I wanted to talk to women instead of men. Women are just so much hotter. That's it. That's the whole server.",
    bio:
      "Oli runs the server. Sets up game nights. Keeps it from going feral. She's why any of this exists tbh.",
    avatar: "assets/oli.webp",
    tiktok: "https://www.tiktok.com/@YOUR_TIKTOK_HANDLE",
  },

  about: {
    headline: "Women only Discord",
    paragraphs: [
      "Starlight Rivals is a women only gaming Discord. Ranked, cozy games, whatever. The point is playing with other women without guys in the mix.",
      "Sound like your thing? Join the Discord. It's just women.",
    ],
    stats: [
      { numeric: 50, suffix: "+", label: "Members" },
      { numeric: 24, suffix: "/7", label: "Chat" },
      { symbol: "∞", label: "Sessions" },
    ],
    features: [
      {
        title: "Game together",
        text: "Find people for Marvel Rivals, Minecraft, indies. Whatever you're on.",
        icon: "squad",
        character: "assets/card-game-together.png",
      },
      {
        title: "Women only",
        text: "Discord is girls only. That's the whole point. No boys club energy.",
        icon: "shield",
        character: "assets/card-women-only.png",
      },
      {
        title: "Always something",
        text: "Voice, text, events. Someone's usually around.",
        icon: "pulse",
        character: "assets/card-always-something.png",
      },
    ],
  },

  heroVideoId: "yaH9qnvdvkA",
  heroVideoStart: 20,
  musicVideoId: "uc1f-Msff8Q",
  musicVolume: 45,
  heroBadge: "Women Only Discord",
  ctaFinalText: "We're probably in voice. Just join.",

  links: {
    twitter: "",
    instagram: "",
    tiktok: "",
  },

  meta: {
    title: "Starlight Rivals | Women Only Gaming Discord",
    description:
      "Women only Discord for gaming together. Modded Minecraft collab with Nuggie Kingdom.",
    themeColor: "#7c3aed",
  },

  preloader: {
    minDurationMs: 2500,
    enterLabel: "Enter",
    loadingText: "Loading the stars…",
    readyText: "Tap enter. We're waiting.",
  },

  footer: {
    developedBy: "Nuggie Kingdom",
    developedByUrl: "https://discord.nuggiekingdom.com/",
  },
};
