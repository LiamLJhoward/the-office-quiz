function printHighscores() {
    // Get scores from local storage
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // Sort scores
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Creates list tag
      let liElement = document.createElement("li");
      liElement.textContent = score.initials + " - " + score.score;
  
      // Display
      let olElement = document.getElementById("highscores");
      olElement.appendChild(liElement);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  printHighscores();