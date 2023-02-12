function printHighscores() {
    // Get scores from local storage
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // Sort scores
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Creates list tag
      let liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // Display
      let olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  printHighscores();