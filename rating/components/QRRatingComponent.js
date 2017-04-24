import React from 'react';
import QRCode from 'qrcodejs2';
import { parseQuery } from '../utils.js';

import { ImageComponent } from './ImageComponent';

import './QRRatingComponent.css';

const QRRatingComponent = React.createClass({
  componentWillMount() {
    let { url, tag } = parseQuery(this.props.location.search.substring(1));
    this.url = decodeURIComponent(url);
    this.tag = tag;
  },
  render() {

    let { url } = this;
    let apiPath = this.props.route.data.apiPath;
    let ratingUrl = Meteor.absoluteUrl() + apiPath + '?uri=' + encodeURIComponent(url) + '&tag=' + (this.tag || 'general');

    return React.createElement('div', { className: 'maxh' },
      React.createElement(QRComponent, { url: ratingUrl }),
      React.createElement(ImageComponent, { src: url, className: 'fitt center' })
    );
  }
});

const QRComponent = React.createClass({
  componentDidMount() {
    let { url } = this.props;

    this.qrcode = new QRCode(document.getElementById("qrcode"), {
      text: url,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    //qrcode.clear(); // clear the code.
    //qrcode.makeCode("http://naver.com"); // make another code.
  },
  render() {
    return React.createElement('a', {
      id: "qrcode",
      href: this.props.url,
      className: 'qrcode'
    });
  }
});


export { QRRatingComponent };
