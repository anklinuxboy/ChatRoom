const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', e => {
    e.preventDefault()

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

updateNameForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = updateNameForm.name.value.trim();
    chatroom.updateUserName(name);
    updateNameForm.reset();
    updateMssg.innerText = `Your name was update to ${name}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
})

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const room = e.target.getAttribute('id');
        chatroom.updateRoom(room);
        chatUI.clear();
        chatroom.getChats(data => chatUI.render(data));
    }
});

const username = localStorage.username ? localStorage.username : "anon";

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

chatroom.getChats(data => chatUI.render(data));