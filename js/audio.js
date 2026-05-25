/**
 * Background music via YouTube IFrame API (starts on preloader Enter).
 */
(function () {
  "use strict";

  let player = null;
  let ready = false;
  let muted = false;
  let pendingPlay = false;

  const toggleBtn = () => document.getElementById("audioToggle");

  function updateToggleUI() {
    const btn = toggleBtn();
    if (!btn) return;
    btn.classList.toggle("is-playing", !muted && ready);
    btn.classList.toggle("is-muted", muted);
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
    btn.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");
  }

  function createPlayer() {
    const videoId = SITE_CONFIG.musicVideoId;
    if (!videoId || typeof YT === "undefined" || !YT.Player) return;

    player = new YT.Player("ytMusicPlayer", {
      height: "0",
      width: "0",
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: videoId,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          ready = true;
          const vol = SITE_CONFIG.musicVolume ?? 45;
          player.setVolume(vol);
          if (pendingPlay) startMusic();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED) player.playVideo();
        },
      },
    });
  }

  function startMusic() {
    pendingPlay = true;
    if (!player || !ready) return;
    muted = false;
    player.unMute();
    player.playVideo();
    pendingPlay = false;
    const btn = toggleBtn();
    if (btn) btn.hidden = false;
    updateToggleUI();
  }

  function toggleMute() {
    if (!player || !ready) return;
    if (muted) {
      player.unMute();
      if (player.getPlayerState() !== YT.PlayerState.PLAYING) player.playVideo();
      muted = false;
    } else {
      player.mute();
      muted = true;
    }
    updateToggleUI();
  }

  window.initSiteAudio = function () {
    const btn = toggleBtn();
    if (btn) {
      btn.addEventListener("click", toggleMute);
    }
  };

  window.startSiteMusic = startMusic;

  window.onYouTubeIframeAPIReady = function () {
    createPlayer();
  };

  if (typeof YT !== "undefined" && YT.Player) {
    createPlayer();
  }
})();
