let sound = new Audio();
let songs = [
  {
    title: "Tay To",
    singer: "MCK",
    src: "./Tay-To-Rapital-RPT-Phongkhin-MCK.mp3",
    img: `./tayto.jpg`,
  },
  {
    title: "Chơi Đồ",
    singer: "MCK",
    src: "./Choi-Do-MCK-Wxrdie-Sony-Tran.mp3",
    img: "./choido.jpg",
  }, 
  
  {  
    title: "Thôi Hẹn Em",
    singer: "Madihu",
    src: "./Thoi-Hen-Em-Madihu.mp3",
    img: "./thoihenem.jpg",
  },
];
let int = 0;
let isRepeat = false;
let isRandom = false;
sound.src = songs[int].src;
$(".song-name").text(songs[int].title);
$(".cd-thumb").css("background-image", `url("${songs[int].img}")`);
$(function () {
  songs.forEach((s, i) => {
    document.querySelector(".playlist").innerHTML += `
					<div class="song" onclick="pickSong(${i})">
						<div class="thumb" style="background-image: url('${s.img}')"></div>
						<div class="body">
							<h3 class="title">${s.title}</h3>
							<p class="author">${s.singer}</p>
						</div>
						<div class="option">
							<i class="fas fa-ellipsis-h"></i>
						</div>
					</div>
				`;
  });
});

sound.onended = function () {
  var songlist = $(".song").toArray();
  songlist[int].classList.remove("active");

  if (isRandom) {
    let newInt = Math.floor(Math.random() * songs.length);
    while (int == newInt) {
      newInt = Math.floor(Math.random() * songs.length);
    }
    int = newInt;
    sound.src = songs[int].src;
    playsong();
  } else if (isRepeat) {
    int++;
    if (int > songs.length - 1) int = 0;
    sound.src = songs[int].src;
    playsong();
  } else {
    int++;
    if (int > songs.length - 1) {
      int = 0;
      $(".player").removeClass("playing");
      $(".song-name").text("");
      $(".cd-thumb").css("background-image", `url("")`);
    } else {
      sound.src = songs[int].src;
      playsong();
    }
  }
};

sound.ontimeupdate = function () {
  $("#progress").val(Math.floor((this.currentTime / sound.duration) * 100));
};
$("#progress").change(function (e) {
  sound.currentTime = (e.target.value / 100) * sound.duration;
});

$("#pause").click(() => {
  sound.pause();
  $(".player").removeClass("playing");
});
$("#prev").click(() => {
  var songlist = $(".song").toArray();
  songlist[int].classList.remove("active");
  int--;
  if (int < 0) int = songs.length - 1;
  sound.src = songs[int].src;
  playsong();
});
$("#next").click(() => {
  var songlist = $(".song").toArray();
  songlist[int].classList.remove("active");
  if (isRandom) {
    let newInt = Math.floor(Math.random() * songs.length);
    while (int == newInt) {
      newInt = Math.floor(Math.random() * songs.length);
    }
    int = newInt;
  } else {
    int++;
    if (int > songs.length - 1) int = 0;
  }
  sound.src = songs[int].src;
  playsong();
});

function playsong() {
  $(".cd-thumb").css("background-image", `url("${songs[int].img}")`);
  $(".song-name").text(songs[int].title);
  var songlist = $(".song").toArray();
  songlist[int].classList.add("active");
  sound.play();
  $(".player").addClass("playing");
}
function pickSong(index) {
  var songlist = $(".song").toArray();
  songlist[int].classList.remove("active");
  int = index;
  sound.src = songs[int].src;
  playsong();
}

var media = songs[0];
var volume = $("#volumeSlider")[0];

media.volume = volume.value;

$("#volumeSlider").on("input", function () {
  media.volume = this.value;
});
