/** @jsx React.DOM */

var ProductViewer = React.createClass({
  render: function() {
    return (
        <div className="product-viewer">
            <h1>{this.props.product.make} {this.props.product.name}</h1>
            <StarRating rating={this.props.product.starRating} />
            <p>{this.props.product.desc}</p>
            <img src={this.props.product.imgUrl} className="product-viewer__image" />
        </div>
    );
  }
});