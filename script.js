// Configuración de la API (¡NO expongas tu token en GitHub Pages!)
const API_URL = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-es";
const API_TOKEN = "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"; // ¡Reemplaza con tu token!

async function traducirTexto() {
    const textoIngles = document.getElementById("textoIngles").value;
    const resultadoDiv = document.getElementById("resultado");

    if (!textoIngles.trim()) {
        resultadoDiv.textContent = "⚠️ Por favor, escribe algo para traducir.";
        return;
    }

    resultadoDiv.textContent = "Traduciendo...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: textoIngles })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        resultadoDiv.textContent = data[0].generated_text;
    } catch (error) {
        resultadoDiv.textContent = `❌ Error: ${error.message}`;
        console.error("Error en la traducción:", error);
    }
}
