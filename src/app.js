import 'babel-polyfill';
import $ from 'jquery';
import Vue from 'vue';
import x from './test1.vue';

console.log(x);

$('body');
Vue.config({});

const txt = 'hello world';
console.log(txt);

const arr = [1, 2, 3];
for (const num of arr) {
    console.log(num);
}
