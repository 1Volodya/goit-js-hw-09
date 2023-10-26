import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const obj = {
      position,
      delay,
    };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
  return promise;
}

function handleSubmit(event) {
  event.preventDefault();

  let currentDelay = parseInt(form.elements.delay.value);
  const stepValue = parseInt(form.elements.step.value);
  const amountValue = parseInt(form.elements.amount.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += stepValue;
  }
}

form.addEventListener('submit', handleSubmit);
