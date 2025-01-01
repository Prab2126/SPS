let main = document.querySelector("main");
let scores = document.querySelector("#scores").children;
let message = document.querySelector(".message");
let userHeart = 5;
let botHeart = 5;
let session1 = sessionStorage.getItem("userHeart");
let session2 = sessionStorage.getItem("botHeart");
userHeart = session1 ? +session1 : 5;
botHeart = session2 ? +session2 : 5;
NumAnim(1, botHeart);
NumAnim(0, userHeart);
let gameArea = document.querySelector("#game-area");

function messageRun(value) {
  message.innerHTML = value;
  scores[1].classList.remove("fontsizeINC");
  message.style.transform = " translate(-50%, -50%) scale(1)";

  setTimeout(() => {
    message.style.transform = " translate(-50%, -50%) scale(0)";
  }, 1500);
}

function NumAnim(index, variable, check) {
  if (userHeart == 0 || botHeart == 0) {
    sessionStorage.setItem("userHeart", 5);
    sessionStorage.setItem("botHeart", 5);
  } else {
    sessionStorage.setItem("userHeart", userHeart);
    sessionStorage.setItem("botHeart", botHeart);
  }
  scores[index].style.filter = ` saturate(${40 * variable}%)`;
  if (check) {
    scores[index].classList.add("fontsizeINC");
    setTimeout(() => {
      messageRun("you win");
      scores[index].classList.remove("fontsizeINC");
    }, 300);
  }

  scores[index].innerText = variable;
}

function Mainlogics() {
  let final = document.querySelector(".final");
  const URLS = ["img/paper.webp", "img/stone.webp", "img/scissors.webp"];
  let humanHand = document.querySelector("#humanHand");
  let botHand = document.querySelector("#botHand");
  let boxImg = document.querySelectorAll(".hands img");

  function numdec(check) {
    if (check) {
      botHeart -= 1;
      NumAnim(1, botHeart, true);
    } else {
      userHeart -= 1;
      NumAnim(0, userHeart, true);
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

if (innerWidth <= 743) {
  main.style.color = "white";
  main.style.fontWeight = "bold";
  main.innerHTML =
    "Pls open this website in big screen because this website is not more responsive";
} else {
  if (userHeart == 5 && botHeart == 5) {
    main.insertAdjacentHTML(
      "afterbegin",

      `<div class="main1">
       <div id="heading">
                  <h1>rock paper</h1>
                  <h2>scissors</h2>
                </div>
                <img class="frontimg" id="img1" src="img/Picsart_24-12-29_10-42-32-495.webp" alt="" />
                <img class="frontimg"
                  id="img2"
                  src="img/Picsart_24-12-29_10-40-35-157.webp"
                  alt="not found"
                />
                <button class="classicbtn">Play</button></div>`
    );

    let StartBtn = document.querySelector(".classicbtn");
    StartBtn.addEventListener("click", () => {
      main.removeChild(main.children[0]);
      gameArea.style.display = "flex";
      Mainlogics();
    });
  } else {
    gameArea.style.display = "flex";

    Mainlogics();
  }
}
