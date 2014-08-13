/** @jsx React.DOM */

var ProductDescription = React.createClass({
  render: function() {
    return (
        <div className="product-description">
          {this.props.children}
        </div>
    );
  }
});