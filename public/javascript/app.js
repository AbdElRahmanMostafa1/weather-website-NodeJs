console.log('Connected')
const txt = document.getElementById("inputText");
const btn = document.getElementById('btn');

const msg1 = document.querySelector('.msg-1');
const msg2 = document.querySelector('.msg-2');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  msg1.textContent = 'Loading...'
  const usedAddress = txt.value
  fetch(`/weather?address=${usedAddress}`)
  .then(res => {
    res.json().then(data => {
      if(data.error) {
        msg1.textContent = data.error
        msg2.textContent = ''
      } else {
        // console.log(data)
        msg1.textContent = data.forecast
        msg2.textContent = data.location
      }
    })
  })
}) 
