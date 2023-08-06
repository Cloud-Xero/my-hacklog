"use client";

import { ReactNebula } from "@flodlc/nebula";

export const Universe = () => {
  return (
    <ReactNebula
      config={{
        starsCount: 400,
        cometFrequence: 10,
        starsRotationSpeed: 5,
        nebulasIntensity: 5,
        bgColor: "rgb(8,8,8)",
        sunScale: 0,
        planetsScale: 0,
        solarSystemOrbite: 0,
        solarSystemSpeedOrbit: 0,
      }}
    />
  );
};
