import React from 'react';
import QRCode from 'qrcodejs2';

import { ImageComponent } from './ImageComponent';

import './QRRatingComponent.css';

const QRRatingComponent = React.createClass({
  componentWillMount() {
    this.url = decodeURIComponent(this.props.location.search.substring(5));
  },
  render() {

    let { url } = this;
    let apiPath = this.props.route.data.apiPath;
    let ratingUrl = Meteor.absoluteUrl() + apiPath + '?url=' + encodeURIComponent(url);

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
