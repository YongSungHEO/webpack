import './app.css';
import small from './assets/img/small.png';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${small}" />
    `;
    console.log('DOMContentLoaded');
});
