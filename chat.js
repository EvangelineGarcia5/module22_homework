const wsUri = " wss://echo-ws-service.herokuapp.com";

const serverMessages = document.querySelector('.server-messages');
const userMessages = document.querySelector('.user-messages');
const btnMess = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const wrapperChat =  document.querySelector('.wrapper-chat');
const input = document.querySelector('.input');

//Выводит сообщения
function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMessages.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }

//происхоит соединения
 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`Сообщение от сервера| ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};
  
  //отправка сообщения
  btnMess.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`Ваше сообщение| ${message}`);
	input.value = ''

  });
  //гео-локация.
  // Функция,  об ошибке (например если пользователь отклонил запрос о гео-локации)
const error = () => {
	let textErr0r = 'Невозможно найти ваше местоположение :(';
	writeToScreen(textErr0r);
  };
  
  //при успешном получении геолокации
  const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
  };
  //если браузер не поддерживает гео-локацию
  btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });
