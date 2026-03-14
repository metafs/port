// src/app/works/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  SimpleGrid,
  AspectRatio,
  Text,
  Box,
  Overlay,
} from "@mantine/core";
import { getWorks } from "@/lib/microcms";

// 30秒ごとのISR
export const revalidate = 30;

export default async function WorksPage() {
  const works = await getWorks();

  console.log("Works Data:", JSON.stringify(works, null, 2));

  if (works.length === 0) {
    return (
      <Container size="lg" py={100}>
        <Text c="dimmed" ta="center">
          No works found.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py={100}>
      <Text fz={40} mb={60} fw={300} style={{ letterSpacing: "0.1em" }}>
        Works
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="xl"
        verticalSpacing={60}
      >
        {works.map((work) => {
          const thumbnail =
            work.image && work.image[0] ? `${work.image[0].url}?w=800` : null;
          return (
            // 【修正箇所】Box component={Link} をやめて、Linkタグで直接囲む
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Box>
                {/* 画像エリア */}
                <AspectRatio
                  ratio={16 / 9}
                  style={{
                    overflow: "hidden",
                    borderRadius: "4px",
                    backgroundColor: "#2C2E33",
                  }}
                >
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={work.title}
                        fill
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.5s",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <Box
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#555",
                        }}
                      >
                        <Text fz="xs">No Image</Text>
                      </Box>
                    )}
                    <Overlay opacity={0} color="#000" zIndex={1} />
                  </Box>
                </AspectRatio>

                {/* テキスト情報 */}
                <Box mt="md">
                  <Text fz="sm" c="dimmed" mb={4}>
                    {new Date(work.publishedAt).getFullYear()}
                  </Text>
                  <Text fz="xl" fw={400} style={{ letterSpacing: "0.05em" }}>
                    {work.title}
                  </Text>
                </Box>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
