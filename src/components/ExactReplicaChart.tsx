import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ExactReplicaChartProps {
  title?: string;
  subtitle?: string;
}

const ExactReplicaChart: React.FC<ExactReplicaChartProps> = ({ title, subtitle }) => {
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
            const dayMap: Record<string, string> = {
              '0': 'Mon',
              '2': 'Tue',
              '4': 'Wed',
              '6': 'Thu',
              '8': 'Fri',
              '10': 'Sat',
              '12': 'Sun'
            };
            
            const dayIndex = Math.floor(params[0].dataIndex / 2);
            const day = dayMap[String(dayIndex * 2)] || '';
            const series = params[0].dataIndex % 2 === 0 ? 'A' : 'B';
            
            let tooltip = `${day} - ${series}<br/>`;
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
          bottom: '8%',
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
            formatter: function(value: string, index: number) {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              const dayIndex = Math.floor(index / 2);
              
              if (index % 2 === 0) {
                return value;
              } else {
                return `${days[dayIndex]}`;
              }
            },
            interval: 0,
            fontSize: 12,
            color: '#6B7280',
            align: 'center',
            verticalAlign: 'middle',
            lineHeight: 50
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
            name: 'Base',
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
            name: 'Middle',
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
            name: 'Top',
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
              <span>Base</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#9DE88D' }}></div>
              <span>Middle</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#FECE51' }}></div>
              <span>Top</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExactReplicaChart;
