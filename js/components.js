/** @jsx React.DOM */

var ProductAggregator = React.createClass({displayName: 'ProductAggregator',
  getInitialState: function() {
    return {product: null}
  },
  onProductChange: function(makeId, modelId) {
    var product = this.fetchProduct(makeId, modelId);
    this.setState({product: product});
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
      productViewer = ProductViewer({product: this.state.product})
    }
    return (
        React.DOM.div({className: "product-aggregator"}, 
            ProductChooser({onProductChange: this.onProductChange}), 
            productViewer
        )
    );
  }
});
/** @jsx React.DOM */

var ProductChooser = React.createClass({displayName: 'ProductChooser',
  getInitialState: function() {
    return {
      makes: [],
      models: [],
      selectedMake: null
    };
  },
  componentDidMount: function() {
    this.setState({makes: this.fetchMakes()});
  },
  handleMakeChange: function(makeId) {
    this.setState({models: this.fetchModels(makeId), selectedMake: makeId});
  },
  handleModelChange: function(modelId) {
    this.props.onProductChange(this.state.selectedMake, modelId);
  },
  fetchMakes: function() {
    return window.products;
  },
  fetchModels: function(makeId) {
    var models;
    this.state.makes.some(function(make) {
      if (make['id'].toString() === makeId) {
        models = make['models'];
        return true;
      }
      return false;
    });
    return models;
  },
  render: function() {
    return (
        React.DOM.div({className: "product-chooser"}, 
          ProductChooserDropdown({
            options: this.state.makes, 
            onChange: this.handleMakeChange}), 
          ProductChooserDropdown({
            options: this.state.models, 
            onChange: this.handleModelChange, 
            parent: this.state.selectedMake})
        )
    );
  }
});
/** @jsx React.DOM */

var ProductChooserDropdown = React.createClass({displayName: 'ProductChooserDropdown',
  getDefaultProps: function() {
    return {parent: null}
  },
  handleChange: function() {
    var value = this.getDOMNode().value;
    if (value !== '-') {
      this.props.onChange(value);
    }
  },
  componentWillUpdate: function(nextProps) {
    if (this.props.parent !== nextProps.parent) {
      this.getDOMNode().value = '-';
    }
  },
  render: function() {
    var options = this.props.options.map(function(option) {
      return React.DOM.option({value: option.id, key: option.id}, option.name);
    });

    return (
        React.DOM.select({
          className: "product-chooser-dropdown", 
          onChange: this.handleChange}, 
            React.DOM.option({value: "-"}, "-- Please select --"), 
            options
        )
    );
  }
});
/** @jsx React.DOM */

var ProductDescription = React.createClass({displayName: 'ProductDescription',
  render: function() {
    return (
        React.DOM.div({className: "product-description"}, 
          this.props.children
        )
    );
  }
});
/** @jsx React.DOM */

var ProductImage = React.createClass({displayName: 'ProductImage',
  render: function() {
    return React.DOM.img({src: this.props.url, className: "product-image"});
  }
});
/** @jsx React.DOM */

var ProductPrice = React.createClass({displayName: 'ProductPrice',
  render: function() {
    var rawPrice = this.props.price;
    var displayPrice = rawPrice.toLocaleString("en-GB", {style: "currency", currency: "GBP"});
    return React.DOM.span({className: "product-price"}, displayPrice);
  }
});
/** @jsx React.DOM */

var ProductViewer = React.createClass({displayName: 'ProductViewer',
  render: function() {
    return (
        React.DOM.div({className: "product-viewer"}, 
            React.DOM.h1({className: "product-viewer__title"}, this.props.product.make + ' ' + this.props.product.name), 
            ProductPrice({price: this.props.product.price}), 
            StarRating({rating: this.props.product.starRating}), 
            ProductDescription(null, 
              React.DOM.p(null, this.props.product.desc)
            ), 
            ProductImage({url: this.props.product.imgUrl})
        )
    );
  }
});
/** @jsx React.DOM */

var StarRating = React.createClass({displayName: 'StarRating',
  render: function() {

    var rating = parseInt(this.props.rating);
    var stars = [];

    for(var i=1; i<=rating; i++) {
      stars.push(React.DOM.span({className: "star-rating__star is-full", key: i}))
    }

    for(var y=i; y<=5; y++) {
      stars.push(React.DOM.span({className: "star-rating__star is-empty", key: y}))
    }

    return (
        React.DOM.span({className: "star-rating"}, 
          stars
        )
    );
  }
});