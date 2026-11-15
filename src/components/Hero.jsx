import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";

const name = "VAISHNAVI S K.";

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video) return;

    let timeline;
    let fallbackTimer;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const hello = hero.querySelector(".hello");
      const nameChars = hero.querySelectorAll(".name-char");
      const roles = hero.querySelectorAll(".role");
      const character = hero.querySelector(".character");
      const scrollText = hero.querySelector(".scroll-indicator");

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set([hello, nameChars, roles, character, scrollText], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Character starts sharp and fully visible.
      gsap.set(character, {
        x: () =>
          -Math.max(
            0,
            window.innerWidth - character.offsetWidth - window.innerWidth * 0.2,
          ),
        opacity: 1,
      });

      // Hide text initially.
      gsap.set(hello, {
        opacity: 0,
        scale: 0.85,
        y: 25,
        transformOrigin: "left center",
      });

      gsap.set(nameChars, {
        opacity: 0,
        scale: 0.75,
        y: 30,
        transformOrigin: "center bottom",
      });

      gsap.set(roles, {
        opacity: 0,
        scale: 0.85,
        y: 20,
        transformOrigin: "left center",
      });

      gsap.set(scrollText, {
        opacity: 0,
        y: 15,
      });

      // Main cinematic timeline.
      timeline = gsap.timeline({
        paused: true,
      });

      // Character moves slowly from left to right.
      timeline.to(
        character,
        {
          x: 0,
          duration: 10,
          ease: "none",
        },
        0,
      );

      // Reveal the text as the character moves across the hero.
      timeline.to(
        hello,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "back.out(1.2)",
        },
        1.6,
      );

      // Pop in the name one character at a time during the video movement.
      timeline.to(
        nameChars,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
          stagger: (index) =>
            [
              0, 0.38, 0.82, 1.3, 1.92, 2.4, 2.88, 3.36, 3.84, 4.32, 4.96, 5.44,
              6.08, 6.56,
            ][index],
          ease: "back.out(1.5)",
        },
        2.7,
      );

      // Bring in each role shortly after the name.
      timeline.to(
        roles[0],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
        },
        10,
      );

      timeline.to(
        roles[1],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
        },
        10.8,
      );

      // Scroll indicator.
      timeline.to(
        scrollText,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        12,
      );
    }, hero);

    // Start timeline only when video begins playing.
    const startTimeline = (showVideo = true) => {
      if (showVideo) {
        video.classList.add("is-playing");
      }
      if (!cancelled && timeline && timeline.paused()) {
        timeline.play();
      }
    };

    const startVideo = async () => {
      try {
        await video.play();
        startTimeline();
      } catch (error) {
        console.warn("Video autoplay failed:", error);
        startTimeline(false);
      }
    };

    // Play only once.
    video.loop = false;
    video.currentTime = 0;

    video.addEventListener("playing", startTimeline);

    if (video.readyState >= 3) {
      startVideo();
    } else {
      video.addEventListener("canplay", startVideo, {
        once: true,
      });
    }
    fallbackTimer = window.setTimeout(() => startTimeline(false), 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);

      video.removeEventListener("playing", startTimeline);
      video.removeEventListener("canplay", startVideo);

      video.pause();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        {/* TEXT LAYER - BEHIND VIDEO */}
        <div className="intro">
          <p className="hello">HELLO, I'M</p>

          <h1 className="hero-name">
            {Array.from(name).map((char, index) => (
              <span
                className="name-char"
                key={index}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="roles">
            <h2 className="role">Full-Stack & AI/ML Developer</h2>
          </div>

          <p className="intro-description">
            Crafting modern web applications and intelligent systems.
          </p>
        </div>

        {/* VIDEO LAYER - IN FRONT OF TEXT */}
        <div className="character">
          <video
            ref={videoRef}
            className="walking-video"
            muted
            playsInline
            preload="metadata"
          >
            <source src="/videos/myanime3.webm" type="video/webm" />
            Your browser does not support video.
          </video>
        </div>
      </div>

      {/* FOOTER */}
      <div className="hero-footer">
        <span className="scroll-indicator">
          SCROLL TO EXPLORE <span>↓</span>
        </span>
      </div>
    </section>
  );
}
