/** @jsx React.DOM */

var ProductChooser = React.createClass({
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
        <div className="product-chooser">
          <ProductChooserDropdown
            options={this.state.makes}
            onChange={this.handleMakeChange} />
          <ProductChooserDropdown
            options={this.state.models}
            onChange={this.handleModelChange}
            parent={this.state.selectedMake} />
        </div>
    );
  }
});