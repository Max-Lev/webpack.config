import css from './styles/css/css-main.css';

import less from './styles/less/less-main.less';

import scss from './styles/sass/sass-main.scss';

import {
  Vendor
} from './vendor/vendor.es6';

import {
  Product
} from './js/ts/product';


const product = new Product('jeans');
const VendorManager = Vendor;
VendorManager('vendor manager');

console.log('main.js init');
