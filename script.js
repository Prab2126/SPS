let main = document.querySelector("main");
let scores = document.querySelector("#scores").children;
let message = document.querySelector(".message");
console.log(innerWidth);
if (innerWidth <= 743) {
  main.style.color = "white";
  main.style.fontWeight = "bold";
  main.innerHTML =
    "Pls open this website in big screen because this website is not more responsive";
} else {
  let gameArea = document.querySelector("#game-area");
  main.insertAdjacentHTML(
    "afterbegin",

    `<div class="main1">
     <div id="heading">
                <h1>rock paper</h1>
                <h2>scissors</h2>
              </div>
              <img class="frontimg" id="img1" src="img/Picsart_24-12-29_10-42-32-495.png" alt="" />
              <img class="frontimg"
                id="img2"
                src="img/Picsart_24-12-29_10-40-35-157.png"
                alt="not found"
              />
              <button class="classicbtn">Play</button></div>`
  );

  let StartBtn = document.querySelector(".classicbtn");
  StartBtn.addEventListener("click", () => {
    main.removeChild(main.children[0]);
    gameArea.style.display = "flex";
  });
  let final = document.querySelector(".final");

  let userHeart = 5;
  let botHeart = 5;
  const URLS = ["img/paper.png", "img/stone.png", "img/scissors.png"];
  let humanHand = document.querySelector("#humanHand");
  let botHand = document.querySelector("#botHand");
  let boxImg = document.querySelectorAll(".hands img");

  function messageRun(value) {
    message.innerHTML = value;
    scores[1].classList.remove("fontsizeINC");
    message.style.transform = " translate(-50%, -50%) scale(1)";

    setTimeout(() => {
      message.style.transform = " translate(-50%, -50%) scale(0)";
    }, 1500);
  }

  function numdec(check) {
    if (check) {
      botHeart -= 1;
      scores[1].classList.add("fontsizeINC");
      scores[1].style.filter = ` saturate(${40 * botHeart}%)`;
      setTimeout(() => {
        messageRun("you win");
        scores[1].classList.remove("fontsizeINC");
      }, 300);
      scores[1].innerText = botHeart;
    } else {
      userHeart -= 1;
      scores[0].classList.add("fontsizeINC");
      scores[0].style.filter = ` saturate(${40 * userHeart}%)`;

      setTimeout(() => {
        messageRun(" bot win");
        scores[0].classList.remove("fontsizeINC");
      }, 300);

      scores[0].innerText = userHeart;
    }

    if (userHeart == 0 || botHeart == 0) {
      setTimeout(() => {
        Ending();
      }, 1000);
    }
  }

  function checker(img1, img2, isbot) {
    if (img1 == URLS[0] && img2 == URLS[1]) {
      numdec(isbot);
      return false;
    } else if (img1 == URLS[1] && img2 == URLS[2]) {
      numdec(isbot);
      return false;
    } else if (img1 == URLS[2] && img2 == URLS[0]) {
      numdec(isbot);
      return false;
    }
    return true;
  }

  function Ending() {
    const win = new Audio("mp3/win.mp3");
    const lose = new Audio("mp3/lose.mp3");
    if (userHeart == 0) {
      final.children[0].innerHTML = "You Lose";
      lose.play();
    } else if (botHeart == 0) {
      final.children[0].innerHTML = "You Win";
      win.play();
    }
    botHeart = 5;
    userHeart = 5;
    scores[1].innerText = botHeart;
    scores[0].innerText = userHeart;
    scores[1].style.filter = "saturate(200%)";
    scores[0].style.filter = "saturate(200%)";
    main.removeChild(gameArea);

    final.style.display = "flex";

    final.children[1].addEventListener("click", () => {
      main.appendChild(gameArea);
      final.style.display = "none";
    });
  }

  boxImg.forEach((e) => {
    e.addEventListener("click", (element) => {
      let imgURl = element.target.attributes.src.nodeValue;
      let ChildParent = element.target.parentElement;
      humanHand.classList.add("sakeingHand");
      botHand.classList.add("sakeingHand");
      ChildParent.style.scale = 0;
      setTimeout(() => {
        gameArea.removeChild(ChildParent);
      }, 400);
      setTimeout(() => {
        let botUrl = Math.floor(Math.random() * 3);
        humanHand.classList.remove("sakeingHand");
        botHand.classList.remove("sakeingHand");
        humanHand.src = imgURl;
        botHand.src = URLS[botUrl];
        if (imgURl == URLS[botUrl]) messageRun(" draw");
        else {
          let isToRun = checker(imgURl, URLS[botUrl], true);
          if (isToRun) checker(URLS[botUrl], imgURl);
        }
        setTimeout(() => {
          humanHand.src = URLS[1];
          botHand.src = URLS[1];
          gameArea.appendChild(ChildParent);
          setTimeout(() => {
            ChildParent.style.scale = 1;
          }, 0);
        }, 2000);
      }, 1500);
    });
  });
}
