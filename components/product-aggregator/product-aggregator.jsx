/** @jsx React.DOM */

var ProductAggregator = React.createClass({
  getInitialState: function() {
    return {product: null}
  },
  onProductChange: function(makeId, modelId) {
    var product = this.fetchProduct(makeId, modelId);
    this.setState({product: product});
  },
  fetchProduct: function(makeId, modelId) {
    var product;
    window.products.some(function(make) {
      if (make['id'].toString() === makeId) {
        return make['models'].some(function(model) {
          if (model['id'].toString() === modelId) {
            product = model;
            product['make'] = make.name;
            return true;
          }
          return false;
        });
      }
      return false;
    });
    return product;
  },
  render: function() {
    var productViewer = null;
    if (this.state.product) {
      productViewer = <ProductViewer product={this.state.product} />
    }
    return (
        <div className="product-aggregator">
            <ProductChooser onProductChange={this.onProductChange} />
            {productViewer}
        </div>
    );
  }
});