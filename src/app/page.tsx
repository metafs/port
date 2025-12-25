"use client";

import { Box, Center, Text, Overlay, Stack } from "@mantine/core";
import { motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

export default function Home() {
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* 1. 背景動画エリア */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {/* 動画がある場合はここを有効化してください */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/assets/hero.MP4" type="video/mp4" />
        </video>

        {/* 動画がない場合のダミー背景（雰囲気のあるグラデーション） */}
        <Box
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 50% 50%, #2C2E33 0%, #000000 80%)",
            opacity: 0.8,
          }}
        />
      </Box>

      {/* 2. 背景を少し暗くするフィルター (文字を読みやすくするため) */}
      <Overlay color="#000" opacity={0.4} zIndex={1} />

      {/* 3. メインコンテンツ (名前と肩書き) */}
      <Center
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 2,
          flexDirection: "column",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }}
        >
          <Stack align="center" gap="xs">
            <Text
              component="h1"
              fz={{ base: 21, sm: 30, md: 40 }} // レスポンシブなフォントサイズ
              fw={300}
              c="white"
              style={{
                letterSpacing: "0.15em",
                lineHeight: 1.1,
                textAlign: "center",
                fontFeatureSettings: '"palt"', // 日本語フォントの文字詰め
              }}
            >
              Shoya Fukunaga
            </Text>

            <Text
              fz={{ base: 14, md: 16 }}
              c="dimmed"
              style={{
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Choreographer / Dance Artist
            </Text>
          </Stack>
        </motion.div>
      </Center>

      {/* 4. スクロールダウンの指示 (装飾) */}
      <Box
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconChevronDown color="white" size={32} style={{ opacity: 0.6 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
