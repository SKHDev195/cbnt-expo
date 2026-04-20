"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ArtworkPage.module.css";

export interface Artwork {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  authorNote: string;
  spotifyTrackId: string;
  translation: string;
}

interface ArtworkPageProps {
  artworks: Artwork[];
  initialIndex?: number;
}

export default function ArtworkPage({
  artworks,
  initialIndex = 0,
}: ArtworkPageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(initialIndex);
    setNoteOpen(false);
  }, [initialIndex]);

  if (!artworks.length) return null;

  const safeIndex =
    activeIndex >= 0 && activeIndex < artworks.length ? activeIndex : 0;

  const artwork = artworks[safeIndex];

  return (
    <main className={styles.page}>
      <Swiper
        modules={[Navigation, Thumbs, A11y]}
        navigation
        spaceBetween={1000}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        initialSlide={initialIndex}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setNoteOpen(false);
        }}
        className={styles.mainSwiper}
        a11y={{ enabled: true }}
      >
        {artworks.map((aw) => (
          <SwiperSlide key={aw.id}>
            <div className={styles.imageWrapper}>
              <img
                src={aw.imageUrl}
                alt={aw.title}
                className={styles.artworkImage}
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={styles.content}>
        <h1 className={styles.title}>{artwork.title}</h1>
        <p className={styles.description}>{artwork.description}</p>
        <p className={styles.translation}>{artwork.translation}</p>

        <div className={styles.authorNote}>
          <button
            type="button"
            className={styles.authorNoteToggle}
            onClick={() => setNoteOpen((v) => !v)}
            aria-expanded={noteOpen}
            aria-controls="author-note-panel"
          >
            <span>Author&apos;s note</span>

            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={styles.chevron}
              animate={{ rotate: noteOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {noteOpen && (
              <motion.div
                id="author-note-panel"
                key="note"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={styles.authorNoteBody}
              >
                <p>{artwork.authorNote}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.spotifyWrapper}>
          <iframe
            className={styles.spotifyEmbed}
            src={`https://open.spotify.com/embed/track/${artwork.spotifyTrackId}?utm_source=generator`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Spotify player for ${artwork.title}`}
          />
        </div>
      </section>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView="auto"
        watchSlidesProgress
        className={styles.thumbSwiper}
      >
        {artworks.map((aw) => (
          <SwiperSlide key={aw.id} className={styles.thumbSlide}>
            <img
              src={aw.imageUrl}
              alt={aw.title}
              className={styles.galleryThumb}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}