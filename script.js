$(".flip").click(function () {
   $(this).parents(".card__inner").toggleClass("flipped");
});


const password = document.getElementById("password");

password.addEventListener('click', function() {
   password.style.backgroundColor = 'black'; 
   password.style.color = '#0F0'
   password.style.borderColor ='#0F0'
},0);



const key = document.getElementById("key");

 key.addEventListener('click', function() {
 key.style.backgroundColor = 'black'; 
 key.style.color = '#0F0'
 key.style.borderColor ='#0F0'
},);

function generateHash() {
   const password = document.getElementById("password").value;
   const key = document.getElementById("key").value;
   const resultContainer = document.getElementById("resultContainer");
   const icon = document.querySelector(".icon");

   // Önceki ikonları temizle
   icon.innerHTML = "";
   resultContainer.innerHTML = "";

   if (password === "" || key === "") {
       alert("Please enter both password and key value.");
       return;
   }

   function mixStrings(str1, str2) {
       let combined = "";
       const minLength = Math.min(str1.length, str2.length);
       for (let i = 0; i < minLength; i++) {
           if (i < str1.length) combined += str1[i];
           if (i < str2.length) combined += str2[i];
       }
       if (str1.length < str2.length) {
           combined += str2.slice(str1.length).split("").reverse().join("");
       } else if (str2.length < str1.length) {
           combined += str1.slice(str2.length).split("").reverse().join("");
       }
       return combined;
   }

   const mixed = mixStrings(password, key);
   

   const hash = CryptoJS.MD5(mixed).toString(CryptoJS.enc.Hex);


   let splittext = hash.split("");

   // Converts the first letter after the second number to a capital letter
   let numberCount = 0;
   for (let i = 0; i < splittext.length; i++) {
       if (/\d/.test(splittext[i])) { 
           numberCount++;
           if (numberCount === 2) {
             // The first letter after the second number
               for (let j = i + 1; j < splittext.length; j++) {
                   if (/[a-z]/i.test(splittext[j])) { 
                       splittext[j] = splittext[j].toUpperCase(); 
                       break;
                   }
               }
               break;
           }
       }
   }

   // Convert the first letter before the last digit to a capital letter
   for (let k = splittext.length - 1; k >= 0; k--) {
       if (/\d/.test(splittext[k])) { 
           for (let m = k - 1; m >= 0; m--) {
               if (/[a-z]/i.test(splittext[m])) { 
                   splittext[m] = splittext[m].toUpperCase();
                   break; 
               }
           }
           break; 
       }
   }

   let l = 2;

   while (l < splittext.length) {
       if (!/[A-Z]/i.test(splittext[l])) {
           splittext[l] = "#";
       } else {
           for (let z = 1; z < splittext.length; z++) {
               if (!/[A-Z]/i.test(splittext[l + z])) {
                   splittext[l + z] = "#";
                   break;
               }
           }
       }
       l += Math.floor(splittext.length / 3);
   }

   const updatedHash = splittext.join("");
 

   const p = document.createElement("p");
   p.className = "result";
   p.textContent = updatedHash;
   p.style.color = "#0F0";
   p.style.display = "flex";
   p.style.justifyContent ="center";
   p.style.marginTop ="120px";
   p.style.fontSize = "20px";

  
   resultContainer.appendChild(p);

   

   const copy = document.createElement("i");
   copy.style.color = "white";
   copy.classList.add("fa-regular", "fa-copy");

   const copylink = document.createElement("button");
  copylink.style.background = "transparent"
  copylink.style.width ="3vw";
  copylink.style.height ="5vh";
  copylink.classList.add("copied")



    copylink.appendChild(copy);
   resultContainer.appendChild(copylink);
   resultContainer.style.textAlign = "center";

copylink.addEventListener("click", function() {
    navigator.clipboard.writeText(hash);
});


   const i = document.createElement("i");
   i.classList.add("fa-solid", "fa-check");
   let styles = {
       color: "#0F0",
       border: "1px solid #0F0",
       backgroundColor: "black",
       borderRadius: "50px",
       padding: "5px",
       float: "right",
   
   };
   
   $(i).css(styles);

   let styleshover = {
       backgroundColor: "#0F0",
       color: "white",
   };

   $(i).hover(
       function() {
           $(this).css(styleshover);
       },
       function() {
           $(this).css(styles);
       }
   );

   const a = document.createElement("a");
   a.setAttribute("href", "#resultContainer"); 
   a.appendChild(i);  
   icon.appendChild(a);  

   
  

   document.getElementById("reset").addEventListener("click", function() {
       document.getElementById("password").value = "";
   });

   document.getElementById("reset").addEventListener("click", function() {
       document.getElementById("key").value = "";
   });

   $('.copied').click(function(){
    $('.alert').removeClass("hide");
    $('.alert').addClass("show");

    
    setTimeout(function(){
        $('.alert').fadeOut(1000, function() {
            $(this).removeClass("show").addClass("hide");
        });
    }, 3000); 
});
  
}


var c = document.getElementById("c");
var ctx = c.getContext("2d");
function resizeCanvas() {
c.height = window.innerHeight;
c.width = window.innerWidth;
 columns = c.width / font_size;
drops = Array(Math.floor(columns)).fill(1);
}

window.addEventListener("resize", resizeCanvas);

 var binary = "110101010100101010000101010100100101010";
 binary = binary.split("");
var font_size = 13;
var columns = c.width / font_size;
var drops = Array(Math.floor(columns)).fill(1);

function draw() {
ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
ctx.fillRect(0, 0, c.width, c.height);
ctx.fillStyle = "#0F0";
ctx.font = font_size + "px arial";

for (var i = 0; i < drops.length; i++) {
var text = binary[Math.floor(Math.random() * binary.length)];
ctx.fillText(text, i * font_size, drops[i] * font_size);


if (drops[i] * font_size > c.height && Math.random() > 0.875) {
drops[i] = 0; }

drops[i]++;
}  }

resizeCanvas();
setInterval(draw, 50);


