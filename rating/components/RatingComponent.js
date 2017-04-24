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
    let { uri, tag='general', loading, rated, rating, ratedExists } = this.props;
    let options = ['', 1, 2, 3, 4, 5];

    //console.log('rated', rated)
    //console.log('rating', rating)


    return React.createElement(
      "div", { className: "rating-container", height: '90%'},
      React.createElement(
        "div", { className: "rtng-cont" },
        !loading ? React.createElement(RatingStateComponent, { rated, options, tag, className: 'rtng-state' }) : null,
        Meteor.userId() && !loading ? React.createElement(RatingActiveComponent, { rating, options, uri, tag, className: 'rtng-active' }) : null
      ),
      React.createElement(ImageComponent, {
        src: uri,
        className: 'fitt center'
      })
    );
  }
});

const RatingStateComponent = React.createClass({
  getAverageRating(props) {
    props = props || this.props;
    if(props.rated) {
      return props.rated.ratings[props.tag];
    }
    else {
      return { rating: 0, raters: 0 };
    }
  },
  render() {
    let { rated, options, tag, className } = this.props;
    let ratings = this.getAverageRating();

    return React.createElement(
      "div", {  },
      React.createElement(RatingStateComponentStars, { ratings, options, tag, className}),
      React.createElement(RatingStateComponentUserNo, { ratings })
    );
  }
});

const RatingStateComponentUserNo = React.createClass({
  render() {
    let { ratings } = this.props;
    let r = ratings.rating;
    if(Math.round(r) != r)
      r = r.toFixed(1);
    return React.createElement('span', { },
      r + '/5' + ' - ' + ratings.raters + ' votes'
    )
  }
});

const RatingStateComponentStars = React.createClass({
  componentWillReceiveProps(newprops) {
    console.log('RatingStateComponent componentWillReceiveProps', newprops)
    if(newprops.ratings)
      $(this.refs.ratingEl).barrating('set', Math.round(newprops.ratings.rating));
  },
  componentDidMount() {
    //console.log('RatingStateComponent', this.props)
    let { ratings } = this.props;

    $(this.refs.ratingEl).barrating('show', {
        theme: 'css-stars',
        initialRating: Math.round(ratings.rating || 0),
        readonly: true
        //showValues: true
        //theme: 'bars-1to10'
    });
  },
  render() {
    let { className } = this.props;
    return React.createElement(
      "div", { className },
      React.createElement("select", {
        name: "rating",
        autoComplete: "off",
        ref: "ratingEl"//{(select) => { this.el = select }}
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
    $(this.refs.ratingEl).barrating('show', {
        theme: 'css-stars',
        initialRating: this.props.rating ? this.props.rating.rating : 0,
        //theme: 'bars-1to10'
        onSelect: function(value, text, event) {
          if(Meteor.userId()) {
            Meteor.call('rate', self.props.uri, parseFloat(value), self.props.tag);
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
    let { className } = this.props;

    return React.createElement(
      "div", { className },
      React.createElement("select", {
        ref: "ratingEl",
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

export { RatingComponent, RatingStateComponent, RatingActiveComponent };
