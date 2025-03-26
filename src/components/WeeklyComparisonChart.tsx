
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface WeeklyComparisonChartProps {
  title?: string;
  subtitle?: string;
}

const WeeklyComparisonChart: React.FC<WeeklyComparisonChartProps> = ({ title, subtitle }) => {
  const [chartOption, setChartOption] = useState<EChartsOption>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params: any) {
            let tooltip = `${params[0].axisValueLabel}<br/>`;
            let sum = 0;
            params.forEach((param: any) => {
              tooltip += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
              sum += param.value;
            });
            tooltip += `<strong>Total: ${sum}</strong>`;
            return tooltip;
          }
        },
        legend: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%', // Increased to make room for day labels
          top: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            formatter: function(value: string) {
              return value;
            },
            interval: 0,
            fontSize: 12,
            color: '#6B7280',
          },
          axisLine: {
            lineStyle: {
              color: '#E5E7EB'
            }
          },
        },
        yAxis: {
          type: 'value',
          max: 600,
          splitLine: {
            lineStyle: {
              color: '#F3F4F6',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: 'Base Value',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 120, 200, 200, 150, 150, 80, 80, 70, 70, 110, 110, 130, 130],
            itemStyle: {
              color: '#4F6AF0'
            },
            barMaxWidth: 50,
            barGap: '10%',
            animationDelay: (idx: number) => idx * 50
          },
          {
            name: 'Middle Value',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 120, 200, 200, 150, 150, 80, 80, 70, 70, 110, 110, 130, 130],
            itemStyle: {
              color: '#9DE88D'
            },
            barMaxWidth: 50,
            animationDelay: (idx: number) => idx * 50 + 100
          },
          {
            name: 'Top Value',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 0, 200, 0, 150, 0, 80, 0, 70, 0, 110, 0, 130, 0],
            itemStyle: {
              color: '#FECE51'
            },
            barMaxWidth: 50,
            animationDelay: (idx: number) => idx * 50 + 200
          }
        ],
        animationEasing: 'elasticOut',
        animationDuration: 1000,
        animationDelayUpdate: (idx: number) => idx * 5,
      };

      setChartOption(option);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chart-container animate-scale-in">
      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      
      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="w-10 h-10 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <ReactECharts 
            option={chartOption} 
            style={{ height: '400px', width: '100%' }} 
            opts={{ renderer: 'canvas' }}
          />
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#4F6AF0' }}></div>
              <span>Base Value</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#9DE88D' }}></div>
              <span>Middle Value</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#FECE51' }}></div>
              <span>Top Value</span>
            </div>
          </div>
          
          {/* Day labels positioned between A/B pairs */}
          <div className="flex justify-between px-4 mt-1">
            <div className="w-[14.28%] text-center text-sm text-gray-500">Mon</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Tue</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Wed</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Thu</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Fri</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Sat</div>
            <div className="w-[14.28%] text-center text-sm text-gray-500">Sun</div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeeklyComparisonChart;
