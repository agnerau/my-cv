"use client";
import React, { useState, useEffect, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Info } from "lucide-react";

export default function SmallWorld() {
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState("Lithuania");
  const [population, setPopulation] = useState(8_000_000_000);
  const [friends, setFriends] = useState(10);
  const [loose, setLoose] = useState(20);
  const [knowsMe, setKnowsMe] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const myCountry = "Lithuania";

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await res.json();
        const names = data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((c: any) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(names);
      } catch (err) {
        console.error("Error fetching country list:", err);
      }
    };
    fetchCountries();
  }, []);
  useEffect(() => {
    const fetchPopulation = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_NINJA_HOST}/country?name=${country}`,
          {
            headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJA_KEY! },
          }
        );
        const data = await response.json();
        if (data && data[0]?.population) {
          const userPop = data[0].population;

          const myRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_NINJA_HOST}/country?name=${myCountry}`,
            {
              headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJA_KEY! },
            }
          );
          const myData = await myRes.json();
          const myPop = myData[0]?.population || 2_000_000;

          const combinedPop = country === myCountry ? userPop : userPop + myPop;

          const randomFactor = 0.9 + Math.random() * 0.2;
          setPopulation(Math.round(combinedPop * randomFactor));
        }
      } catch (err) {
        console.error("Error fetching population:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopulation();
  }, [country]);
  const maxDegrees = 6;
  const clusteringFactor = 0.3;
  const calculateProbabilities = useCallback((): number[] => {
    if (knowsMe) return [100];
    const probs: number[] = [];

    for (let d = 1; d <= maxDegrees; d++) {
      const reach = Math.pow(friends + loose, d) * clusteringFactor;

      const logScale = Math.log10(population + 100000);
      const cap = 300 / (d * logScale);
      const prob = Math.min((reach / population) * 100, cap);

      //   const cap = 100 / (d * Math.log10(population / 100000));
      //   const prob = Math.min((reach / population) * 100, cap);

      //   const prob = Math.min((reach / population) * 100, 100 / d);

      probs.push(Number(prob.toFixed(2)));
    }
    return probs;
  }, [friends, loose, knowsMe, population]);

  useEffect(() => {
    setData(calculateProbabilities());
  }, [calculateProbabilities]);

  const option = {
    title: {
      text: "Connections between You and Me",
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
        showSymbol: knowsMe ? true : false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(255, 0, 135)" },
            { offset: 1, color: "rgb(135, 0, 157)" },
          ]),
        },
        emphasis: { focus: "series" },
        data,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center w-full min-h-60 p-6 mt-6">
      <div className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col space-y-4">
            <label className="label-base">
              Country:
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input-gradient input-field w-full mt-1"
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="label-base relative group">
              Loose connections:
              <Info
                size={16}
                className="inline ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
              />
              <span className="tooltip font-medium">
                Loose connections are acquaintances or weak ties, like
                coworkers, people you met once, or online connections.
              </span>
              <input
                type="number"
                value={loose}
                min={0}
                onChange={(e) => setLoose(+e.target.value)}
                className="input-gradient input-field w-full mt-1"
              />
            </label>
          </div>

          <div className="flex flex-col space-y-4">
            <label className="label-base">
              Friends:
              <input
                type="number"
                value={friends}
                min={0}
                onChange={(e) => setFriends(+e.target.value)}
                className="input-gradient input-field w-full mt-1"
              />
            </label>

            <label className="label-base flex flex-col">
              Know me directly:
              <input
                type="checkbox"
                checked={knowsMe}
                onChange={(e) => setKnowsMe(e.target.checked)}
                className="mt-3 self-start ml-2"
              />
            </label>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-center">Calculating...</p>
          ) : (
            <div className="w-full h-[60vh] ">
              <ReactECharts
                option={option}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
