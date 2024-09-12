"use client";
import React, { memo, useEffect, useRef, useState } from "react";

import bangladeshUrl from "../MapEvent/bangladeshMap.json";
import TotalParticiple from "./TotalParticiple";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const vectorMapStyleCustom = {
  default: {
    fill: "#3C4857",
    outline: "#C368C3",
  },
  hover: {
    fill: "#0CB04D",
    outline: "#C368C3",
    textColor: "#454545"
  },
  pressed: {
    fill: "#C368C3",
    outline: "#C368C3",
  },
};

interface HoverData {
  name: string | null;
  eventOn: string | null;
  eventTo: string | null;
}

const MapSelect: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState<string>('280 -15 600 600');
  const [hoveredRegion, setHoveredRegion] = useState<HoverData | null>(null);


  const handleMouseEnter = (geo, evt: React.MouseEvent) => {
    setHoveredRegion({
      name: geo?.properties?.name ?? null,
      eventOn: geo?.properties?.eventOn ?? null,
      eventTo: geo?.properties?.eventTo ?? null,
    });
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  useEffect(() => {
    const updateViewBox = () => {
      if (mapContainerRef.current) {
        const width = mapContainerRef.current.clientWidth;
        const height = mapContainerRef.current.clientHeight;

        if (width > 1200) {
          setViewBox('100 150 600 600');
        } else if (width > 768) {
          setViewBox('96 0 185 265');
        } else {
          setViewBox('330 190 200 235');
        }
      }
    };

    updateViewBox();
    window.addEventListener('resize', updateViewBox);

    return () => {
      window.removeEventListener('resize', updateViewBox);
    };
  }, []);

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const rect = mapContainerRef?.current?.getBoundingClientRect(); // Get div position

      if (rect) {
        setMousePosition({
          x: ev.clientX - rect.left, // Adjust relative to the div's left
          y: ev.clientY - rect.top,  // Adjust relative to the div's top
        });
      }
    };

    const div = mapContainerRef.current;
    if (div) {
      div.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      if (div) {
        div.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);

  return (
    <div className=" h-[100vh] bg-gradient-to-b from-[#CBD4C9] to-[#74BEEA] ...">
      <div className="mx-16">
      <div className="">
          <p>Bangladesh is the eighth-most populated country in the world with almost 2.2% of the world's population. As per the final results of the 2022 Census of Bangladesh, the country's population is 169,828,911.[12] Bangladesh has one of the highest population densities in the world.

            Bangladesh (previously East Pakistan between 1947 and 1971 and East Bengal before 1947) is largely ethnically homogeneous, and its name derives from the Bengali ethno-linguistic group which comprises 99% of the population. The Chittagong Hill Tracts, Sylhet, Mymensingh, Barisal and North Bengal regions are home to diverse tribal peoples. There are many dialects of Bengali spoken throughout the region. The dialect spoken by those in Chittagong and Sylhet are particularly distinctive. About (91.04%) of Bangladeshis are Muslims, followed by Hindus (largest-minority) at (7.95%), Buddhists (0.61%) and Christians (0.30%) and others (0.12%) as per 2022 census.

            Bangladesh has one of the highest population densities in the world. The total fertility rate (TFR) has been reduced by more than two thirds since Independence. The current TFR in Bangladesh is 1.930 per woman,[13] globally considered to be below the benchmark for replacement level fertility.

            At this TFR, and without migration, Bangladesh's population is expected to soon reach a stage where it neither grows nor shrinks, once the top of its age pyramid fills in.[14]</p>
        </div>
        <div className="">
          <div className="text-center pt-8">
            <h1 className="text-[30px] text-green-700 font-bold">Bangladesh</h1>
          </div>
          <div className="fiexd">
            <div ref={mapContainerRef} className="event_map_container"
              style={{ position: "relative" }}>
              <ComposableMap
                projection="geoMercator"
                viewBox={viewBox}
                projectionConfig={{
                  scale: 2000,
                  center: [90, 23.7],
                }}
              >
                <ZoomableGroup>
                  <Geographies geography={bangladeshUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          className="event_map"
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                          onMouseLeave={handleMouseLeave}
                          style={vectorMapStyleCustom}
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>

              {/* Tooltip */}
              {hoveredRegion && (
                <div
                  style={{
                    position: "absolute",
                    background: "#064B22",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    pointerEvents: "none",
                    zIndex: 10,
                    top: `${mousePosition.y - 86}px`,
                    left: `${mousePosition.x - 5}px`,
                  }}
                >
                  <div className="w-28">
                    <p className=" text-lg ">{hoveredRegion.name}</p>
                    <p className="text-nowrap text-md">{hoveredRegion.eventTo === 'CustomComponent' && <TotalParticiple />}</p>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default memo(MapSelect);
