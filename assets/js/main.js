const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let player;
let currentVideoId = 'wXhTHyIgQ_U'
const increaseVolume = $('.increase_volume')
const decreaseVolume = $('.decrease_volume')
const volume = $('.volume')
const progress = $('.progress')
const playBtn = $('.podcast_btn_play')
const durationTime = $('.timer .duration');
const remainingTime = $('.remaining');
const playbackSpeed = $('.podcast_playback_speed')
const rewind = $('.podcast_rewind')
const skip = $('.podcast_skip')
const podcastScroll = $('.podcast_scroll')
const increaseVolumeScroll = $('.podcast_scroll .increase_volume')
const decreaseVolumeScroll = $('.podcast_scroll .decrease_volume')
const volumeScroll = $('.podcast_scroll .volume')
const progressScroll = $('.podcast_scroll .progress')
const playBtnScroll = $('.podcast_scroll .podcast_btn_play')
const durationTimeScroll = $('.podcast_scroll .timer .duration');
const remainingTimeScroll = $('.podcast_scroll .remaining');
const playbackSpeedScroll = $('.podcast_scroll .podcast_playback_speed')
const rewindScroll = $('.podcast_scroll .podcast_rewind')
const skipScroll = $('.podcast_scroll .podcast_skip')
const loadYouTubeAPI = () => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
loadYouTubeAPI();

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: currentVideoId, // Replace with the desired video ID
        playerVars: {
            autoplay: 0,
            controls: 0,
        },
        events: {
            onReady: onYouTubePlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

const changeVolume = (percentage) => {
    return 'background: linear-gradient(to right, #2d2d2d, #2d2d2d ' + percentage + '%, #ffffff ' + percentage + '%, #ffffff 100%)'
}
volume.style = changeVolume(+volume.value)
volumeScroll.style = changeVolume(+volumeScroll.value)
const changeProgress = () => {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progressPercent = currentTime / duration * 100;
    if (duration) {
        progress.value = progressPercent;
        progress.style = 'background: linear-gradient(to right, #2d2d2d, #2d2d2d ' + progressPercent + '%, #ffffff ' + progressPercent + '%, #ffffff 100%)'
        progressScroll.value = progressPercent;
        progressScroll.style = 'background: linear-gradient(to right, #2d2d2d, #2d2d2d ' + progressPercent + '%, #ffffff ' + progressPercent + '%, #ffffff 100%)'
    }
}
const formatTimer = (number) => {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
const displayTimer = () => {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    remainingTime.textContent = formatTimer(currentTime);
    remainingTimeScroll.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
        durationTimeScroll.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(Math.ceil(duration));
        durationTimeScroll.textContent = formatTimer(Math.ceil(duration));
    }
}
playBtn.addEventListener('click', function () {
    console.log(123)
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
        playBtn.children[0].classList.remove('bi-pause-circle-fill')
        playBtn.children[0].classList.add('bi-play-circle-fill')
        playBtnScroll.children[0].classList.remove('bi-pause-circle-fill')
        playBtnScroll.children[0].classList.add('bi-play-circle-fill')

    } else {
        player.playVideo();
        playBtn.children[0].classList.remove('bi-play-circle-fill')
        playBtn.children[0].classList.add('bi-pause-circle-fill')
        playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
        playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
    }
})
playBtnScroll.addEventListener('click', function () {
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
        playBtn.children[0].classList.remove('bi-pause-circle-fill')
        playBtn.children[0].classList.add('bi-play-circle-fill')
        playBtnScroll.children[0].classList.remove('bi-pause-circle-fill')
        playBtnScroll.children[0].classList.add('bi-play-circle-fill')

    } else {
        player.playVideo();
        playBtn.children[0].classList.remove('bi-play-circle-fill')
        playBtn.children[0].classList.add('bi-pause-circle-fill')
        playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
        playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
    }
})
const onYouTubePlayerReady = () => {
    player.setVolume(+volume.value)
    player.setVolume(+volumeScroll.value)
    displayTimer()
    setInterval(changeProgress, 500);
    setInterval(displayTimer, 500);
}

const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.pauseVideo();
        playBtn.children[0].classList.remove('bi-pause-circle-fill')
        playBtn.children[0].classList.add('bi-play-circle-fill')
        playBtnScroll.children[0].classList.remove('bi-pause-circle-fill')
        playBtnScroll.children[0].classList.add('bi-play-circle-fill')
    }
}

progress.addEventListener('input', function () {
    const seekTime = player.getDuration() * (+progress.value / 100);
    player.seekTo(seekTime, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
    playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
    playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
})
progressScroll.addEventListener('input', function () {
    const seekTime = player.getDuration() * (+progressScroll.value / 100);
    player.seekTo(seekTime, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
    playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
    playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
})
increaseVolume.addEventListener('click', function () {
    const currentVolume = +volume.value;
    if (currentVolume < 100) {
        player.setVolume(currentVolume + 10);
        volume.value = currentVolume + 10
        volumeScroll.value = currentVolume + 10
        const percentage = (currentVolume + 10 - +volume.min) / (+volume.max - +volume.min) * 100
        volume.style = changeVolume(percentage)
        volumeScroll.style = changeVolume(percentage)
    }
})
increaseVolumeScroll.addEventListener('click', function () {
    const currentVolume = +volumeScroll.value;
    if (currentVolume < 100) {
        player.setVolume(currentVolume + 10);
        volume.value = currentVolume + 10
        volumeScroll.value = currentVolume + 10
        const percentage = (currentVolume + 10 - +volumeScroll.min) / (+volumeScroll.max - +volumeScroll.min) * 100
        volume.style = changeVolume(percentage)
        volumeScroll.style = changeVolume(percentage)
    }
})
decreaseVolume.addEventListener('click', function () {
    const currentVolume = +volume.value;
    if (currentVolume > 0) {
        player.setVolume(currentVolume - 10);
        volume.value = currentVolume - 10
        volumeScroll.value = currentVolume - 10
        const percentage = (currentVolume - 10 - +volume.min) / (+volume.max - +volume.min) * 100
        volume.style = changeVolume(percentage)
        volumeScroll.style = changeVolume(percentage)
    }
})
decreaseVolumeScroll.addEventListener('click', function () {
    const currentVolume = +volumeScroll.value;
    if (currentVolume > 0) {
        player.setVolume(currentVolume - 10);
        volumeScroll.value = currentVolume - 10
        volume.value = currentVolume - 10
        const percentage = (currentVolume - 10 - +volumeScroll.min) / (+volumeScroll.max - +volumeScroll.min) * 100
        volumeScroll.style = changeVolume(percentage)
        volume.style = changeVolume(percentage)
    }
})
volume.addEventListener('input', function () {
    player.setVolume(+volume.value)
    volumeScroll.value = +volume.value
    const percentage = (+volume.value - +volume.min) / (+volume.max - +volume.min) * 100
    volume.style = changeVolume(percentage)
    volumeScroll.style = changeVolume(percentage)
})
volumeScroll.addEventListener('input', function () {
    player.setVolume(+volumeScroll.value)
    volume.value = +volumeScroll.value
    const percentage = (+volumeScroll.value - +volumeScroll.min) / (+volumeScroll.max - +volumeScroll.min) * 100
    volume.style = changeVolume(percentage)
    volumeScroll.style = changeVolume(percentage)
})
volume.addEventListener('mousemove', function () {
    player.setVolume(+volume.value)
    volumeScroll.value = +volume.value
    const percentage = (+volume.value - +volume.min) / (+volume.max - +volume.min) * 100
    volume.style = changeVolume(percentage)
    volumeScroll.style = changeVolume(percentage)
})
volumeScroll.addEventListener('mousemove', function () {
    player.setVolume(+volumeScroll.value)
    volume.value = +volumeScroll.value
    const percentage = (+volumeScroll.value - +volumeScroll.min) / (+volumeScroll.max - +volumeScroll.min) * 100
    volume.style = changeVolume(percentage)
    volumeScroll.style = changeVolume(percentage)
})
playbackSpeed.addEventListener('click', function () {
    const currentPlayback = player.getPlaybackRate()
    switch (currentPlayback) {
        case 0.25:
            player.setPlaybackRate(0.5)
            playbackSpeed.children[1].textContent = 0.5 + 'x'
            break;
        case 0.5:
            player.setPlaybackRate(1)
            playbackSpeed.children[1].textContent = 1 + 'x'
            break;
        case 1:
            player.setPlaybackRate(1.5)
            playbackSpeed.children[1].textContent = 1.5 + 'x'
            break;
        case 1.5:
            player.setPlaybackRate(2)
            playbackSpeed.children[1].textContent = 2 + 'x'
            break;
        case 2:
            player.setPlaybackRate(0.25)
            playbackSpeed.children[1].textContent = 0.25 + 'x'
            break;
        default:
            player.setPlaybackRate(1)
            playbackSpeed.children[1].textContent = 1 + 'x'
            break
    }
})
playbackSpeedScroll.addEventListener('click', function () {
    const currentPlayback = player.getPlaybackRate()
    switch (currentPlayback) {
        case 0.25:
            player.setPlaybackRate(0.5)
            playbackSpeed.children[1].textContent = 0.5 + 'x'
            playbackSpeedScroll.children[1].textContent = 0.5 + 'x'
            break;
        case 0.5:
            player.setPlaybackRate(1)
            playbackSpeed.children[1].textContent = 1 + 'x'
            playbackSpeedScroll.children[1].textContent = 1 + 'x'
            break;
        case 1:
            player.setPlaybackRate(1.5)
            playbackSpeed.children[1].textContent = 1.5 + 'x'
            playbackSpeedScroll.children[1].textContent = 1.5 + 'x'
            break;
        case 1.5:
            player.setPlaybackRate(2)
            playbackSpeed.children[1].textContent = 2 + 'x'
            playbackSpeedScroll.children[1].textContent = 2 + 'x'
            break;
        case 2:
            player.setPlaybackRate(0.25)
            playbackSpeed.children[1].textContent = 0.25 + 'x'
            playbackSpeedScroll.children[1].textContent = 0.25 + 'x'
            break;
        default:
            player.setPlaybackRate(1)
            playbackSpeed.children[1].textContent = 1 + 'x'
            playbackSpeedScroll.children[1].textContent = 1 + 'x'
            break
    }
})
rewind.addEventListener('click', function () {
    const seekTime = player.getDuration() * (+progress.value / 100);
    player.seekTo(seekTime-10, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
})
rewindScroll.addEventListener('click', function () {
    const seekTime = player.getDuration() * (+progressScroll.value / 100);
    player.seekTo(seekTime-10, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
    playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
    playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
})
skip.addEventListener('click', function () {
    const seekTime = player.getDuration() * (+progress.value / 100);
    player.seekTo(seekTime+10, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
})
skipScroll.addEventListener('click', function () {
    const seekTime = player.getDuration() * (+progressScroll.value / 100);
    player.seekTo(seekTime+10, true);
    changeProgress()
    player.playVideo();
    playBtn.children[0].classList.remove('bi-play-circle-fill')
    playBtn.children[0].classList.add('bi-pause-circle-fill')
    playBtnScroll.children[0].classList.remove('bi-play-circle-fill')
    playBtnScroll.children[0].classList.add('bi-pause-circle-fill')
})
let scrollPos = 0;
function checkPosition () {
    let windowY = window.scrollY;
    if (windowY > 400) {
        podcastScroll.style = 'transform: translate(-50%,0%)'
    } else {
        podcastScroll.style = 'transform: translate(-50%,200%)'
    }
    scrollPos = windowY;
}
window.addEventListener('scroll', checkPosition)