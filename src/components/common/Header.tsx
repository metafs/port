"use client";

import {
  Burger,
  Drawer,
  Stack,
  Text,
  Box,
  Center,
  Group,
  Anchor,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
  const isDesktop = useMediaQuery("(min-width: 62em)");

  return (
    <>
      <Box
        component="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "1rem clamp(1rem, 2.8vw, 2.5rem)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(16, 17, 19, 0.6)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Text
          component={Link}
          href="/"
          size="sm"
          fw={500}
          style={{
            textDecoration: "none",
            color: "white",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Shoya Fukunaga
        </Text>

        {isDesktop ? (
          <Group gap={28}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Anchor
                  key={item.href}
                  component={Link}
                  href={item.href}
                  underline="never"
                  c={isActive ? "white" : "gray.5"}
                  fw={isActive ? 500 : 400}
                  style={{
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.82rem",
                  }}
                >
                  {item.label}
                </Anchor>
              );
            })}
          </Group>
        ) : (
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            size="sm"
            color="white"
          />
        )}
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        withCloseButton={false}
        transitionProps={{ duration: 350, transition: "fade" }}
        styles={{
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#101113",
          },
        }}
      >
        <Center>
          <Stack gap={34} align="center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Text
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={close}
                  fz={32}
                  fw={300}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "white" : "#888",
                    letterSpacing: "0.08em",
                  }}
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
