"use client";

import { Burger, Drawer, Stack, Text, Box, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <>
      {/* 常に最前面に固定表示されるヘッダーエリア */}
      <Box
        component="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "2rem", // 余白
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          pointerEvents: "none", // 重要: これによりヘッダーの隙間は背面のクリックを透過する
        }}
      >
        {/* 左上: アーティスト名 */}
        <Text
          component={Link}
          href="/"
          size="lg"
          fw={400}
          style={{
            pointerEvents: "auto", // ロゴはクリックできるように戻す
            textDecoration: "none",
            color: "inherit",
            letterSpacing: "0.1em",
          }}
        >
          Shoya Fukunaga
        </Text>

        {/* 右上: ハンバーガーボタン */}
        <Box style={{ pointerEvents: "auto" }}>
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            size="md"
            color="white"
          />
        </Box>
      </Box>

      {/* 全画面メニュー (Drawer) */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%" // 全画面表示
        withCloseButton={false} // デフォルトの閉じるボタンは消す（Burgerで制御）
        transitionProps={{ duration: 400, transition: "fade" }} // ふわっと表示
        styles={{
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#1A1B1E", // メニュー背景色（ダークグレー）
          },
        }}
      >
        <Center>
          <Stack gap={40} align="center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Text
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={close}
                  fz={32} // 大きめのフォントサイズ
                  fw={300}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "white" : "#888", // アクティブ以外は暗く
                    transition: "color 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "white" : "#888")
                  }
                >
                  {item.label}
                </Text>
              );
            })}
          </Stack>
        </Center>
      </Drawer>
    </>
  );
}
