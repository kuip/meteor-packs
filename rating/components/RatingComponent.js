import React from 'react';

import { ImageComponent } from './ImageComponent';

import $ from 'jquery';
import 'jquery-bar-rating/dist/jquery.barrating.min.js';
import 'jquery-bar-rating/dist/themes/bars-1to10.css';
import 'jquery-bar-rating/dist/themes/css-stars.css';

import './RatingComponent.css';

const RatingComponent = React.createClass({
  getInitialState() {
    return { }
  },
  render() {
    let { uri, loading, rated, rating, ratedExists } = this.props;
    let options = ['', 1, 2, 3, 4, 5];
    let tag = 'general';

    //console.log('rated', rated)
    //console.log('rating', rating)


    return React.createElement(
      "div", { className: "rating-container", height: '90%'},
      !loading ? React.createElement(RatingStateComponent, { rated, options, tag }) : null,
      Meteor.userId() && !loading ? React.createElement(RatingActiveComponent, { rating, options, uri }) : null,
      React.createElement(ImageComponent, {src: uri})
    );
  }
});

const RatingStateComponent = React.createClass({
  getAverageRating(props) {
    props = props || this.props;
    if(props.rated) {
      props.rated.ratings[props.tag].rating = Math.round(props.rated.ratings[props.tag].rating);
      return props.rated.ratings[props.tag];
    }
    else {
      return { rating: 0, raters: 0 };
    }
  },
  componentWillReceiveProps(newprops) {
    console.log('RatingStateComponent componentWillReceiveProps', newprops)
    $('#rating-state').barrating('set', this.getAverageRating(newprops).rating);
  },
  componentDidMount() {
    console.log('RatingStateComponent', this.props)
    let ratings = this.getAverageRating();

    $('#rating-state').barrating('show', {
        theme: 'css-stars',
        initialRating: ratings.rating || 0,
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
  componentWillReceiveProps(newprops) {
    console.log('RatingActiveComponent componentWillReceiveProps', newprops);
  },
  componentDidMount() {
    console.log('RatingActiveComponent', this.props, this.props.rating ? this.props.rating.rating : 0)
    let self = this;
    $('#rating-active').barrating('show', {
        theme: 'css-stars',
        initialRating: this.props.rating ? this.props.rating.rating : 0,
        //theme: 'bars-1to10'
        onSelect: function(value, text, event) {
          if(Meteor.userId()) {
            Meteor.call('rate', self.props.uri, parseFloat(value));
          }
          else {
            alert('Please Sign In');
          }
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
