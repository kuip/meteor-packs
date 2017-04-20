import React from 'react';

import $ from 'jquery';
import 'jquery-bar-rating/dist/jquery.barrating.min.js';
import 'jquery-bar-rating/dist/themes/bars-1to10.css';
import 'jquery-bar-rating/dist/themes/css-stars.css';

import './rating.css';

const RatingComponent = React.createClass({
  render() {
    let rating = 4.5;
    let options = [1, 2, 3, 4, 5];
    let url = decodeURIComponent(this.props.location.search.substring(5))

    return React.createElement(
      "div", { className: "rating-container", height: '90%'},
      React.createElement(iFrameComponent, {src: url}),
      React.createElement(RatingStateComponent, { rating, options }),
      React.createElement(RatingActiveComponent, { options, url })
    );
  }
});

const iFrameComponent = React.createClass({
  render() {
    return React.createElement(
      "iframe", {
        className: "rating-iframe",
        src: this.props.src,
        frameBorder: 0,
        width: '70%',
        height: '80%'
    });
  }
});

const RatingStateComponent = React.createClass({
  componentDidMount() {
    $('#rating-state').barrating('show', {
        theme: 'css-stars',
        initialRating: this.props.rating,
        readonly: true
        //showValues: true
        //theme: 'bars-1to10'
    });
  },
  render() {
    return React.createElement(
      "div", { className: "box-body"},
      React.createElement("select", {
        id:"rating-state",
        name: "rating",
        autoComplete: "off"
      },
      this.props.options.map(function(opt) {
        return React.createElement("option", {value: opt, key: opt}, opt);
      })
      )
    );
  }
});

const RatingActiveComponent = React.createClass({
  componentDidMount() {
    let self = this;
    $('#rating-active').barrating('show', {
        theme: 'css-stars',
        //theme: 'bars-1to10'
        onSelect: function(value, text, event) {
          Meteor.call('rate', self.props.url, parseFloat(value));
        },
        onClear:function(value, text) {},
        onDestroy:function(value, text) {}
    });
  },
  render() {
    return React.createElement(
      "div", { className: "box-body"},
      React.createElement("select", {
        id:"rating-active",
        name: "rating",
        autoComplete: "off"
      },
      this.props.options.map(function(opt) {
        return React.createElement("option", {value: opt, key: opt}, opt);
      })
      )
    );
  }
});

export { RatingComponent }
