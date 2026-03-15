
var Mp3Button = document.getElementById("Mp3Button");
var Mp4Button = document.getElementById("Mp4Button");
var InputArea = document.getElementById("InputArea");
var StatusText = document.getElementById("StatusText");

var Busy = false;

 async function SendURL(video_format) {
        Mp3Button.style.opacity = 0;
    Mp4Button.style.opacity = 0;
       StatusText.textContent = "waiting...."
        const link = InputArea.value;

       const response =  fetch("/download", {
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body :JSON.stringify({ url: link, format : video_format})
        })

       const data = await (await response).json();
       StatusText.textContent = data.message;
       Busy = false;
    Mp3Button.style.opacity = 1;
    Mp4Button.style.opacity = 1;

        
}

Mp3Button.onclick = function() {
    if (Busy == true) {return}
    Busy = true
    SendURL("mp3")
}

Mp4Button.onclick = function() {
    if (Busy == true) {return}

    SendURL("mp4")


}