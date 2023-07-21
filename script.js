console.log("Welcome to Spotify");

// Initialize the Variables

// songindex variable tells which song is playing at a time
let songIndex = 0;

let audioElement = new Audio('songs/1.mp3');
// audioElement.play();

// this will help to add eventlistner in on play button
let masterPlay = document.getElementById('masterPlay');

let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// let element = document.getElementById( "fontsize" );
// element.style.fontsize = "xxx-large";

let songs = [
    {songName: "Naseeb Se", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Pasoori Nu", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Arijit Mashup 2023", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kesariya", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Raatan Lambiyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Hai Manjha tera", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Hawayein", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Main Dil Ko Samjha", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tere Vaaste", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Dil Diyan Gallan", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// change song images 
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar (which plays with song)
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// make clickable all play buttons
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // play song as per click
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// adding eventlistner to play next song 
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

// adding eventlistner to play previous song 
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})