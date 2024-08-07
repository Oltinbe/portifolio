let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let body = document.querySelector("body");

moon.onclick = function () {
    body.classList.add('darkmode');
    moon.style.display = 'none';
    sun.style.display = 'block';
}

sun.onclick = function () {
    body.classList.remove('darkmode');
    moon.style.display = 'block';
    sun.style.display = 'none';
}
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}













const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Kambag'alga",
    artist: "Doston Ergashev",
    duration: "3:08",
    src: "doston-ergashev-kambagalga.mp3",
  },
  {
    id: 1,
    title: "Sodaginam",
    artist: "Doston Ergashev",
    duration: "2:51",
    src: "doston-ergashev-soddaginam.mp3",
  },
  {
    id: 2,
    title: "Bevafo.dil",
    artist: "Jaliddin Ahmadaliyev",
    duration: "4:23",
    src: "jaloliddin-ahmadaliyev-bevafo-dil.mp3",
  },
  {
    id: 3,
    title: "Indamaygina",
    artist: "Jaliddin Ahmadaliyev",
    duration: "3:59",
    src: "jaloliddin-ahmadaliyev-indamaygina.mp3",
  },
  {
    id: 4,
    title: "Tuyingizga bormayman",
    artist: "Jaliddin Ahmadaliyev",
    duration: "3:04",
    src: "jaloliddin-ahmadaliyev-tuyingizga-bormayman.mp3",
  },
  {
    id: 5,
    title: "Yetmasmidi",
    artist: "Jaliddin Ahmadaliyev",
    duration: "6:00",
    src: "jaloliddin-ahmadaliyev-yetmasmidi.mp3",
  },
  {
    id: 6,
    title: "Birinchi sevgim",
    artist: "Xamdam Sobirov",
    duration: "4:04",
    src: "xamdam-sobirov-birinchi-sevgi.mp3",
  },
  {
    id: 7,
    title: "Malohat",
    artist: "Xamdam Sobirov",
    duration: "3:34",
    src: "xamdam-sobirov-malohat.mp3",
  },
  {
    id: 8,
    title: "Qizil kuylak",
    artist: "Xamdam Sobirov",
    duration: "3:20",
    src: "xamdam-sobirov-rayhon-qizil-kuylak.mp3",
  },
  {
    id: 9,
    title: "Yaxshi kursam nima qibti",
    artist: "Xamdam Sobirov",
    duration: "4:13",
    src: "xamdam-sobirov-yaxshi-korsam-nima-qilibdi.mp3",
    
  },
];

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) return;
  else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }

};








