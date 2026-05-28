/**
 * Background music via YouTube IFrame API (starts on preloader Enter).
 */
(function () {
  "use strict";

  let player = null;
  let ready = false;
  let muted = false;
  let pendingPlay = false;
  let activeVideoId = null;

  const toggleBtn = () => document.getElementById("audioToggle");

  function getMusicVideoId() {
    if (window.__pageMusicVideoId) return window.__pageMusicVideoId;
    if (document.body?.classList.contains("mc-page") && SITE_CONFIG.minecraft?.musicVideoId) {
      return SITE_CONFIG.minecraft.musicVideoId;
    }
    return SITE_CONFIG.musicVideoId;
  }

  function updateToggleUI() {
    const btn = toggleBtn();
    if (!btn) return;
    btn.classList.toggle("is-playing", !muted && ready);
    btn.classList.toggle("is-muted", muted);
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
    btn.setAttribute("aria-label", muted ? "Unmute music" : "Mute music");
  }

  function loadVideo(videoId) {
    if (!videoId) return;
    activeVideoId = videoId;

    if (player && ready && typeof player.loadVideoById === "function") {
      player.loadVideoById({
        videoId,
        startSeconds: 0,
        suggestedQuality: "small",
      });
      return;
    }

    createPlayer(videoId);
  }

  function createPlayer(videoId) {
    const id = videoId || getMusicVideoId();
    if (!id || typeof YT === "undefined" || !YT.Player) return;

    activeVideoId = id;

    if (player) return;

    player = new YT.Player("ytMusicPlayer", {
      height: "0",
      width: "0",
      videoId: id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: id,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          ready = true;
          const vol = SITE_CONFIG.musicVolume ?? 45;
          player.setVolume(vol);
          if (activeVideoId && typeof player.loadVideoById === "function") {
            player.loadVideoById({ videoId: activeVideoId, startSeconds: 0 });
          }
          if (pendingPlay) startMusic();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED && activeVideoId) {
            player.loadVideoById({ videoId: activeVideoId, startSeconds: 0 });
          }
        },
      },
    });
  }

  function startMusic() {
    pendingPlay = true;
    const id = getMusicVideoId();
    if (id && id !== activeVideoId) loadVideo(id);
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

  window.initSiteAudio = function (videoId) {
    if (videoId) window.__pageMusicVideoId = videoId;
    const btn = toggleBtn();
    if (btn && !btn.dataset.audioBound) {
      btn.dataset.audioBound = "1";
      btn.addEventListener("click", toggleMute);
    }
    loadVideo(getMusicVideoId());
  };

  window.startSiteMusic = startMusic;

  window.onYouTubeIframeAPIReady = function () {
    createPlayer(getMusicVideoId());
  };

  if (typeof YT !== "undefined" && YT.Player) {
    createPlayer(getMusicVideoId());
  }
})();
