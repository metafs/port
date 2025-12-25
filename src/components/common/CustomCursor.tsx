"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // マウス位置の取得
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // リンク（aタグ, buttonタグ）に乗ったかどうかの判定
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 32, // 通常時のサイズ
        height: 32,
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.5)", // 白い枠線
        backgroundColor: "transparent",
        pointerEvents: "none", // クリックを邪魔しないように重要
        zIndex: 9999,
        transform: "translate(-50%, -50%)", // 中心をマウスに合わせる
      }}
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1, // ホバー時に大きくなる
        borderColor: isHovering
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.3)",
        backgroundColor: isHovering
          ? "rgba(255, 255, 255, 0.1)"
          : "transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
};
