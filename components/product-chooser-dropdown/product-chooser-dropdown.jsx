/** @jsx React.DOM */

var ProductChooserDropdown = React.createClass({
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
      return <option value={option.id} key={option.id}>{option.name}</option>;
    });

    return (
        <select
          className="product-chooser-dropdown"
          onChange={this.handleChange}>
            <option value="-">-- Please select --</option>
            {options}
        </select>
    );
  }
});