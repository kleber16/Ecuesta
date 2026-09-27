document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.question-step');
    let currentStepIndex = 0;

    // 🖼️ RUTA DE LA IMAGEN DEL POLÍTICO ALEMÁN (usa barras normales '/')
    const germanPoliticianImg = "assets/politico.jpg";

    // Mensajes insistentes para cuando intente presionar "No"
    const insistMessages = [
        "Bist du sicher, Tim? Überleg es dir gut...",
        "Dieser Button steht dir nicht...",
        "Hey! Der grüne Button sieht viel hübscher aus 😏",
        "Ein 'Nein' akzeptiere ich nicht als Antwort 😜",
        "Versuch es noch einmal, wenn du kannst!"
    ];

    // Opciones de comportamiento cuando presiona "NO"
    const behaviors = [0, 1, 2, 0, 1];

    steps.forEach((step, index) => {
        const btnYes = step.querySelector('.btn-yes');
        const btnNo = step.querySelector('.btn-no');
        const insistMsgDiv = step.querySelector('.insist-message');

        let yesScale = 1;

        if (btnYes) {
            btnYes.addEventListener('click', () => {
                goToNextStep();
            });
        }

        if (btnNo) {
            btnNo.addEventListener('click', (e) => {
                e.preventDefault();

                // 🔄 Cambia la imagen de la pregunta actual por la del político
                const currentImage = step.querySelector('.step-image');
                if (currentImage && germanPoliticianImg) {
                    currentImage.src = germanPoliticianImg;
                }
                
                // Elegir comportamiento según el paso
                const behavior = behaviors[index % behaviors.length];

                // Acción 1: Mensaje insistente
                const randomMsg = insistMessages[Math.floor(Math.random() * insistMessages.length)];
                if (insistMsgDiv) insistMsgDiv.innerText = randomMsg;

                // Acción 2: Agrandar botón "SÍ"
                if (behavior === 1 || behavior === 2) {
                    yesScale += 0.35;
                    btnYes.style.transform = `scale(${yesScale})`;
                }

                // Acción 3: Mover botón "NO" de forma aleatoria dentro de la tarjeta
                if (behavior === 0 || behavior === 2) {
                    btnNo.style.position = 'absolute';
                    const randomX = Math.floor(Math.random() * 200) - 100;
                    const randomY = Math.floor(Math.random() * 100) - 50;
                    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
                }
            });
        }
    });

    function goToNextStep() {
        if (currentStepIndex < steps.length - 1) {
            steps[currentStepIndex].classList.remove('active');
            currentStepIndex++;
            steps[currentStepIndex].classList.add('active');
        }
    }
});