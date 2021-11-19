let img1;
let img2;
let img3;
let img4;
let img5;
var img = "";
var upload = "";
objects = [];
status1 = "";

function preload(){
    img1 = loadImage("img1.jpg");
    img2 = loadImage("img2.jpg");
    img3 = loadImage("img3.png");
    img4 = loadImage("img4.png");
    img5 = loadImage("img5.png");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    Odetect = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("CocoSSD is on the service....");
    status1 = true;
    Odetect.detect(img1, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img1, 0, 0, 640, 420);
    if (img == "Image 1"){
        image(img1, 0, 0, 640, 420);
        Odetect.detect(img1, gotResult);    
    } else if (img == "Image 2"){
        image(img2, 0, 0, 640, 420);
        Odetect.detect(img2, gotResult);    
    } else if (img == "Image 3"){
        image(img3, 0, 0, 640, 420);
        Odetect.detect(img3, gotResult);    
    } else if (img == "Image 4"){
        image(img4, 0, 0, 640, 420);
        Odetect.detect(img4, gotResult);    
    } else if (img == "Image 5"){
        image(img5, 0, 0, 640, 420);
        Odetect.detect(img5, gotResult);    
    } else if (upload != ""){
        image(upload, 0, 0, 640, 420);
        Odetect.detect(upload, gotResult);
    }
    if (status1 != ""){
        for (index = 0; index < objects.length; index++) {
            console.log("trgegergg");
            fill("rgb(255,0,0)");
            percent = floor(objects[index].confidence*100);
            text(objects[index].label+" "+percent+"%", objects[index].x+15, objects[index].y+15);
            noFill();
            stroke("rgb(255,0,0)");
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
        }
    }

    //fill("rgb(255, 0, 0)");
    /*text("Dog", 45, 75);
    noFill();
    stroke("rgb(255, 0, 0)");
    rect(30, 60, 450, 350);*/

    //fill("rgb(255, 0, 0)");
    /*text("Cat", 320, 55);
    noFill();
    stroke("rgb(255, 0, 0)");
    rect(300, 40, 280, 350);*/
}


Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function(button) {
      const hiddenInput = button.parentElement.querySelector(
        ".file-upload__input"
      );
      const label = button.parentElement.querySelector(".file-upload__label");
      const defaultLabelText = "No file(s) selected";
  
      // Set default text for label
      label.textContent = defaultLabelText;
      label.title = defaultLabelText;
  
      button.addEventListener("click", function() {
        hiddenInput.click();
      });
  
      hiddenInput.addEventListener("change", function() {
        console.log(hiddenInput.files);
        const filenameList = Array.prototype.map.call(hiddenInput.files, function(
          file
        ) {
          return file.name;
        });
  
        label.textContent = filenameList.join(", ") || defaultLabelText;
        label.title = label.textContent;
      });
    }
  ); 
  
function submit(){
    var e = document.getElementById("img");
    img = e.options[e.selectedIndex].text;
    upload = FileList[0].name;
}