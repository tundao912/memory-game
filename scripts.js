const cards = document.querySelectorAll(".memory-card");
const images = document.getElementsByTagName('img')
for (const img in images) {
    images[img].draggable = false
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
function flipCard() {
  if (lockBoard) return;
  if(this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unFlipCards();

  function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard()

    }, 1500);
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard()
  }
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
})()
cards.forEach((card) => card.addEventListener("click", flipCard));
