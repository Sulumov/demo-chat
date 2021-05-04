const chatBox = document.querySelector(".chat");
const renderBlock = document.querySelector(".chat-wrap");
import chat from "./chatlist.js"

const template = (type = 0, msg = "") => {
  if (type === 0) {
    return `
        <div class="chat-wrap__box me">
            <div class="me__text chat-wrap__text">
                ${msg}
            </div>
        </div>
        `
  } else {
    return `
        <div class="chat-wrap__box interlocutor">
            <div class="interlocutor__avatar chat-wrap__avatar">
                <img src="${chat.interlocutorAvatar}">
            </div>
            <div class="interlocutor__text chat-wrap__text">
                ${msg}
            </div>
        </div>
        `
  }
}

chatBox.addEventListener("scroll", function () {
    
  document.querySelectorAll(".chat-wrap__box").forEach(box => {
      if(box.offsetTop - 100 < chatBox.scrollTop){
          box.classList.add("chat-wrap__box--overflow")
      } else {
          box.classList.remove("chat-wrap__box--overflow")
      }
  })
});

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
let delay = 100;
let focus = false;

chatBox.addEventListener("mouseenter", function () {
  focus = true;
});
chatBox.addEventListener("mouseleave", function () {
  focus = false;
});

chat.history.forEach((msg, idx) => {
  if (idx > 4) {
    delay = 1000;
  }
  setTimeout(() => {

    renderBlock.insertAdjacentHTML("beforeEnd", template(msg.who, msg.msg));

    if(!focus){
        chatBox.scrollTop = chatBox.scrollHeight;
    }

  }, delay * idx + randomInteger(0, 0.9));
})
