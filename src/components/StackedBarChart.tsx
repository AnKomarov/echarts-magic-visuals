
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface StackedBarChartProps {
  title?: string;
  subtitle?: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ title, subtitle }) => {
  const [chartOption, setChartOption] = useState<EChartsOption>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params: any) {
            let tooltip = `${params[0].axisValue}<br/>`;
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
          bottom: '3%',
          top: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'],
          axisLine: {
            lineStyle: {
              color: '#E5E7EB'
            }
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#E5E7EB'
            }
          },
          axisLabel: {
            color: '#6B7280',
            fontSize: 12,
            formatter: function(value: string, index: number) {
              // Group labels by pairs, add day labels below
              if (index % 2 === 1) {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return `{value|${value}}\n{day|${days[Math.floor(index/2)]}}`;
              }
              return `{value|${value}}`;
            },
            rich: {
              value: {
                fontSize: 12,
                color: '#6B7280'
              },
              day: {
                fontSize: 11,
                color: '#9CA3AF',
                padding: [5, 0, 0, 0]
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          max: 600,
          splitLine: {
            lineStyle: {
              color: '#F3F4F6'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#6B7280',
            fontSize: 12
          }
        },
        series: [
          {
            name: 'Group 1',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 120, 200, 200, 150, 150, 80, 80, 70, 70, 110, 110, 130, 130],
            itemStyle: {
              color: '#4F6AF0' // Blue
            },
            barMaxWidth: 50,
            barCategoryGap: '30%',
            animationDelay: (idx: number) => idx * 50,
          },
          {
            name: 'Group 2',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 120, 200, 200, 150, 150, 80, 80, 70, 70, 110, 110, 130, 130],
            itemStyle: {
              color: '#9DE88D' // Green
            },
            barMaxWidth: 50,
            animationDelay: (idx: number) => idx * 50 + 100,
          },
          {
            name: 'Group 3',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 0, 200, 0, 150, 0, 80, 0, 70, 0, 110, 0, 130, 0],
            itemStyle: {
              color: '#FECE51' // Yellow
            },
            barMaxWidth: 50,
            animationDelay: (idx: number) => idx * 50 + 200,
          }
        ],
        animationEasing: 'elasticOut',
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
          <div className="chart-legend mt-4">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#4F6AF0' }}></div>
              <span>Group 1</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#9DE88D' }}></div>
              <span>Group 2</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#FECE51' }}></div>
              <span>Group 3</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StackedBarChart;
