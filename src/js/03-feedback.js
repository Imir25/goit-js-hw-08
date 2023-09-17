import throttle from 'lodash.throttle';

const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');
const form = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
}, 500);

function restoreFormState() {
  const savedFormState = localStorage.getItem(localStorageKey);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
}

emailInput.addEventListener('input', saveFormState);
messageTextarea.addEventListener('input', saveFormState);

window.addEventListener('load', restoreFormState);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (emailInput.value && messageTextarea.value) {
    const formState = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    console.log('Submitted Form Data:', formState);

    localStorage.removeItem(localStorageKey);

    emailInput.value = '';
    messageTextarea.value = '';
  } else {
    console.log('Fill in all fields before submitting.');
  }
});