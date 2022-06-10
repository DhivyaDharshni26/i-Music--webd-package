console.log("Welcome to i-Music");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs1/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs1 = [
    {songName: "Ashe-Kansas", filePath: "songs1/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Nice to meet ya", filePath: "songs1/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "On the loose", filePath: "songs1/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Slow hands", filePath: "songs1/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "This town", filePath: "songs1/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Too much to ask", filePath: "songs1/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Black and white", filePath: "songs1/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Flickr", filePath: "songs1/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "No judgement", filePath: "songs1/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Put a little love on me", filePath: "songs1/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs1[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs1[i].songName; 
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
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

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
        audioElement.src = `songs1/${songIndex+1}.mp3`;
        masterSongName.innerText = songs1[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs1/${songIndex+1}.mp3`;
    masterSongName.innerText = songs1[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs1/${songIndex+1}.mp3`;
    masterSongName.innerText = songs1[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})