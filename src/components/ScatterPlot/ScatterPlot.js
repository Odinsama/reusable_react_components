import React, {Component} from 'react';
import PropTypes from 'prop-types';
import select from "d3-selection/src/select";

class ScatterPlot extends Component {
    constructor(props) {
        super(props);
        this.createScatterPlot = this.createScatterPlot.bind(this);
    }

    componentDidMount() {
        this.createScatterPlot();
    }

    componentDidUpdate(){
        this.createScatterPlot();
    }

    static salesKPI(d){
        if (d>=250) { return "#33CC66"}
        else if (d<250){ return "#666666"}
    }

    createScatterPlot() {
        const node = this.node;

        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .enter()
            .append('circle');

        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll('circle')
            .data(this.props.data)
            .style('fill', d => ScatterPlot.salesKPI(d.sales))
            .attr('cx', d => d.month * 3)
            .attr('cy', d => this.props.size.height - d.sales)
            .attr('r', 5)
    }

    render() {
        console.log(this.props.data);
        return (
            <svg
                ref={node => this.node = node}
                width={this.props.size.width}
                height={this.props.size.height}>
            </svg>
        );
    }
}

ScatterPlot.propTypes = {
    /** Values the chart uses */
    data: PropTypes.array.isRequired,
    /** size of the chart */
    size: PropTypes.array.isRequired
};

ScatterPlot.defaultProps = {
    data: [10, 20, 30, 40],
    size: [500, 500]
};

export default ScatterPlot;