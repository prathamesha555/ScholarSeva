export default function Loading() {
  return (
    <main className="scholarseva-loading">
      <div className="loading-glow loading-glow-one" />
      <div className="loading-glow loading-glow-two" />

      {/* Floating particles */}
      <span className="loading-particle particle-one" />
      <span className="loading-particle particle-two" />
      <span className="loading-particle particle-three" />
      <span className="loading-particle particle-four" />
      <span className="loading-particle particle-five" />

      <section className="loading-content">
        {/* Main Brand Symbol */}
        <div className="scholar-symbol">
          <div className="symbol-orbit orbit-one" />
          <div className="symbol-orbit orbit-two" />

          <div className="symbol-core">
            <span>S</span>
          </div>

          <div className="symbol-star star-one">✦</div>
          <div className="symbol-star star-two">✦</div>

          <div className="orbit-dot dot-one" />
          <div className="orbit-dot dot-two" />
        </div>

        {/* Brand */}
        <div className="loading-brand">
          <span className="brand-main">Scholar</span>
          <span className="brand-accent">Seva</span>
        </div>

        <p className="loading-tagline">
          Your opportunity is getting closer.
        </p>

        {/* Premium Loading Bar */}
        <div className="loading-progress">
          <div className="loading-progress-track">
            <div className="loading-progress-shine" />
          </div>
        </div>

        <div className="loading-status">
          <span className="status-dot" />
          <span>Discovering opportunities</span>
        </div>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .scholarseva-loading {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(181, 138, 50, 0.14),
              transparent 25%
            ),
            radial-gradient(
              circle at 20% 20%,
              rgba(116, 27, 50, 0.7),
              transparent 35%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(181, 138, 50, 0.12),
              transparent 30%
            ),
            #241019;

          color: white;
          font-family: "DM Sans", sans-serif;
        }

        .loading-content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* --------------------------------
           Ambient Glow
        -------------------------------- */

        .loading-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
        }

        .loading-glow-one {
          width: 260px;
          height: 260px;
          background: rgba(181, 138, 50, 0.14);
          top: 10%;
          left: 8%;
          animation: glowFloat 5s ease-in-out infinite;
        }

        .loading-glow-two {
          width: 320px;
          height: 320px;
          background: rgba(116, 27, 50, 0.3);
          right: 4%;
          bottom: 4%;
          animation: glowFloat 7s ease-in-out infinite reverse;
        }

        /* --------------------------------
           Main Symbol
        -------------------------------- */

        .scholar-symbol {
          width: 190px;
          height: 190px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;

          animation: symbolAppear 1.1s cubic-bezier(.2,.8,.2,1);
        }

        .symbol-core {
          width: 88px;
          height: 88px;
          position: relative;
          z-index: 4;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              #8d2643,
              #5d1529
            );

          border: 1px solid rgba(226, 195, 109, 0.5);

          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 25px rgba(181,138,50,0.18),
            0 18px 50px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.16);

          animation: corePulse 2.8s ease-in-out infinite;
        }

        .symbol-core::before {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 22px;
          border: 1px solid rgba(226, 195, 109, 0.16);
        }

        .symbol-core span {
          position: relative;
          z-index: 2;

          color: #f1d785;

          font-family: "Playfair Display", serif;
          font-size: 52px;
          font-weight: 700;

          line-height: 1;

          text-shadow:
            0 2px 12px rgba(226,195,109,0.3);
        }

        /* --------------------------------
           Orbit Rings
        -------------------------------- */

        .symbol-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(226, 195, 109, 0.32);
        }

        .orbit-one {
          width: 145px;
          height: 145px;
          transform: rotate(-25deg);
          border-left-color: rgba(226,195,109,0.8);
          border-right-color: rgba(226,195,109,0.14);

          animation: orbitRotate 8s linear infinite;
        }

        .orbit-two {
          width: 178px;
          height: 112px;
          transform: rotate(28deg);

          border-color: rgba(255,255,255,0.13);
          border-top-color: rgba(226,195,109,0.65);

          animation: orbitRotateReverse 10s linear infinite;
        }

        /* --------------------------------
           Stars
        -------------------------------- */

        .symbol-star {
          position: absolute;
          z-index: 7;

          color: #e2c36d;

          font-size: 22px;

          text-shadow:
            0 0 12px rgba(226,195,109,0.8);

          animation: starTwinkle 2.2s ease-in-out infinite;
        }

        .star-one {
          top: 5px;
          right: 30px;
        }

        .star-two {
          bottom: 24px;
          left: 18px;
          font-size: 13px;
          animation-delay: 0.8s;
        }

        /* --------------------------------
           Orbit Dots
        -------------------------------- */

        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          z-index: 8;

          border-radius: 50%;

          background: #e2c36d;

          box-shadow:
            0 0 10px rgba(226,195,109,0.9),
            0 0 25px rgba(226,195,109,0.4);
        }

        .dot-one {
          top: 24px;
          left: 36px;

          animation: dotOrbit 5s linear infinite;
        }

        .dot-two {
          right: 19px;
          bottom: 38px;

          width: 5px;
          height: 5px;

          opacity: 0.7;

          animation: dotFloat 3s ease-in-out infinite;
        }

        /* --------------------------------
           Brand
        -------------------------------- */

        .loading-brand {
          font-family: "Playfair Display", serif;
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .brand-main {
          color: #fffaf0;
        }

        .brand-accent {
          color: #e2c36d;
        }

        .loading-tagline {
          margin: 13px 0 25px;

          color: rgba(255,255,255,0.62);

          font-size: 14px;
          letter-spacing: 0.2px;
        }

        /* --------------------------------
           Progress
        -------------------------------- */

        .loading-progress {
          width: 210px;
          margin-bottom: 18px;
        }

        .loading-progress-track {
          width: 100%;
          height: 4px;

          overflow: hidden;

          border-radius: 999px;

          background: rgba(255,255,255,0.1);

          position: relative;
        }

        .loading-progress-shine {
          width: 65%;
          height: 100%;

          position: absolute;
          top: 0;
          left: -70%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              transparent,
              #e2c36d,
              #fff2b0,
              #e2c36d,
              transparent
            );

          box-shadow:
            0 0 15px rgba(226,195,109,0.65);

          animation: progressMove 1.5s ease-in-out infinite;
        }

        /* --------------------------------
           Status
        -------------------------------- */

        .loading-status {
          display: flex;
          align-items: center;
          gap: 8px;

          color: rgba(255,255,255,0.4);

          font-size: 11px;
          letter-spacing: 0.04em;
        }

        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #e2c36d;

          box-shadow:
            0 0 9px rgba(226,195,109,0.85);

          animation: statusPulse 1.5s ease-in-out infinite;
        }

        /* --------------------------------
           Particles
        -------------------------------- */

        .loading-particle {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: #e2c36d;

          box-shadow:
            0 0 9px rgba(226,195,109,0.8);

          opacity: 0.6;
        }

        .particle-one {
          top: 22%;
          left: 25%;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .particle-two {
          top: 31%;
          right: 25%;
          animation: particleFloat 5s ease-in-out infinite reverse;
        }

        .particle-three {
          bottom: 24%;
          left: 29%;
          animation: particleFloat 4.5s ease-in-out infinite;
        }

        .particle-four {
          bottom: 31%;
          right: 28%;
          animation: particleFloat 6s ease-in-out infinite reverse;
        }

        .particle-five {
          top: 18%;
          right: 38%;
          width: 2px;
          height: 2px;
          animation: particleFloat 3.5s ease-in-out infinite;
        }

        /* --------------------------------
           Animations
        -------------------------------- */

        @keyframes symbolAppear {
          from {
            opacity: 0;
            transform: scale(0.72) rotate(-10deg);
          }

          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes corePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.04),
              0 0 25px rgba(181,138,50,0.18),
              0 18px 50px rgba(0,0,0,0.35),
              inset 0 1px 0 rgba(255,255,255,0.16);
          }

          50% {
            transform: scale(1.035);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.06),
              0 0 42px rgba(181,138,50,0.3),
              0 20px 55px rgba(0,0,0,0.42),
              inset 0 1px 0 rgba(255,255,255,0.2);
          }
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(-25deg) rotate(0deg);
          }

          to {
            transform: rotate(-25deg) rotate(360deg);
          }
        }

        @keyframes orbitRotateReverse {
          from {
            transform: rotate(28deg) rotate(360deg);
          }

          to {
            transform: rotate(28deg) rotate(0deg);
          }
        }

        @keyframes starTwinkle {
          0%, 100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.18) rotate(18deg);
            opacity: 1;
          }
        }

        @keyframes dotOrbit {
          from {
            transform: rotate(0deg) translateX(65px) rotate(0deg);
          }

          to {
            transform: rotate(360deg) translateX(65px) rotate(-360deg);
          }
        }

        @keyframes dotFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes progressMove {
          0% {
            left: -70%;
          }

          100% {
            left: 120%;
          }
        }

        @keyframes statusPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes glowFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(20px, -20px) scale(1.08);
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-18px) translateX(8px);
            opacity: 0.9;
          }
        }

        /* --------------------------------
           Mobile
        -------------------------------- */

        @media (max-width: 600px) {
          .scholar-symbol {
            width: 160px;
            height: 160px;
          }

          .symbol-core {
            width: 76px;
            height: 76px;
            border-radius: 24px;
          }

          .symbol-core span {
            font-size: 44px;
          }

          .orbit-one {
            width: 125px;
            height: 125px;
          }

          .orbit-two {
            width: 150px;
            height: 95px;
          }

          .loading-brand {
            font-size: 40px;
          }

          .loading-tagline {
            font-size: 13px;
          }

          .loading-progress {
            width: 180px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scholar-symbol,
          .symbol-core,
          .symbol-orbit,
          .symbol-star,
          .orbit-dot,
          .loading-progress-shine,
          .status-dot,
          .loading-glow,
          .loading-particle {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}