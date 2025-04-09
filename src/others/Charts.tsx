'use client';

import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    Kinoarea_reyting: number;
    procents_hindred: number; 
}

export default function DoughnutChart({
    Kinoarea_reyting,
    procents_hindred,
}: DoughnutChartProps) {
    const chartRef = useRef(null);

    const filled = Kinoarea_reyting * procents_hindred; 
    const empty = 100 - filled;

    const data = {
        labels: [''],
        datasets: [
            {
                label: '# of Votes',
                data: [filled, empty],
                backgroundColor: ['#4BCB36', 'rgba(255, 255, 255, 0.05)'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '65%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div className="flex flex-col items-center text-white ">
            <div className="relative w-16 h-16 bg-[#21491fe0] rounded-[100%]">
                <Doughnut data={data} options={options} ref={chartRef} />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {Kinoarea_reyting.toFixed(2)}
                </div>
            </div>
            <div className="text-xs mt-1">Kinoarea</div>
        </div>
    );
}
