console.log('app.js');



import Vue from 'vue';
import Framework7 from 'framework7';
import Framework7Vue from 'framework7-vue';
import IconsStyles from '../assets/css/icons.css';
// import AppStyles from '../css/style.css';

import App from '../pages/app.vue';

Framework7.use(Framework7Vue);

new Vue({
    el: '#app',
    template: '<app/>',
    
    components: {
        app: App
    }
});

