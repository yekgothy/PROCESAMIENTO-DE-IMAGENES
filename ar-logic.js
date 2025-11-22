document.addEventListener("DOMContentLoaded", async () => {
  const scene = document.querySelector("a-scene");

  // ✅ Usamos el menú principal como UI container
  const uiContainer = document.querySelector(".menu");
  const scanHint = document.getElementById("scan-hint");
  const landingScreen = document.getElementById("landing-screen");
  const startScanBtn = document.getElementById("start-scan-btn");
  const viewerBtn = document.getElementById("viewer-btn");

  const btnModel = document.getElementById("btn-model");
  const btnVideo = document.getElementById("btn-video");
  const btnEffect = document.getElementById("btn-effect");
  const btnTrivia = document.getElementById("triviaBtn");
  const btnStats = document.getElementById("statsBtn");

  const loader = document.getElementById("loader");
  const loaderMessage = document.querySelector("#loader .loader-message");
  const overlayVideo = document.getElementById("overlayVideo");
  const overlayIframe = document.getElementById("overlayIframe");
  const youtubeFrame = document.getElementById("youtubeFrame");
  const youtubeLink = document.getElementById("youtubeLink");

  let experienceStarted = false;

  const beginExperience = () => {
    if (!experienceStarted) {
      experienceStarted = true;
      if (landingScreen) {
        landingScreen.classList.add("landing-dismissed");
      }
    }
    if (scanHint) {
      scanHint.classList.remove("hidden");
    }
  };

  [startScanBtn, viewerBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", beginExperience);
    }
  });

  let arData = [];

  /* 1️⃣ Cargar datos AR */
  try {
    const response = await fetch("ar-data.json");
    arData = await response.json();
    console.log("✅ Datos AR cargados:", arData);
  } catch (err) {
    if (loaderMessage) {
      loaderMessage.textContent = "No se pudieron cargar los datos AR.";
    } else {
      loader.textContent = "No se pudieron cargar los datos AR.";
    }
    console.error(err);
    return;
  }

  /* 2️⃣ Crear contenedor de assets */
  let assets = document.querySelector("a-assets");
  if (!assets) {
    assets = document.createElement("a-assets");
    scene.appendChild(assets);
  }

  /* 3️⃣ Entidad principal MindAR */
  const mindar = document.createElement("a-entity");
  mindar.setAttribute("mindar-image-targets", "");
  scene.appendChild(mindar);

  /* 4️⃣ Crear entidades dinámicas */
  arData.forEach((item, i) => {
    const targetIndexes = item.targets || [item.targetIndex ?? i];

    targetIndexes.forEach((tIndex) => {
      const target = document.createElement("a-entity");
      target.setAttribute("mindar-image-target", `targetIndex: ${tIndex}`);

      // === Texto informativo ===
      const infoText = document.createElement("a-text");
      infoText.setAttribute("value", item.infoText || "");
      infoText.setAttribute("align", "center");
      infoText.setAttribute("color", "#ffffff");
      infoText.setAttribute("width", "2");
      infoText.setAttribute("position", "0 -0.8 0");
      infoText.setAttribute("visible", "false");
      target.appendChild(infoText);

      // === Modelo 3D ===
      const modelId = `model-${tIndex}`;
      const modelAsset = document.createElement("a-asset-item");
      modelAsset.setAttribute("id", modelId);
      modelAsset.setAttribute("src", item.model?.src || "");
      assets.appendChild(modelAsset);

      const model = document.createElement("a-gltf-model");
      model.setAttribute("src", `#${modelId}`);
      model.setAttribute("scale", item.model?.scale || "1 1 1");
      model.setAttribute("position", "0 0.2 0");
      model.setAttribute("visible", "false");
      model.setAttribute("rotation", item.model?.rotation || "0 0 0");
      target.appendChild(model);

      // === Video (local mp4) ===
      const videoId = `video-${tIndex}`;
      const videoAsset = document.createElement("video");
      videoAsset.setAttribute("id", videoId);
      videoAsset.setAttribute("src", item.video?.src || "");
      videoAsset.setAttribute("crossorigin", "anonymous");
      videoAsset.setAttribute("preload", "auto");
      videoAsset.setAttribute("playsinline", "true");
      videoAsset.setAttribute("muted", "true");
      videoAsset.style.display = "none";
      assets.appendChild(videoAsset);

      const video = document.createElement("a-video");
      video.setAttribute("src", `#${videoId}`);
      video.setAttribute("width", "1.5");
      video.setAttribute("height", "0.85");
      video.setAttribute("position", "0 0 0.1");
      video.setAttribute("visible", "false");
      target.appendChild(video);

      mindar.appendChild(target);

      /* Eventos de detección */
      target.addEventListener("targetFound", () => {
        console.log(`Marcador detectado: ${item.targetName} (índice ${tIndex})`);

        beginExperience();

        uiContainer.classList.add("show");
        uiContainer.classList.remove("hide");
        if (scanHint) {
          scanHint.classList.add("hidden");
        }
        infoText.setAttribute("visible", "true");

        // Reset visual
        model.setAttribute("visible", "false");
        video.setAttribute("visible", "false");
        videoAsset.pause();
        videoAsset.currentTime = 0;
        overlayVideo.classList.remove("show");
        overlayIframe.classList.remove("show");

        /* === Botón Modelo === */
        btnModel.onclick = () => {
          model.setAttribute("visible", "true");
          model.removeAttribute("animation");
          model.removeAttribute("animation__2");

          const country = (item.targetName || "").toLowerCase();
          switch (country) {
            case "méxico":
              break;
            case "canadá":
              model.setAttribute("animation", {
                property: "position",
                dir: "alternate",
                dur: 2500,
                easing: "easeInOutSine",
                loop: true,
                to: "0 0.2 0"
              });
              break;
            case "estados unidos":
              model.setAttribute("animation", {
                property: "rotation",
                to: "0 360 0",
                dur: 3000,
                easing: "linear",
                loop: true
              });
              break;
            case "argentina":
              model.setAttribute("animation", {
                property: "position",
                dir: "alternate",
                dur: 1000,
                easing: "easeOutElastic",
                loop: true,
                to: "0 0.3 0"
              });
              break;
            case "brasil":
              model.setAttribute("animation", {
                property: "rotation",
                to: "360 360 0",
                dur: 5000,
                easing: "easeInOutQuad",
                loop: true
              });
              model.setAttribute("animation__2", {
                property: "scale",
                dir: "alternate",
                dur: 1800,
                to: "1.1 1.1 1.1",
                easing: "easeInOutSine",
                loop: true
              });
              break;
            default:
              model.setAttribute("animation", {
                property: "rotation",
                to: "0 360 0",
                dur: 4000,
                easing: "linear",
                loop: true
              });
              break;
          }
        };

        /* === Botón Video === */
        btnVideo.onclick = () => {
          const src = item.video?.src || "";
          const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

          // Ocultar ambos para reiniciar
          overlayVideo.classList.remove("show");
          overlayIframe.classList.remove("show");

          if (isYouTube) {
            youtubeFrame.src = src.replace("watch?v=", "embed/") + "?autoplay=1";
            youtubeLink.href = src;
            overlayIframe.classList.add("show");
          } else {
            overlayVideo.src = src;
            overlayVideo.classList.add("show");
            overlayVideo.play().catch(() => {});
          }

          // Mostrar filtros
          const filterPanel = document.getElementById("filter-panel");
          filterPanel.classList.remove("hidden");
          overlayVideo.style.pointerEvents = "none";
          uiContainer.style.pointerEvents = "auto";

          // Activar filtros
          const filterButtons = document.querySelectorAll("#filter-options button");
          filterButtons.forEach((btn) => {
            btn.onclick = () => {
              const filterValue = btn.dataset.filter;
              overlayVideo.style.filter = filterValue === "none" ? "none" : filterValue;
            };
          });

          // Cerrar filtros
          document.getElementById("close-filters").onclick = () => {
            filterPanel.classList.add("hidden");
            overlayVideo.style.filter = "none";
          };
        };

        /* === Botón Trivia === */
        btnTrivia.onclick = () => {
          const triviaSet = item.trivia || [];
          if (!triviaSet.length) return alert("No hay trivia disponible.");

          const triviaContainer = document.getElementById("trivia-container");
          const triviaQuestion = document.getElementById("trivia-question");
          const triviaOptions = document.getElementById("trivia-options");
          const triviaFeedback = document.getElementById("trivia-feedback");
          const triviaClose = document.getElementById("trivia-close");

          let currentIndex = 0;
          let correctCount = 0;

          const showQuestion = () => {
            const q = triviaSet[currentIndex];
            triviaQuestion.textContent = q.question;
            triviaOptions.innerHTML = "";
            triviaFeedback.textContent = "";

            q.options.forEach((opt, idx) => {
              const b = document.createElement("button");
              b.textContent = opt;
              b.onclick = () => {
                if (idx === q.answerIndex) {
                  triviaFeedback.textContent = q.feedback;
                  triviaFeedback.style.color = "#00ff88";
                  correctCount++;
                } else {
                  triviaFeedback.textContent = "Respuesta incorrecta.";
                  triviaFeedback.style.color = "#ff5555";
                }
                setTimeout(() => {
                  currentIndex++;
                  if (currentIndex < triviaSet.length) {
                    showQuestion();
                  } else {
                    triviaQuestion.textContent = "Resultados";
                    triviaFeedback.style.color = "#FFD700";
                    triviaFeedback.textContent = `Acertaste ${correctCount} de ${triviaSet.length}.`;
                    triviaOptions.innerHTML = "";
                  }
                }, 1200);
              };
              triviaOptions.appendChild(b);
            });
          };

          showQuestion();
          triviaContainer.classList.remove("hidden");
          triviaClose.onclick = () => triviaContainer.classList.add("hidden");
        };

        /* === Botón Estadísticas === */
        btnStats.onclick = () => {
          const stats = item.stats;
          if (!stats) return alert("No hay estadísticas disponibles.");

          const statsContainer = document.getElementById("stats-container");
          const statsTitle = document.getElementById("stats-title");
          const statsList = document.getElementById("stats-list");
          const statsClose = document.getElementById("stats-close");

          statsTitle.textContent = `${item.targetName} · Datos Clave`;
          statsList.innerHTML = `
            <li><strong>Ranking FIFA:</strong> ${stats.rankingFIFA}</li>
            <li><strong>Partidos ganados:</strong> ${stats.partidosGanados}</li>
            <li><strong>Mundiales jugados:</strong> ${stats.mundialesJugados}</li>
            <li><strong>Mejor etapa:</strong> ${stats.maxEtapa}</li>
          `;

          statsContainer.classList.remove("hidden");
          statsClose.onclick = () => statsContainer.classList.add("hidden");
        };
      });

      /* 6️⃣ Cuando se pierde el marcador */
      target.addEventListener("targetLost", () => {
        uiContainer.classList.remove("show");
        uiContainer.classList.add("hide");
        if (scanHint && experienceStarted) {
          scanHint.classList.remove("hidden");
        }
        infoText.setAttribute("visible", "false");
        model.setAttribute("visible", "false");
        video.setAttribute("visible", "false");
        overlayVideo.classList.remove("show");
        overlayIframe.classList.remove("show");
        overlayVideo.pause();
        youtubeFrame.src = "";
        document.getElementById("filter-panel").classList.add("hidden");
      });
    });
  });

  /* 7️⃣ Estado global AR */
  scene.addEventListener("arReady", () => {
    loader.style.display = "none";
    console.log("AR lista.");
  });
  scene.addEventListener("arError", (err) => {
    console.error("Error AR:", err);
    if (loaderMessage) {
      loaderMessage.textContent = "Ocurrió un error al iniciar la experiencia.";
    } else {
      loader.textContent = "Error al iniciar AR.";
    }
  });
});
