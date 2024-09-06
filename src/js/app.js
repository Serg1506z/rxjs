// client.js
import { interval, BehaviorSubject } from 'rxjs';
import { faker } from "@faker-js/faker";

// СоздаемBehaviorSubject для хранения сообщений
const messagesSubject = new BehaviorSubject([]);
const template = document.querySelector('#card')
const container = document.querySelector('.container')

// Функция для генерации случайных данных
function generateRandomMessages() {
  const messages = [];
  for (let i = 0; i < 10; i++) {
    messages.push({
      id: i,
      from: faker.internet.email(),
      body: faker.lorem.sentence(),
      subject: faker.lorem.sentence(),
      received : faker.date.birthdate()
    });
  }
  return messages;
}

function renderMessage(data){
  const element = template.content.querySelector(".block").cloneNode(true);
  const email = element.querySelector('.email')
  const message = element.querySelector('.message')
  const date = element.querySelector('.date')
  const time = element.querySelector('.time')

  const received = new Date(data.received)

  email.textContent = data.from
  message.textContent = data.body
  date.textContent = `${received.getDay() + 1}.${received.getMonth() + 1}.${received.getYear()}`
  time.textContent = `${received.getHours()}:${received.getMinutes()}`

  container.append(element)

}

// Периодический опрос сервера каждые 5 секунд
interval(5000)
  .subscribe(() => {
    // Генерация случайных данных
    const newMessages = generateRandomMessages();

    // ОбновлениеBehaviorSubject с новыми сообщениями
    messagesSubject.next(newMessages);
  });

// Подписка на измененияBehaviorSubject
messagesSubject.subscribe((messages) => {
  console.log(messages);
  messages.forEach((message) => {
    renderMessage(message)
  })
});