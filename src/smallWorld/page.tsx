"use client";
import React, { useState, useEffect, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function SmallWorld() {
  const [friends, setFriends] = useState(10);
  const [loose, setLoose] = useState(20);
  const [knowsMe, setKnowsMe] = useState(false);
  const [data, setData] = useState<number[]>([]);

  const population = 1_000_000;
  const maxDegrees = 6;
  const clusteringFactor = 0.3;

  const calculateProbabilities = useCallback((): number[] => {
    if (knowsMe) return [100];
    const probs: number[] = [];

    for (let d = 1; d <= maxDegrees; d++) {
      const reach = Math.pow(friends + loose, d) * clusteringFactor;
      const prob = Math.min((reach / population) * 100, 100 / d);
      probs.push(Number(prob.toFixed(2)));
    }
    return probs;
  }, [friends, loose, knowsMe]);

  useEffect(() => {
    setData(calculateProbabilities());
  }, [calculateProbabilities]);

  const option = {
    title: {
      text: "Probability of Knowing Me by Degrees of Separation",
      left: "center",
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: Array.from({ length: maxDegrees }, (_, i) => `${i + 1}°`),
    },
    yAxis: [{ type: "value", name: "Probability (%)" }],
    series: [
      {
        name: "Connection Probability",
        type: "line",
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(128, 255, 165)" },
            { offset: 1, color: "rgb(1, 191, 236)" },
          ]),
        },
        emphasis: { focus: "series" },
        data,
      },
    ],
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
        <label>
          Friends:
          <input
            type="number"
            value={friends}
            onChange={(e) => setFriends(+e.target.value)}
            className="border p-1 rounded ml-1"
          />
        </label>
        <label>
          Loose connections:
          <input
            type="number"
            value={loose}
            onChange={(e) => setLoose(+e.target.value)}
            className="border p-1 rounded ml-1"
          />
        </label>
        <label>
          Know me directly:
          <input
            type="checkbox"
            checked={knowsMe}
            onChange={(e) => setKnowsMe(e.target.checked)}
            className="ml-1"
          />
        </label>
      </div>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}
