// Load the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an <iframe> (and YouTube player) after the API code downloads
var player, player2;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('audio', {
        // height: '0',
        // width: '0',
        // videoId: 'eQcZ9AjrSuQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    player2 = new YT.Player('rain', {
        // events: {
        //     'onReady': onPlayerReady,
        //     'onStateChange': onPlayerStateChange
        // }
    });
}

// The API will call this function when the video player is ready
function onPlayerReady(event) {
    console.log("Player ready");
    console.log(player.getPlayerState());
    console.log(event.data);
    console.log(event.target);
    event.target.playVideo();
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("now playing...");
    }
    console.log("Player state has changed!");
    if (event.data == 3) {
        console.log(event.data);
    }
    if (event.data == 0) {
        console.log(event.data);
        console.log("Starting next song in playlist...");
        nextTrack();
    }
}

/* MY FUNCTIONS */

// Shuffle... Maybe...

function shufflePls(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i+1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Audio Controls

/*
    LOVEDRUNK (Piano Version)
    LULLABY FOR A CAT (Unedited)
    LOVE STORY
    HAPPEN ENDING
    1825 (PAPER CRANES)
    HOME IS FAR AWAY (Piano Cover)
    HARAJUKU DAYS
    HOME - cCuJyEwTozU
    FOREST
    SLEEPLESS (Piano Cover)
    OCEAN. SAND. TREES *
    EMOLOGUE *
*/
var playlist = [
        "HzE45YJQOLY",
        "Sb9Xu17T4CU",
        "dY2AUNCNNpA",
        "zSQrkrM9ynA",
        "pHzKU2pyluo",
        "ixN3IzhQJFI",
        "eQcZ9AjrSuQ",
        "RyKL3kIJYD0",
        "mEYsvWaLZGo",
        "4i8rPsG3YZ8",
        "NkDgP4jbAno"];

var notes =
    ["Sometimes the unimaginable occurs in order to fatten our imagination.",
    "Something that is unexplainable is either a miracle or you're just not that good at explaining.",
    "I reminisce, not to dwell in the past, but to practice for a future worth remembering.",
    "My heart goes through four seasons in a single day.",
    "I don't mind being strange but I mind being a stranger.",
    "The things we've let go of find it very hard to let go of us.",
    "People in your way are probably just as lost as you.",
    "I'm not lazy. I'm just busy being lazy.",
    "Sometimes regret is just a sign of a healthy imagination.",
    "If you must cry, at least don't do it alone.",
    "Life is short and a season is shorter. Relish the heat; relish the cold.",
    "I'm not an outsider. I'm just not near you.",
    "My place in this world is far from somewhere I can call \"my place.\"",
    "There's a parking lot in my heart and too many people have left without their cars.",
    "Before you decide that I'm nothing you expected, could you try to expect nothing but me?",
    "I must have a designated rain cloud.",
    "At times, maybe is all that you may be.",
    "The truth doesn't require acknowledgement to be exactly what it is.",
    "I pray that no one dies young, no more sad goodbyes.",
    "If you envy the gifted, try opening the gift in your hands.",
    "They say there's a time and place for everything, but I have neither a watch nor a map.",
    "Two halves only make a hole.",
    "The temperature of the heart has nothing to do with the weather.",
    "My day to day, as a playlist, would be one long song on repeat.",
    "Passion is the narrowing of the gap between who I wish to be and who I will be.",
    "Spring. The way my year is jumping off, it appears to be broken.",
    "We need a new emotion that is apathy and sympathy at the same time."];

function myInit() {
    shufflePls(playlist);
    shufflePls(notes);
    newNote();
    readyAudio();
    console.log(playlist);
    console.log(notes);
}

// .getPlayerState() not working with nextTrack()
var audioOn = false;
function startAndStop() {
    console.log("Audio is: "+audioOn);
    if (audioOn) {
        player.pauseVideo();
        audioOn = false;
    } else {
        player.playVideo();
        audioOn = true;
    }
}

function readyAudio() {
    nextTrack();
    player.pauseVideo(); // Prevent autoplay
    audioOn = false;
}

function nextTrack() {
    var next = pickNext();
    player.loadVideoById(next);
    audioOn = true;
    // var audio = document.getElementById("audio");
    // audio.setAttribute("src","https://www.youtube.com/embed/"+next+"?&autoplay=0&loop=0&enablejsapi=true&widgetid=1");
    // console.log("Changing music...");
}

var songNum = -1;
function pickNext() {
    if (songNum >= playlist.length-1) {
        songNum = 0;
        shufflePls(playlist);
    } else {
        songNum += 1;
    }
    console.log(playlist[songNum]);
    return playlist[songNum];
}

var itsRaining = false;
function addRain() {
    if (itsRaining) {
        player2.pauseVideo();
        itsRaining = false;
    } else {
        player2.playVideo();
        itsRaining = true;
        console.log("Adding rain...");
    }
}

// Text Controls

// var count = notes.length;
// var lastNote = Math.floor(Math.random()*count);

var noteNum = 0;
function newNote() {
    // var nextNote = lastNote;
    // while(nextNote === lastNote) {
    //     nextNote = Math.floor(Math.random()*count);
    // }
    // lastNote = nextNote;
    // console.log(lastNote, nextNote);

    if (noteNum >= notes.length-1) {
        shufflePls(notes);
        noteNum = 0;
    }

    var text = document.getElementById("note");
    text.innerHTML= notes[noteNum];
    noteNum++;

    return;
}
