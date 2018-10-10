import React from 'react'

import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import {transition} from 'd3-transition'

class BarChartJS extends React.Component{
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount(){
        this.createBarChart()
    }

    componentDidUpdate(prevProps) {
        if(this.props.data.map(o=>o.votes) !== prevProps.data.map(o=>o.votes)){
            this.createBarChart()
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        let thisVoteString = ''
        this.props.data.map(o=>thisVoteString+=o.votes)
        let nextVoteString = ''
        nextProps.data.map(o=>nextVoteString+=o.votes)
        if(thisVoteString !== nextVoteString){
            return true
        }
        if(this.props.size[0] !== nextProps.size[0]){
            return true
        }
        return false
    }
    
    createBarChart(){
        const delay = transition().duration(1500)
        const node = this.refs.node
        const g = this.refs.g
        const dataMax = max(this.props.data.map(o=>o.votes))

        const margin = {top: 0, right: 0, bottom: 60, left: 0}

        select(node)
            .attr('width', this.props.size[0])
            .attr('height', this.props.size[1])
            
        select(g)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            
            

        const gWidth = this.props.size[0] - margin.left - margin.right
        const gHeight = this.props.size[1] - margin.top - margin.bottom

        let xDomain = this.props.data.map(d=>d.choice)
 
        const xScale = scaleBand()
            .range([0, gWidth])
            .domain(xDomain)
            .paddingInner(0.04)
        
        this.props.setBandwidth(xScale.bandwidth())
        
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([gHeight, 0])


        // select(axis)
        //     .attr('class', 'x axis')
        //     .attr('transform', `translate(${margin.left}, ${gHeight+margin.top})`)
        //     .call(xAxis)
        //     .selectAll('text')
        //     .style('text-anchor', 'end')
        //     .attr('transform', 'rotate(-40)')
                        

        // let yAxis = axisLeft()
        //     .scale(yScale)
        //     .ticks(dataMax < 2 ? 1 : dataMax < 6 ? 2.4 : 5)

        // select(g)
        //     .attr('class', 'y axis')
        //     .call(yAxis)
        
        select(g)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')
            .attr('class', 'trans_bar')    
        
        select(g)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        
        
        select(g)
            .selectAll('rect')
            .data(this.props.data)
            .attr('class', d=>{
                return d.votes === 0 ? 'bar-none': 'bar'
            })
            .attr('x', d=>xScale(d.choice))
            .attr('width', xScale.bandwidth())
            .attr('y', yScale(0))
            .attr('height', 0)
            .on('mouseover', e=>{
                // this.props.setXY(yScale(e.votes), xScale(e.choice))
                this.props.setChoiceAndVotes(e.choice, e.votes)
                // this.props.setVote(e)
            })
            .on('mouseout', e=>{
                this.props.setNull()
            })
            .on('click', ()=>{
                this.props.setPermaXY()
                
            })
            .transition(delay)
            .attr('y', d=>yScale(d.votes))
            .attr('height', d=>{ 
                const barHeight = gHeight - yScale(d.votes)
                return barHeight === 0 ?
                50 :
                barHeight
            })
    }

    render(){
        return (
            <svg className="barChart" ref='node' >
                <g ref="g"></g> 
            </svg>
    )
    }
}

export default BarChartJS