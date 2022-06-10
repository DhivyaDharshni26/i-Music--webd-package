console.log("Welcome to i-Music");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs3/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs3 = [
    {songName: "Always you", filePath: "songs3/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Back to you", filePath: "songs3/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Don't let it break your heart", filePath: "songs3/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Just like you", filePath: "songs3/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Miss you", filePath: "songs3/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Perfect now", filePath: "songs3/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Two of us", filePath: "songs3/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Walls", filePath: "songs3/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "We made it", filePath: "songs3/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Just hold on", filePath: "songs3/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs3[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs3[i].songName; 
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
        audioElement.src = `songs3/${songIndex+1}.mp3`;
        masterSongName.innerText = songs3[songIndex].songName;
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
    audioElement.src = `songs3/${songIndex+1}.mp3`;
    masterSongName.innerText = songs3[songIndex].songName;
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
    audioElement.src = `songs3/${songIndex+1}.mp3`;
    masterSongName.innerText = songs3[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})