"use client";

import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Box,
  ActionIcon,
  CopyButton,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconMail,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const EMAIL = "shoyafukunaga@gmail.com";
  const INSTAGRAM_URL = "https://instagram.com/v0._.idd";

  return (
    <Container
      size="sm"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <Stack gap={60} align="center">
          {/* タイトル */}
          <Box style={{ textAlign: "center" }}>
            <Title
              order={1}
              fw={300}
              style={{ letterSpacing: "0.15em", fontSize: "2.5rem" }}
            >
              Contact
            </Title>
            <Text c="dimmed" mt="md" style={{ letterSpacing: "0.05em" }}>
              出演依頼、ワークショップ、その他のお問い合わせはこちら
            </Text>
          </Box>

          {/* メールアドレスエリア (コピー機能付き) */}
          <Stack gap="xs" align="center">
            <IconMail size={32} stroke={1} color="#C1C2C5" />

            <Group gap="xs">
              <Text
                component="a"
                href={`mailto:${EMAIL}`}
                fz={{ base: 20, sm: 28 }}
                fw={300}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "#555")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderBottomColor = "transparent")
                }
              >
                {EMAIL}
              </Text>

              {/* コピーボタン */}
              <CopyButton value={EMAIL} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy email"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      color={copied ? "teal" : "gray"}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck style={{ width: rem(16) }} />
                      ) : (
                        <IconCopy style={{ width: rem(16) }} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Stack>

          {/* SNSリンク */}
          <Group gap="xl">
            <ActionIcon
              component="a"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="transparent"
              color="gray"
              style={{ transition: "transform 0.2s, color 0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.color = "gray";
              }}
            >
              <IconBrandInstagram size={32} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </motion.div>
    </Container>
  );
}
