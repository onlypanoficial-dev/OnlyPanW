async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  // Mostrar mensaje del usuario
  mostrarMensaje(userText, "user");
  input.value = "";

  // Mostrar "Escribiendo..."
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot";
  loadingDiv.textContent = "Escribiendo...";
  chatContainer.appendChild(loadingDiv);

  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    loadingDiv.textContent = data.reply || "⚠️ No se obtuvo respuesta.";
  } catch (err) {
    loadingDiv.textContent = "⚠️ Error al conectar con IA.";
  }

  chatContainer.scrollTop = chatContainer.scrollHeight;
}
