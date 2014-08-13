/** @jsx React.DOM */

var ProductViewer = React.createClass({
  render: function() {
    return (
        <div className="product-viewer">
            <h1 className="product-viewer__title">{this.props.product.make + ' ' + this.props.product.name}</h1>
            <ProductPrice price={this.props.product.price} />
            <StarRating rating={this.props.product.starRating} />
            <ProductDescription>
              <p>{this.props.product.desc}</p>
            </ProductDescription>
            <ProductImage url={this.props.product.imgUrl} />
        </div>
    );
  }
});