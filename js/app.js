var api = 'http://sprint0productaggre-env.elasticbeanstalk.com/cars';
//var api = 'http://143.41.133.217:9000/cars';

React.renderComponent(
    ProductAggregator({api: api}),
    document.querySelector('body')
);