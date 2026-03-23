"use client";

import { useMemo, useState } from "react";
import type { StaticImageData } from "next/image";

type VehicleImages = {
  bt50: {
    left: StaticImageData;
    right: StaticImageData;
    front: StaticImageData;
    back: StaticImageData;
  };
  bmw: {
    right: StaticImageData;
    rear3q: StaticImageData;
    rear: StaticImageData;
    front3q: StaticImageData;
  };
};

type VehicleModel = "bt50" | "bmw";

export default function WorkGlobtekVehicleBrandingTabs({
  vehicle,
}: {
  vehicle: VehicleImages;
}) {
  const [model, setModel] = useState<VehicleModel>("bt50");
  const [bt50Index, setBt50Index] = useState(0);
  const [bmwIndex, setBmwIndex] = useState(0);

  const bt50Images = useMemo(
    () => [
      vehicle.bt50.left,
      vehicle.bt50.right,
      vehicle.bt50.front,
      vehicle.bt50.back,
    ],
    [vehicle]
  );

  const bmwImages = useMemo(
    () => [
      vehicle.bmw.right,
      vehicle.bmw.rear3q,
      vehicle.bmw.rear,
      vehicle.bmw.front3q,
    ],
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

  const bmwLabels = useMemo(
    () => [
      { view: "Right side — Applied Ingenuity", count: "1 / 4" },
      { view: "Rear 3/4 — Marine Engineers", count: "2 / 4" },
      { view: "Rear — Naval | Marine | Offshore", count: "3 / 4" },
      { view: "Front 3/4 — People x Knowledge = Progress", count: "4 / 4" },
    ],
    []
  );

  const activeImageSrc =
    model === "bt50" ? bt50Images[bt50Index].src : bmwImages[bmwIndex].src;

  const navPrev = () => {
    if (model === "bt50") {
      setBt50Index((prev) => (prev - 1 + 4) % 4);
      return;
    }
    setBmwIndex((prev) => (prev - 1 + 4) % 4);
  };

  const navNext = () => {
    if (model === "bt50") {
      setBt50Index((prev) => (prev + 1) % 4);
      return;
    }
    setBmwIndex((prev) => (prev + 1) % 4);
  };

  return (
    <div className="gb-vslider">
      {/* Model tabs */}
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
          className={`gb-vs-tab ${model === "bmw" ? "active" : ""}`}
          onClick={() => {
            setModel("bmw");
            setBmwIndex(0);
          }}
        >
          <span className="gb-vs-tab-label">BMW</span>
          <span className="gb-vs-tab-sub">Hatchback · 4 views</span>
        </button>
      </div>

      <div className="gb-vslider-inner">
        {/* Stage left */}
        <div className="gb-vslider-left">
          <div className="gb-vs-visual" aria-live="polite">
            <img src={activeImageSrc} alt="" className="gb-vs-visual-img" />

            <button
              type="button"
              className="gb-vs-arrow gb-vs-prev"
              onClick={navPrev}
              aria-label="Previous view"
            >
              {"<"}
            </button>
            <button
              type="button"
              className="gb-vs-arrow gb-vs-next"
              onClick={navNext}
              aria-label="Next view"
            >
              {">"}
            </button>
          </div>

          <div className="gb-vs-slide-info">
            <span className="gb-vs-info-model">
              {model === "bt50" ? "Mazda BT-50" : "BMW Hatchback"}
            </span>
            <span className="gb-vs-info-view">
              {model === "bt50" ? bt50Labels[bt50Index].view : bmwLabels[bmwIndex].view}
            </span>
            <span className="gb-vs-info-count">
              {model === "bt50" ? bt50Labels[bt50Index].count : bmwLabels[bmwIndex].count}
            </span>
          </div>

          <div className="gb-vs-dots" aria-label={`${model === "bt50" ? "BT-50" : "BMW"} views`}>
            {[0, 1, 2, 3].map((i) => {
              const active = model === "bt50" ? bt50Index === i : bmwIndex === i;
              const onClick = () => (model === "bt50" ? setBt50Index(i) : setBmwIndex(i));
              return (
                <button
                  key={i}
                  type="button"
                  className={`gb-vs-dot ${active ? "active" : ""}`}
                  onClick={onClick}
                  aria-label={`View ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Model info right */}
        <div className="gb-vslider-right">
          <div className="gb-vmi-model">{model === "bt50" ? "Mazda BT-50" : "BMW Hatchback"}</div>
          <div className="gb-vmi-wrap">
            Fleet vehicle branding — full wrap design applied across all panels. Wave motif references the
            marine environment without being literal.
          </div>

          <div className="gb-vmi-specs">
            <div className="gb-vmi-spec">
              <span className="gb-vmi-label">Model</span>
              <span className="gb-vmi-val">{model === "bt50" ? "Mazda BT-50 Double Cab" : "BMW Hatchback"}</span>
            </div>
            <div className="gb-vmi-spec">
              <span className="gb-vmi-label">Wrap type</span>
              <span className="gb-vmi-val">Full vinyl wrap</span>
            </div>
            <div className="gb-vmi-spec">
              <span className="gb-vmi-label">Motif</span>
              <span className="gb-vmi-val">Globtek wave system</span>
            </div>
            <div className="gb-vmi-spec">
              <span className="gb-vmi-label">Tagline</span>
              <span className="gb-vmi-val">Applied Ingenuity</span>
            </div>
            <div className="gb-vmi-spec">
              <span className="gb-vmi-label">Division</span>
              <span className="gb-vmi-val">Marine Engineers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

