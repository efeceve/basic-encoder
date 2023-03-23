// Funciones de conversión
function base64ToText(base64) {
  try {
      const text = decodeURIComponent(escape(atob(base64)));
      return text;
  } catch (error) {
      console.error("Error al convertir base64 a texto:", error);
      return null;
  }
}

function textToBase64(text) {
  try {
      const base64 = btoa(unescape(encodeURIComponent(text)));
      return base64;
  } catch (error) {
      console.error("Error al convertir el texto a base64:", error);
      return null;
  }
}

// Funciones de copiado al portapapeles
function copyToClipboard(elementId) {
  const tempInput = document.createElement("input");
  const textToCopy = document.getElementById(elementId).textContent;
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Funciones de animación de texto
function animateText(elementId) {
  const textElement = document.getElementById(elementId);
  textElement.classList.add("text-animated");
  setTimeout(() => {
      textElement.classList.remove("text-animated");
  }, 500);
}

// Eventos
document.getElementById("convertButton").addEventListener("click", () => {
  const base64 = document.getElementById("base64Input").value;
  const text = base64ToText(base64);
  const divAlert = document.getElementById("alertResult");
  const divAlertError = document.getElementById("alertErrorDecoded");
  if (text === null || text === "") {
      divAlertError.style.display = "block";
      document.getElementById("errorDecodedResult").textContent = "Error converting the text";
      setTimeout(() => {
          divAlertError.style.display = "none";
      }, 3000);
  } else {
      document.getElementById("result").textContent = text;
      divAlert.style.display = "block";
  }
});

document.getElementById("encodeButton").addEventListener("click", () => {
  const text = document.getElementById("textInput").value;
  const base64 = textToBase64(text);
  const divAlert = document.getElementById("alertEncodedResult");
  const divAlertError = document.getElementById("alertErrorEncoded");
  if (base64 === null || base64 === "") {
      divAlertError.style.display = "block";
      document.getElementById("errorEncodedResult").textContent = "Error converting the text";
      setTimeout(() => {
          divAlertError.style.display = "none";
      }, 3000);
  } else {
      divAlert.style.display = "block";
      document.getElementById("encodedResult").textContent = base64;
  }
});

document.getElementById("clearTextEncode").addEventListener("click", () => {
  const divAlert = document.getElementById("alertEncodedResult");
  document.getElementById("textInput").value = "";
  document.getElementById("encodedResult").textContent = "";
  divAlert.style.display = "none";
});

document.getElementById("clearTextconvert").addEventListener("click", () => {
  const divAlert = document.getElementById("alertResult");
  document.getElementById("base64Input").value = "";
  document.getElementById("result").textContent = "";
  divAlert.style.display = "none";
});

document.getElementById("copyButtonEncodedResult").addEventListener("click", () => {
  copyToClipboard("encodedResult");
  animateText("alertEncodedResult");
});

document.getElementById("copyButtonDecodedResult").addEventListener("click", () => {
    copyToClipboard("result");
    animateText("alertResult");
});