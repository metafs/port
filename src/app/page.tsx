"use client";

import { Box, Center, Text, Overlay, Stack, Button, Group, Badge } from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";

const MARKET_POINTS = [
  "Commission & Collaboration Open",
  "International Festival Friendly",
  "Contemporary Dance / Performance Art",
];

export default function Home() {
  return (
    <Box
      style={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <Box
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/assets/hero.MP4" type="video/mp4" />
        </video>

        <Box
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(53,57,66,0.55) 0%, rgba(0,0,0,0.8) 75%)",
            position: "absolute",
            inset: 0,
          }}
        />
      </Box>

      <Overlay color="#000" opacity={0.45} zIndex={1} />

      <Center
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100dvh",
          zIndex: 2,
          padding: "clamp(5rem, 14vh, 8rem) 1.25rem 2rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          style={{ width: "min(760px, 100%)" }}
        >
          <Stack align="center" gap="lg">
            <Text
              component="h1"
              fz={{ base: 30, sm: 44, md: 58 }}
              fw={300}
              c="white"
              style={{
                letterSpacing: "0.12em",
                lineHeight: 1.05,
                textAlign: "center",
              }}
            >
              SHOYA FUKUNAGA
            </Text>

            <Text
              fz={{ base: 13, md: 15 }}
              c="gray.3"
              style={{
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Choreographer / Dance Artist
            </Text>

            <Text
              maw={640}
              ta="center"
              c="gray.4"
              lh={1.85}
              fz={{ base: 14, sm: 16 }}
            >
              身体表現の詩性と空間演出を軸に、舞台・映像・インスタレーションを横断。
              キュレーター、フェスティバル、コレクターに向けて、作品の文脈と再演可能性が伝わるポートフォリオ設計を行っています。
            </Text>

            <Group gap="xs" justify="center">
              {MARKET_POINTS.map((point) => (
                <Badge
                  key={point}
                  variant="light"
                  color="gray"
                  radius="sm"
                  styles={{
                    root: {
                      textTransform: "none",
                      letterSpacing: "0.03em",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.18)",
                    },
                  }}
                >
                  {point}
                </Badge>
              ))}
            </Group>

            <Group mt="sm" gap="md">
              <Button component={Link} href="/works" variant="white" color="dark">
                View Works
              </Button>
              <Button component={Link} href="/contact" variant="outline" color="gray">
                Contact / Booking
              </Button>
            </Group>
          </Stack>
        </motion.div>
      </Center>
    </Box>
  );
}
