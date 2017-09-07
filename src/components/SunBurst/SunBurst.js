import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import select from "d3-selection/src/select";
// import flare from './min.flare.json';


//const jsonURL = "https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json";


class SunBurst extends Component {
    constructor(props) {
        super(props);

        this.createSunBurst = this.createSunBurst.bind(this);

        this.state = {}

    }

    componentDidMount() {
        this.createSunBurst();
    }

    componentDidUpdate() {
        this.createSunBurst();
    }

    createSunBurst() {
        const node = this.node,
            {width, height} = this.props.size,
            radius = (Math.min(width, height) / 2) - 10;

        const x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);

        const y = d3.scaleSqrt()
            .range([0, radius]);

        const formatNumber = d3.format(",d");

        const color = d3.scaleOrdinal(d3.schemeCategory20);

        const partition = d3.partition();

        const arc = d3.arc()
            .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
            .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
            .innerRadius(d => Math.max(0, y(d.y0)))
            .outerRadius(d => Math.max(0, y(d.y1)));

        let root = d3.hierarchy(this.props.data)
            .sum(d => d.size);

        select(node)
            .append("g")
            .attr("id", "group_node")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")")
            .selectAll("path")
            .data(partition(root).descendants())
            .enter().append("path")
            .attr("d", arc)
            .style("fill", d => color((d.children ? d : d.parent).data.name))
            .on("click", click)
            .append("title")
            .text(d => d.data.name + "\n" + formatNumber(d.value));


        function click(d) {
            d3.transition()
                .duration(750)
                .tween("scale", () => {
                    const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                        yd = d3.interpolate(y.domain(), [d.y0, 1]),
                        yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                    return t => {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t))
                    }
                })
                .selectAll("path")
                .attrTween("d", d => () => arc(d));
        }
    }


    render() {
        return (
            <svg width={this.props.size.width} height={this.props.size.height}  ref={node => this.node = node}>

            </svg>
        );
    }
}

SunBurst.propTypes = {
    data: PropTypes.object
};

export default SunBurst;