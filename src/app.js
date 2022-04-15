import './app.scss';
import small from './assets/img/small.png';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {
    const res = await axios.get('/api/keywords');
    console.log(res);

    document.body.innerHTML = `
        <img src="${small}" />
    `;
    console.log('DOMContentLoaded');
});

const alert = (msg) => window.alert(msg);
// new Promise();

if (module.hot) {
    console.log('Hot module on.');
}
