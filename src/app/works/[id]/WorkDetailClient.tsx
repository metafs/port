"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Text,
  Box,
  Button,
  Group,
  Stack,
  SimpleGrid,
  Modal,
  UnstyledButton,
  CloseButton,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Work } from "@/types";

type Props = {
  work: Work;
};

export default function WorkDetailClient({ work }: Props) {
  const [openedImage, setOpenedImage] = useState<string | null>(null);

  const mainImage =
    work.image && work.image.length > 0 ? work.image[0].url : null;
  const galleryImages =
    work.image && work.image.length > 1 ? work.image.slice(1) : [];

  // 修正: dateはテキストエリアなので、Date型への変換処理を削除してそのまま使う
  // const workYear = ... (削除)

  return (
    <Box pb={100}>
      {/* 1. タイトルエリア (Sticky) */}
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          width: "100%",
          backgroundColor: "rgba(16, 17, 19, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "80px",
          paddingBottom: "20px",
          transition: "background-color 0.3s",
        }}
      >
        <Container size="xl">
          {/* 修正: タイトルと日付を横並びにする */}
          <Group align="baseline" gap="md">
            <Text
              c="white"
              fz={{ base: 24, md: 40 }}
              fw={300}
              lh={1.1}
              style={{ letterSpacing: "0.05em" }}
            >
              {work.title}
            </Text>

            {/* 日付をタイトルの右横に小さく表示 */}
            {work.date && (
              <Text c="dimmed" fz="sm" style={{ letterSpacing: "0.05em" }}>
                {work.date}
              </Text>
            )}
          </Group>
        </Container>
      </Box>

      {/* 2. メイン画像エリア */}
      <Box
        style={{
          width: "100%",
          height: "70vh",
          position: "relative",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        {mainImage ? (
          <>
            <Image
              src={`${mainImage}?w=200`}
              alt=""
              fill
              style={{ objectFit: "cover", opacity: 0.3, filter: "blur(20px)" }}
            />
            <Image
              src={`${mainImage}?w=1920`}
              alt={work.title}
              fill
              style={{ objectFit: "contain", zIndex: 1 }}
              priority
            />
          </>
        ) : (
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#444",
            }}
          >
            <Text>No Visual</Text>
          </Box>
        )}
      </Box>

      {/* 3. コンテンツエリア */}
      <Container size="md" mt={80}>
        <Stack gap={60}>
          {work.body && (
            <Text
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 2,
                fontSize: "1rem",
                color: "#C1C2C5",
              }}
            >
              {work.body}
            </Text>
          )}

          {galleryImages.length > 0 && (
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {galleryImages.map((img, index) => (
                <UnstyledButton
                  key={index}
                  onClick={() => setOpenedImage(img.url)}
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "4px",
                  }}
                >
                  <Image
                    src={`${img.url}?w=800`}
                    alt={`${work.title} gallery ${index + 1}`}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.3s" }}
                    className="hover-zoom"
                  />
                </UnstyledButton>
              ))}
            </SimpleGrid>
          )}

          {work.credit && (
            <Box>
              <Text
                fz="sm"
                c="dimmed"
                mb="sm"
                style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                Credits
              </Text>
              <Text
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                {work.credit}
              </Text>
            </Box>
          )}
          {work.link && (
            <Box>
              <Text
                fz="sm"
                c="dimmed"
                mb="sm"
                style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                Links
              </Text>
              <div
                style={{ fontSize: "0.9rem" }}
                dangerouslySetInnerHTML={{ __html: work.link }}
              />
            </Box>
          )}
        </Stack>

        <Group mt={100}>
          <Link href="/works" style={{ textDecoration: "none" }}>
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconArrowLeft size={16} />}
              component="div"
            >
              Back to Works
            </Button>
          </Link>
        </Group>
      </Container>

      {/* 4. モーダル */}
      <Modal
        opened={!!openedImage}
        onClose={() => setOpenedImage(null)}
        fullScreen
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          },
          content: { backgroundColor: "transparent" },
        }}
        transitionProps={{ duration: 300, transition: "fade" }}
      >
        <CloseButton
          onClick={() => setOpenedImage(null)}
          size="xl"
          variant="transparent"
          c="white"
          style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}
        />
        {openedImage && (
          <Box
            style={{ position: "relative", width: "100%", height: "100%" }}
            onClick={() => setOpenedImage(null)}
          >
            <Image
              src={`${openedImage}?w=2000`}
              alt="Enlarged view"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
      </Modal>
    </Box>
  );
}
