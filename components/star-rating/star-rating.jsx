/** @jsx React.DOM */

var StarRating = React.createClass({
  render: function() {

    var rating = parseInt(this.props.rating);
    var stars = [];

    for(var i=1; i<=rating; i++) {
      stars.push(<span className="star-rating__star is-full" key={i}></span>)
    }

    for(var y=i; y<=5; y++) {
      stars.push(<span className="star-rating__star is-empty" key={y}></span>)
    }

    return (
        <span className="star-rating">
          {stars}
        </span>
    );
  }
});