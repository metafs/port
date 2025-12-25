"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 粒子の型定義
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export const ParticleCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const countRef = useRef(0); // ユニークID生成用
  const mouseRef = useRef({ x: 0, y: 0 }); // 最新のマウス位置

  useEffect(() => {
    // マウス移動時に現在地を更新
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // 一定間隔で粒子を生成するループ (10msごと)
    const interval = setInterval(() => {
      const { x, y } = mouseRef.current;

      setParticles((prev) => {
        // 古い粒子（20個以上）は削除してパフォーマンス維持
        const newParticles = prev.length > 30 ? prev.slice(1) : prev;

        // 新しい粒子を追加
        return [
          ...newParticles,
          {
            id: countRef.current++,
            x: x,
            y: y,
            size: Math.random() * 4 + 2, // 2px〜6pxのランダムなサイズ
          },
        ];
      });
    }, 20); // 生成頻度: 数値を小さくすると粒子が増えて密度が濃くなる

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // クリックを阻害しない
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.8, scale: 1, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              scale: 0.3, // 徐々に小さくなる
              x: particle.x + (Math.random() - 0.5) * 10, // ほんの少し左右に揺らぐ
              y: particle.y + (Math.random() - 0.5) * 10, // ほんの少し上下に揺らぐ
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // 0.6秒かけて消える
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              backgroundColor: "white", // 粒子の色
              borderRadius: "50%",
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)", // ほのかな発光
              top: 0,
              left: 0,
              transform: "translate(-50%, -50%)", // 中心合わせ（motionのx,yで制御するためここは固定でも可だが初期位置として）
            }}
          />
        ))}
      </AnimatePresence>

      {/* 以下のdivは現在のカーソル位置にある「本体のドット」です */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          mixBlendMode: "difference", // 背景と色が反転して見やすくなる
        }}
      />
    </div>
  );
};
