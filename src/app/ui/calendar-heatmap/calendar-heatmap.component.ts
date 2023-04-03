import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartsDataService } from './calendar-heatmap.service';
import {
  HeatMap_ColorRange,
  HeatMap_DomainRange,
  HeatMap_Groups,
  HeatMap_Variables,
} from './random';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss'],
})
export class CalendarHeatmapComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;
  @Input() chartId: string = 'heatmap';
  @Input() tooltipId: string = 'heatMapTooltip';
  @Input() width: number = 600;
  @Input() height: number = 450;

  private margin = { top: 40, right: 20, bottom: 20, left: 40 };
  private _chart = {
    svg: null,
    mainContainer: null,
    data: [],
    daysCount: 30,
    datesStrAsPerRange: '',
    tooltip: null,
  };

  constructor(private service: ChartsDataService) {
    this._chart.data = service.getHeatMapData();
  }

  ngOnInit(): void {
    this.createHeatmap();
  }

  private createHeatmap() {
    this.cleanUp();
    this.setDimensions();
    const legendWidth = 80;

    // Create the heatmap tooltip
    this._chart.tooltip = d3
      .select('body')
      .append('div')
      .attr('id', `${this.tooltipId}`);

    /**
     * Mouse over function handler for the treemap nodes
     * Here we highlight the square with a stroke
     */
    const mouseover = function () {
      console.log('this', this);
      d3.select(this).style('stroke', 'black');
    };

    /**
     * Mouse out handler
     */
    const mouseout = function () {
      this._chart.tooltip.style('display', 'none').style('opacity', 0);
    };

    /**
     * Mouse leave handler
     * Here we remove the highlight added to the square
     */
    const mouseleave = function () {
      d3.select(this).style('stroke', 'none');
    };

    /**
     * Mouse move handler
     */
    const mousemove = function (event, d) {
      let xPosition = event.pageX + 5;
      let yPosition = event.pageY + 5;
      yPosition = yPosition - 70;
      xPosition = xPosition - 160;
      let topPadding = 10;
      yPosition = yPosition - topPadding;
      this._chart.tooltip
        .style('left', xPosition + 'px')
        .style('top', yPosition + 'px');
      /**
       * Remove all the elements in the tooltip if already exist
       */
      this._chart.tooltip.selectAll('*').remove();

      this._chart.tooltip.html('Value: ' + d.value);

      this._chart.tooltip.style('display', 'block').style('opacity', 1);
    };

    // append the svg object to the body of the page
    const svg = d3
      .select('#' + this.chartId)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    let groupNames = Object.values(HeatMap_Groups);
    let variableNames = Object.values(HeatMap_Variables);

    // Build X scales and axis:
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(groupNames)
      .padding(0.05);
    svg
      .append('g')
      .style('font-size', 12)
      .style('color', '#ADADAD')
      .attr('transform', 'translate(0, -5)')
      .call(d3.axisTop(x).tickSize(0))
      .select('.domain')
      .remove();

    // Build Y scales and axis:
    const y = d3
      .scaleBand()
      .range([this.height, 0])
      .domain(variableNames)
      .padding(0.05);
    svg
      .append('g')
      .style('font-size', 12)
      .style('color', '#ADADAD')
      .attr('transform', 'translate(-5, 0)')
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove();

    const myColor = d3
      .scaleLinear<string>()
      .range(HeatMap_ColorRange)
      .domain(HeatMap_DomainRange);

    // add the squares
    const cards = svg
      .selectAll()
      .data(this._chart.data, function (d) {
        return d.group + ':' + d.variable;
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.group);
      })
      .attr('y', function (d) {
        return y(d.variable);
      })
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('value', function (d) {
        return d.value;
      })
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', 'white')
      .style('fill', function (d) {
        if (d.value === null || isNaN(d.value)) {
          return '#C3C3C3';
        }
        console.log(d);
        console.log('d.value', d.value);
        return myColor(d.value);
      })
      .style('stroke-width', 2)
      .style('stroke', 'none')
      .style('opacity', 1)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove.bind(this))
      .on('mouseout', mouseout.bind(this))
      .on('mouseleave', mouseleave);

    // append the legend svg object to the body of the page
    const legend = d3
      .select('#' + this.chartId + '_legend')
      .append('svg')
      .attr(
        'transform',
        'translate(' +
          +(
            this.width -
            HeatMap_ColorRange.length * legendWidth +
            this.margin.left
          ) +
          ',0)'
      )
      .attr('width', legendWidth * HeatMap_ColorRange.length)
      .attr('height', 35);

    const domainRange: string[] = HeatMap_DomainRange.map(
      (item, index, items) => {
        const domain = '' + item;
        if (index === 0) {
          // return '>' + domain;
          return 'Less';
        } else if (index === items.length - 1) {
          // return '<' + domain;
          return 'More';
        }
        return '';
      }
    );
    legend
      .selectAll()
      .data(domainRange, function (d) {
        return d;
      })
      .enter()
      .append('g')
      .attr('class', 'g-legend')
      .append('rect')
      .attr('x', function (d, i) {
        return legendWidth * i;
      })
      .attr('y', 20)
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('width', legendWidth)
      .style('width', '' + legendWidth + 'px')
      .attr('height', 10)
      .style('height', '10px')
      .style('fill', function (d, i) {
        return '' + HeatMap_ColorRange[i];
      });

    legend
      .selectAll('.g-legend')
      .append('text')
      .attr('class', 'g-legend-text')
      .text(function (d) {
        return '' + d;
      })
      .attr('x', function (d, i) {
        if (i === 0) {
          return 0;
        }
        return legendWidth * i;
      })
      .attr('y', 10)
      .style('font-size', 11)
      .style('fill', '#ADADAD');

    legend.exit().remove();
  }

  private cleanUp(): void {
    d3.select(`#${this.tooltipId}`).selectAll('*').remove();
    /**
     * Remove all the elements in d3 charts if already exist
     */
    d3.select('#' + this.chartId)
      .selectAll('*')
      .remove();
    d3.select('#' + this.chartId + '_legend')
      .selectAll('*')
      .remove();
  }

  private setDimensions(): void {
    this.width =
      this.chartContainer.nativeElement.getBoundingClientRect().width;
    const widgetWidth =
      (this.chartContainer.nativeElement.getBoundingClientRect().width * 60) /
      100;
    let heatMapHeight = Math.round(widgetWidth / 3.167);
    this.width = widgetWidth - this.margin.left - this.margin.right;
    this.height = heatMapHeight - this.margin.top - this.margin.bottom;
  }
}
