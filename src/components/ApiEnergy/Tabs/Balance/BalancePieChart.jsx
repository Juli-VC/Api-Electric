import React from "react";
import { Pie } from "react-chartjs-2";

const BalancePieChart = ({ data }) => {
    const colors = [
        "#4caf50",
        "#ff9800",
        "#2196f3",
        "#f44336",
        "#9c27b0",
        "#ffc107",
        "#607d8b",
    ];

    // Procesamos los datos para calcular la suma por categoría
    const dataByType = {};
    data.forEach((item) => {
        const title = item.attributes.title;
        const values = item.attributes.content;
        if (!dataByType[title]) {
            dataByType[title] = 0;
        }
        values.forEach((v) => {
            dataByType[title] += v.attributes.values.reduce(
                (sum, val) => sum + val.value,
                0
            );
        });
    });

    const chartData = {
        labels: Object.keys(dataByType),
        datasets: [
            {
                data: Object.values(dataByType).map((value) => value / 1000),
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Pie data={chartData} />
        </div>
    );
};

export default BalancePieChart;
