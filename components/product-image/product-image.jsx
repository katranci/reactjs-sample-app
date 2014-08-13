/** @jsx React.DOM */

var ProductImage = React.createClass({
  render: function() {
    return <img src={this.props.url} className="product-image" />;
  }
});