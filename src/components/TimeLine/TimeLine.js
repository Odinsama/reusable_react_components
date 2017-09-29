import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3"
import d3Button from "./d3Button"
import moment from "moment";

class TimeLine extends Component {
    constructor(props) {
        super(props);





        this.createTimeLine = this.createTimeLine.bind(this);

        this.state = {}
    }

    componentDidMount() {
        this.createTimeLine();
    }

    componentDidUpdate() {
        this.createTimeLine();
    }

    createTimeLine() {


        d3.select(this.node).selectAll("*").remove();

        const svg = d3.select(this.node),
            margin = {top: 20, right: 20, bottom: 510, left: 40},
            margin2 = {top: 430, right: 20, bottom: 430, left: 40},
            width = this.props.size.width - margin.left - margin.right,
            height = this.props.size.height - margin.top - margin.bottom,
            height2 = this.props.size.height - margin2.top - margin2.bottom;

        const parseDate = d3.timeParse("%b %Y");

        const xScale = d3.scaleTime().range([0, width]),
            xScale2 = d3.scaleTime().range([0, width]),
            xScale3 = d3.scaleTime().range([0, width]),
            yScale = d3.scaleLinear().range([height, 0]),
            yScale2 = d3.scaleLinear().range([height2, 0]);


        const xAxis = d3.axisBottom(xScale),
            xAxis2 = d3.axisBottom(xScale2),
            xAxis3 = d3.axisBottom(xScale3),
            yAxis = d3.axisLeft(yScale);

        const brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush end", brushed);

        const zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height2]])
            .extent([[0, 0], [width, height2]])
            .on("zoom", brushed);

        const area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(d => xScale(d.date))
            .y0(height)
            .y1(d => yScale(d.price));


        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        const focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        const buttonGroup = svg.append("g")
            .attr("class", "btnGrp")
            .attr("transform", "translate(" + margin2.left + "," + (margin2.top) + ")");

        const buttonData = [
            {label: 2001, x: 100, y: 120, type: 'yearBtn'},
            {label: 2002, x: 210, y: 120, type: 'yearBtn'},
            {label: 2003, x: 320, y: 120, type: 'yearBtn'},
            {label: 2004, x: 430, y: 120, type: 'yearBtn'},
            {label: 'Next Year', x: 560, y: 120, type: 'nextYearBtn'},
            {label: 'Next Month', x: 735, y: 120, type: 'nextMonthBtn'}
            ];


        d3.csv(this.props.data, type, function(error, data) {
            if (error) throw error;


            xScale.domain(d3.extent(data, d => d.date));
            yScale.domain([0, d3.max(data,d => d.price)]);
            xScale2.domain(xScale.domain());
            yScale2.domain(yScale.domain());
            xScale3.domain(xScale.domain());


            focus.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);


            context.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + (height2) + ")")
                .call(xAxis);

            focus.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")");

            focus.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis);



            context.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(zoom)
                .call(brush.move, xScale.range())
                .on('wheel', brushed);

            context.selectAll('.handle')
                .style("fill", "gold");

            const button = d3Button
                .on('press', d => setRange(d))
                .on('release', d => setRange(d));

            buttonGroup
                .selectAll('.button')
                .data(buttonData)
                .enter().append("g")
                .attr('class', 'button' )
                .call(button)




        });

        let explodedDomains = [];


        function resetAll() {

            explodedDomains = [];
            const range = xScale3.range();
            xScale2.domain(xScale3.domain());
            xScale.domain(xScale3.domain());
            context.select(".axis--x").call(xAxis3);
            focus.select(".axis--x").call(xAxis3);
            context.select(".brush").call(zoom.transform, d3.zoomIdentity
                .scale(width / (range[1] - range[0]))
                .translate(-range[0], 0));
        }



        function setRange(source){
            switch (source.type){
                case 'yearBtn':
                    xScale.domain([
                        moment(source.label + '-01-01'),
                        moment(source.label + '-12-31')
                ]);
                    break;

                case 'nextYearBtn':

                    xScale.domain([
                        moment(xScale.domain()[0]).add(1, 'year'),
                        moment(xScale.domain()[1]).add(1, 'year')
                    ]);
                    break;

                case 'nextMonthBtn':

                    xScale.domain([
                        moment(xScale.domain()[0]).add(1, 'month'),
                        moment(xScale.domain()[1]).add(1, 'month')
                    ]);
                    break;

                default: console.log(source)

            }


            focus.select(".axis--x")
                .transition().duration(3000)
                .call(xAxis);
            focus.select(".area")
                .transition().duration(3000)
                .attr("d", area);
            brush.on("brush end", null);

            context.select(".brush")
                .transition().duration(3000)
                .call(brush.move, xScale.domain().map(d => xScale2(d)))
                .on("end", () => {
                    brush.on("brush end", brushed);
                    //with the event off transition works but zoom breaks,
                    // so we call it again with the event on after to fix zoom
                    context.select(".brush")
                        .call(brush.move, xScale.domain().map(d => xScale2(d)))
                });






        }

        function explodeBrush() {
            explodedDomains.push(xScale2.domain());
            xScale2.domain(xScale.domain());
            const range = xScale2.range();
            context.select(".axis--x").call(xAxis2);
            focus.select(".axis--x").call(xAxis2);
            context.select(".brush").call(zoom.transform, d3.zoomIdentity
                .scale(width / (range[1] - range[0]))
                .translate(-range[0], 0));

        }

        function implodeBrush() {

            xScale2.domain(explodedDomains.pop());
            context.select(".axis--x").call(xAxis2);
            focus.select(".axis--x").call(xAxis2);
            const range = xScale2.range();
            context.select(".brush").call(zoom.transform, d3.zoomIdentity
                .scale(width / (range[1] - range[0]))
                .translate(-range[0], 0));

        }



        function brushChart() {

            const s = d3.event.selection || xScale2.range();
            xScale.domain(s.map(xScale2.invert, xScale2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));

        }

        function zoomChart() {
            let t = d3.event.transform;

            xScale.domain(t.rescaleX(xScale2).domain());
            focus.select(".axis--x").call(xAxis);
            focus.select(".area").attr("d", area);
            context.select(".brush").call(brush.move, xScale.range().map(t.invertX, t));
        }

        let brushEnabled = true;

        function brushed() {

            const source = d3.event.sourceEvent;

            /**stopping brush calling zoom and vice versa*/
            if (source && source.type === "brush") {
            }
            else if (source && source.type === "zoom") {
            }


            else if (d3.event && d3.event.type === "zoom") {
                zoomChart()
            }

            else if (d3.event && d3.event.type === "brush") {
                if (brushEnabled) {
                    brushChart()
                }
            }

            else if (source && source.type === "mouseup" && source.ctrlKey === true && source.altKey === true) {
                implodeBrush()
            }
            else if (source && source.type === "mouseup" && source.ctrlKey === true && source.shiftKey === true) {
                resetAll()
            }
            else if (source && source.type === "mouseup" && source.ctrlKey === true) {
                explodeBrush()
            }


        }

        function type(d) {
            d.date = parseDate(d.date);
            d.price = +d.price;
            return d;
        }


    }

    render() {
        return (
            <svg width={this.props.size.width} height={this.props.size.height - 300} ref={node => this.node = node}>

            </svg>
        );
    }
}

TimeLine.propTypes = {
    data: PropTypes.string.isRequired
};

export default TimeLine;