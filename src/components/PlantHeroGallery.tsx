"use client";

import { useState } from "react";
import Image from "next/image";

export interface HeroSlide {
  src: string;
  alt: string;
  tag?: string;
  scale?: string;
  caption?: string;
  captionLabel?: string;
  cover?: boolean;
  /** Visual kind used to pick the toggle icon. */
  kind?: "drawing" | "photo";
}

interface PlantHeroGalleryProps {
  slides: HeroSlide[];
}

function DrawingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="M14 6l3 3" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h3l1.5-2h9L18 7h3v12H3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function iconFor(slide: HeroSlide) {
  return slide.kind === "photo" ? <PhotoIcon /> : <DrawingIcon />;
}

export function PlantHeroGallery({ slides }: PlantHeroGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const slide = slides[index];

  if (count === 0) return null;

  return (
    <>
      <div className="figure">
        <div className="figure-stack">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`plant-image figure-layer${s.cover ? " plant-image-cover" : ""}${
                i === index ? " active" : ""
              }`}
              aria-hidden={i !== index}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        {slide.tag && <div className="figure-tag">{slide.tag}</div>}
        {slide.scale && (
          <div className="figure-scale">
            <div className="bar" />
            <div>{slide.scale}</div>
          </div>
        )}
        {count > 1 && (
          <div className="figure-toggle" role="tablist" aria-label="Hero image view">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.kind === "photo" ? "Photo view" : "Illustration view"}
                title={s.kind === "photo" ? "Photo" : "Illustration"}
                className={`figure-toggle-btn${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
              >
                {iconFor(s)}
              </button>
            ))}
          </div>
        )}
      </div>
      {slide.caption && (
        <p className="figcaption">
          <strong>{slide.captionLabel ?? "Plate I"}</strong>
          {slide.caption}
        </p>
      )}
    </>
  );
}
