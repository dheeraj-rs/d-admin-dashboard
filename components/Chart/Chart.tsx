'use client';
import { Chart as ChartJS, ChartTypeRegistry } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
interface ChartProps {
    type: keyof ChartTypeRegistry;
    data: any;
    options?: any;
}

const Chart: React.FC<ChartProps> = ({ type, data, options }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<ChartJS | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data?.datasets) {
            return;
        }
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;
        chartInstance.current = new ChartJS(ctx, {
            type,
            data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                ...options,
            },
        });
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [data, options, type]);

    return (
        <div className="chart-wrapper">
            <canvas ref={chartRef} />
        </div>
    );
};

export default Chart;
