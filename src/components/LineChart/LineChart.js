import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleLinear} from "d3-scale";
import select from "d3-selection/src/select";
import {curveMonotoneX, line} from "d3-shape";
import {axisRight, axisTop} from "d3-axis";

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this);
    }
    componentDidMount(){
        this.createLineChart();
    }

    componentDidUpdate(){
        this.createLineChart();
    }

    createLineChart(){
        const data = this.props.data;
        const {width, height} = this.props.size;
        const yScale = scaleLinear()
            .domain([541, 0])
            .range([0, height]);

        const xScale = scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        const lineFunc = line()
            .x(d => xScale(d.month))
            .y(d => yScale(d.sales))
            .curve(curveMonotoneX);

        const node = this.node;
        const path = 'path';


        select(node)
            .selectAll(path)
            .data(data)
            .enter()
            .append(path);

        select(node)
            .selectAll(path)
            .data(data)
            .exit()
            .remove();

        select(node)
            .selectAll(path)
            .datum(data)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "cornflowerblue")
            .attr("stroke-width", 3)
            .attr("d", lineFunc);

        select(node)
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate (10," + 599 + ")")
            .call(axisTop(xScale));

        select(node)
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate (10,"+ 10 + ")")
            .call(axisRight(yScale));



    }

    render() {
        return (
            <svg
                ref={node => this.node = node}
                width={this.props.size.width}
                height={this.props.size.height}>
            </svg>
        );
    }
}

LineChart.propTypes = {
    data: PropTypes.array.isRequired,
    size: PropTypes.array.isRequired,
};

export default LineChart;