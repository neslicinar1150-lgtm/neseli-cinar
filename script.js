const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("preview");
const resultBox = document.getElementById("result");
const plantText = document.getElementById("plantText");
const plantImage = document.getElementById("plantImage");

let detectedPlants = "";
const API_KEY = "BURAYA_API_KEY_YAZ"; // ← buraya kendi key’in

// Kamera aç
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream);

// Kamera foto çek
function takePhoto(){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video,0,0);
  preview.src = canvas.toDataURL("image/jpeg");
  detectPlant(canvas.toDataURL("image/jpeg"));
}

// Dosya yükle
function loadFile(e){
  const file = e.target.files[0];
  preview.src = URL.createObjectURL(file);
  detectPlant(file);
}

// Pl@ntNet API
async function detectPlant(image){
  resultBox.style.display = "none";
  plantText.innerText = "Tanınıyor...";

  const formData = new FormData();
  formData.append("images", image);
  formData.append("organs", "leaf");

  const res = await fetch(
    `https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}`,
    { method:"POST", body: formData }
  );

  const data = await res.json();

  if(!data.results || data.results.length === 0){
    showNoPlant();
    return;
  }

  const names = data.results
    .slice(0,3)
    .map(r => r.species.commonNames[0] || r.species.scientificName);

  detectedPlants = names.join(" ");

  plantImage.src = preview.src;
  plantText.innerText =
    "Bu resimde,\n" + names.join(", ") + " var.";

  resultBox.style.display = "block";
}

// Bitki yoksa
function showNoPlant(){
  resultBox.style.display = "block";
  plantText.innerText = ":(\nBitki bulunamadı.";
  detectedPlants = "";
}

// Kopyala
function copyPlants(){
  navigator.clipboard.writeText(detectedPlants);
  alert("Kopyalandı: " + detectedPlants);
}
