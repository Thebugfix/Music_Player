let audio = document.querySelector("#audio");
let ShowSong = document.getElementById("ShowSong");
let menu = document.getElementById("menu");
let menus = document.getElementById("menus");
let musicapps = document.getElementById("musicapps");
let musicapp = document.getElementById("musicapp");
let play = document.getElementById("play");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let songName = document.getElementById("songName");
let singerName = document.getElementById("singerName");
let songsContainer = document.getElementById("songsContainer");
let shuffleBtn = document.getElementById("shuffle");
let repeatBtn = document.getElementById("repeat");
let volumeControl = document.getElementById("volume");
let albumArt = document.querySelector('.image img');

let pauseIcon = '<i class="fa-solid fa-circle-play" style="color: #566573"></i>';
let playIcon = '<i class="fa-solid fa-pause" style="color: #566573;"></i>';
let currentSongIndex = 0;
let songCurrentSong = 0;
let isShuffleOn = false;
let isRepeatOn = false;

let songlist = [
  {
    songTitle: "Ye raate ye mausam",
    songSrc: "songs/ye_raate_ye_mausam.mp3",
    singer: "Sanam, Simran Sehgal",
  },
  {
    songTitle: "Ek Ajnabee Haseena Se",
    songSrc: "songs/Ek_Ajnabee_Haseena_Se.mp3",
    singer: "Kishore kumar",
  },
  {
    songTitle: "Mere mehboob qayamat hogi",
    songSrc: "songs/mere_mehboob_qayamat_hogi.mp3",
    singer: "Kishore kumar",
  },
  {
    songTitle: "Lagja gale ki phir ye",
    songSrc: "songs/lagja_gale_ki_phir_ye.mp3",
    singer: "Lata Mangeshkar",
  },
  {
    songTitle: "Kya Kua Tera Wada",
    songSrc: "songs/Kya_Kua_Tera_Wada.mp3",
    singer: "Mohammed Rafi and Sushma Shreshta",
  },
  {
    songTitle: "Pyar deewana hota hai",
    songSrc: "songs/pyar_deewana_hota_hai_mastana_hota_hai.mp3",
    singer: "Kishore kumar",
  },
  {
    songTitle: "Kitabein Bahut Si",
    songSrc: "songs/Kitabein Bahut Si.mp3",
    singer: "Vinod Rathod, Asha Bhosle",
  },
  {
    songTitle: "ye saam mastani",
    songSrc: "songs/ye_saam_mastani.mp3",
    singer: "Kishore kumar",
  },
  {
    songTitle: "Galliyan",
    songSrc: "songs/Galliyan.mp3",
    singer: "Ankit Tiwari",
  },
  {
    songTitle: "Agar Tum Saath Ho",
    songSrc: "songs/Agar Tum Saath Ho.mp3",
    singer: "Arjit Singh, Alka Yagnik",
  },
  {
    songTitle: "Kaun Tujhe",
    songSrc: "songs/Kaun Tujhe.mp3",
    singer: "Palak muchhal",
  },
  {
    songTitle: "Raabta (Kehte Hain Khuda Ne)",
    songSrc: "songs/Raabta (Kehte Hain Khuda Ne).mp3",
    singer: "Arjit Singh, Shreya Ghoshal",
  },
  {
    songTitle: "Baarish",
    songSrc: "songs/Baarish.mp3",
    singer: "Ash king, Shashaa tirupati",
  },
  {
    songTitle: "Kaise Mujhe",
    songSrc: "songs/Kaise Mujhe.mp3",
    singer: "Benny Dayal, Shreya Ghoshal",
  },
  {
    songTitle: "Tum jo pakad lo hath mera",
    songSrc: "songs/tum_jo_pakad_lo_hath_mera.mp3",
    singer: "Kishore kumar",
  },
  {
    songTitle: "Lo safar shuru ho gaya",
    songSrc: "songs/lo_safar_shuru_ho_gaya.mp3",
    singer: "Jubin Nautiyal",
  },
  {
    songTitle: "Cham Cham",
    songSrc: "songs/Cham Cham.mp3",
    singer: "Meet Bros, Monali thakur",
  },
];

// Display song list
songsContainer.innerHTML = songlist
  .map((song, index) => {
    return `
    <div class="songList" data-index="${index}">
      <div class="song">
        <div class="name">${song.songTitle}</div>
        <div class="singer">${song.singer}</div>
      </div>
      <div class="icon">
        <i class="fa-solid fa-circle-play" style="color: #566573"></i>
      </div>
    </div>
  `;
  })
  .join("");

function pageSwap() {
  menus.addEventListener("click", () => {
    musicapp.classList.toggle("hide");
    musicapps.classList.toggle("hide");
  });

  menu.addEventListener("click", () => {
    musicapp.classList.add("hide");
    musicapps.classList.remove("hide");
  });
}

pageSwap();

// Play the default song on load
function defaultSong() {
  audio.src = songlist[currentSongIndex].songSrc;
  songName.innerText = songlist[currentSongIndex].songTitle;
  singerName.innerText = songlist[currentSongIndex].singer;
  play.innerHTML = pauseIcon;
  playSong();
}

// Function to play the selected song
function playSong() {
  audio.src = songlist[currentSongIndex].songSrc;
  songName.innerText = songlist[currentSongIndex].songTitle;
  singerName.innerText = songlist[currentSongIndex].singer;
  audio.currentTime = songCurrentSong;
  audio.play();
  play.innerHTML = playIcon;
  albumArt.classList.add('playing');
}

function pauseSong() {
  audio.pause();
  songCurrentSong = audio.currentTime;
  play.innerHTML = pauseIcon;
  albumArt.classList.remove('playing');
}

function nextSong() {
  if (isShuffleOn) {
    currentSongIndex = Math.floor(Math.random() * songlist.length);
  } else {
    currentSongIndex++;
    if (currentSongIndex >= songlist.length) {
      currentSongIndex = 0;
    }
  }
  songCurrentSong = 0;
  playSong();
}

function previousSong() {
  if (isShuffleOn) {
    currentSongIndex = Math.floor(Math.random() * songlist.length);
  } else {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songlist.length - 1;
    }
  }
  songCurrentSong = 0;
  playSong();
}

audio.onended = function() {
  if (isRepeatOn) {
    playSong();
  } else {
    nextSong();
  }
};

// Handle play/pause button
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Add event listener to list song dynamically
document.querySelectorAll(".songList").forEach((songElem) => {
  songElem.addEventListener("click", () => {
    currentSongIndex = parseInt(songElem.getAttribute("data-index"));
    musicapp.classList.add("hide");
    musicapps.classList.remove("hide");
    songCurrentSong = 0;
    playSong();
  });
});

// forward/backward functionality
forward.addEventListener("click", nextSong);
backward.addEventListener("click", previousSong);

// Update progress bar
audio.addEventListener("timeupdate", () => {
  ShowSong.value = audio.currentTime;
});

ShowSong.addEventListener("input", () => {
  audio.currentTime = ShowSong.value;
});

audio.onloadedmetadata = function () {
  ShowSong.max = audio.duration;
};

// Shuffle functionality
shuffleBtn.addEventListener("click", () => {
  isShuffleOn = !isShuffleOn;
  shuffleBtn.classList.toggle("active");
});

// Repeat functionality
repeatBtn.addEventListener("click", () => {
  isRepeatOn = !isRepeatOn;
  repeatBtn.classList.toggle("active");
});

// Volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  switch(e.code) {
    case "Space":
      e.preventDefault();
      if (audio.paused) {
        playSong();
      } else {
        pauseSong();
      }
      break;
    case "ArrowRight":
      audio.currentTime += 5;
      break;
    case "ArrowLeft":
      audio.currentTime -= 5;
      break;
    case "ArrowUp":
      audio.volume = Math.min(1, audio.volume + 0.1);
      volumeControl.value = audio.volume;
      break;
    case "ArrowDown":
      audio.volume = Math.max(0, audio.volume - 0.1);
      volumeControl.value = audio.volume;
      break;
  }
});

audio.addEventListener('ended', () => {
  albumArt.classList.remove('playing');
});

defaultSong();