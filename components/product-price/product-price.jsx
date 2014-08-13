/** @jsx React.DOM */

var ProductPrice = React.createClass({
  render: function() {
    var rawPrice = this.props.price;
    var displayPrice = rawPrice.toLocaleString("en-GB", {style: "currency", currency: "GBP"});
    return <span className="product-price">{displayPrice}</span>;
  }
});