"use client";

import { useMemo, useState } from "react";
import type { StaticImageData } from "next/image";

type VehicleImages = {
  left: StaticImageData;
  right: StaticImageData;
  front: StaticImageData;
  back: StaticImageData;
  polo: StaticImageData;
};

type VehicleModel = "bt50" | "polo";

export default function WorkGlobtekVehicleBrandingTabs({
  vehicle,
}: {
  vehicle: VehicleImages;
}) {
  const [model, setModel] = useState<VehicleModel>("bt50");
  const [bt50Index, setBt50Index] = useState(0);

  const bt50Images = useMemo(
    () => [vehicle.left, vehicle.right, vehicle.front, vehicle.back],
    [vehicle]
  );

  const bt50Labels = useMemo(
    () => [
      { view: "Left side — Applied Ingenuity", count: "1 / 4" },
      { view: "Right side — Marine Engineers", count: "2 / 4" },
      { view: "Front 3/4", count: "3 / 4" },
      { view: "Rear 3/4 — Naval | Marine | Offshore", count: "4 / 4" },
    ],
    []
  );

  const activeImageSrc =
    model === "bt50" ? bt50Images[bt50Index].src : vehicle.polo.src;

  return (
    <div className="gb-vehicle-tabs">
      <div className="gb-vs-tabs" role="tablist" aria-label="Vehicle model">
        <button
          type="button"
          className={`gb-vs-tab ${model === "bt50" ? "active" : ""}`}
          onClick={() => {
            setModel("bt50");
            setBt50Index(0);
          }}
        >
          <span className="gb-vs-tab-label">BT-50</span>
          <span className="gb-vs-tab-sub">Mazda bakkie · 4 views</span>
        </button>

        <button
          type="button"
          className={`gb-vs-tab ${model === "polo" ? "active" : ""}`}
          onClick={() => {
            setModel("polo");
            setBt50Index(0);
          }}
        >
          <span className="gb-vs-tab-label">Polo</span>
          <span className="gb-vs-tab-sub">VW hatchback · 1 view</span>
        </button>
      </div>

      <div className="gb-vs-visual" aria-live="polite">
        <img
          src={activeImageSrc}
          alt=""
          className="gb-vs-visual-img"
        />

        {model === "bt50" ? (
          <>
            <button
              type="button"
              className="gb-vs-arrow gb-vs-prev"
              onClick={() =>
                setBt50Index((prev) => (prev - 1 + 4) % 4)
              }
              aria-label="Previous view"
            >
              {"<"}
            </button>
            <button
              type="button"
              className="gb-vs-arrow gb-vs-next"
              onClick={() => setBt50Index((prev) => (prev + 1) % 4)}
              aria-label="Next view"
            >
              {">"}
            </button>
          </>
        ) : null}

        <div className="gb-vs-info">
          <span className="gb-vs-info-model">
            {model === "bt50" ? "Mazda BT-50" : "Volkswagen Polo"}
          </span>

          {model === "bt50" ? (
            <>
              <span className="gb-vs-info-view">
                {bt50Labels[bt50Index].view}
              </span>
              <span className="gb-vs-info-count">
                {bt50Labels[bt50Index].count}
              </span>
            </>
          ) : (
            <>
              <span className="gb-vs-info-view">
                Full wrap — People x Knowledge = Progress
              </span>
              <span className="gb-vs-info-count">1 / 1</span>
            </>
          )}
        </div>
      </div>

      {model === "bt50" ? (
        <div className="gb-vs-controls" aria-label="BT-50 views">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className={`gb-vs-dot ${bt50Index === i ? "active" : ""}`}
              onClick={() => setBt50Index(i)}
              aria-label={`View ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

