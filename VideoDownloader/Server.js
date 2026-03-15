const express = require("express");
const { exec } = require("node:child_process");
const app = express();
const ffmpeg = require("ffmpeg-static");
const fs = require("fs");

const os = require("os")
const path = require("path")

app.use(express.json())
app.use(express.static("public"))



const DownloadPath = path.join(os.homedir(),"Downloads")


app.post("/download",(req,res) => {
    const { url , format } = req.body;
  

    if (format == "mp3") {
        
             exec(`yt-dlp --ffmpeg-location "${ffmpeg}" -x --audio-format  ${format} "${url}" -o "${DownloadPath}/%(title)s.%(ext)s"`, 
    (error, stdout, stderr) => {
        if (error) {
            res.json({ message: "Download failed!" });
            console.log("ERROR:", error.message);
            console.log("STDERR:", stderr);
            return;
        }
        res.json({ message: "Download complete!" });
    });


    }else if (format == "mp4") {


                 exec(`yt-dlp --ffmpeg-location "${ffmpeg}"   --format ${format} "${url}" -o "${DownloadPath}/%(title)s.%(ext)s"`, 
    (error, stdout, stderr) => {
        if (error) {
            res.json({ message: "Download failed!" });
            console.log("ERROR:", error.message);
            console.log("STDERR:", stderr);
            return;
        }
        res.json({ message: "Download complete!" });
    });


    }
   


})


app.listen(3000, () => console.log("Running on port 3000"),
exec("start http://localhost:3000")
);