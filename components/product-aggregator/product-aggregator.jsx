/** @jsx React.DOM */

var ProductAggregator = React.createClass({
  getInitialState: function() {
    return {product: null}
  },
  onProductChange: function(makeId, modelId) {
    this.fetchProduct(makeId, modelId);
  },
  fetchProduct: function(makeId, modelId) {
    var product;

    // collect dummy product data from window.products
    window.products.some(function(make) {
      if (make['id'] === makeId) {
        return make['models'].some(function(model) {
          if (model['id'] === modelId) {
            product = model;
            product['make'] = make.name;
            return true;
          }
          return false;
        });
      }
      return false;
    });

    // collect real product data from API
    var url = this.props.api + '/' + makeId + '/' + modelId;
    superagent
        .get(url)
        .end(function(res) {
          product['price'] = res.body.price;
          product['starRating'] = res.body.starRating;
          this.setState({product: product});
        }.bind(this));
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