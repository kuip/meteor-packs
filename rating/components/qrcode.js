import React from 'react';
import QRCode from 'qrcodejs2';

const QRRatingComponent = React.createClass({
  componentDidMount() {
    let url = decodeURIComponent(this.props.location.search.substring(5))
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
    return React.createElement('div', {id:"qrcode"});
  }
});

export { QRRatingComponent }
