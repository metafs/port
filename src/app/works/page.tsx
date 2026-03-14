import Link from "next/link";
import Image from "next/image";
import {
  Container,
  SimpleGrid,
  AspectRatio,
  Text,
  Box,
  Badge,
  Stack,
} from "@mantine/core";
import { getWorks } from "@/lib/microcms";

export const revalidate = 30;

export default async function WorksPage() {
  const works = await getWorks();

  if (works.length === 0) {
    return (
      <Container size="lg" py={120}>
        <Text c="dimmed" ta="center">
          No works found.
        </Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py={{ base: 96, md: 120 }}>
      <Stack gap={10} mb={50}>
        <Text fz={{ base: 30, md: 44 }} fw={300} style={{ letterSpacing: "0.08em" }}>
          Works
        </Text>
        <Text c="dimmed" maw={760} lh={1.75}>
          選定や依頼の判断をしやすいよう、作品タイトルと制作年を一覧化。
          各作品ページでコンセプト・クレジット・リンクへすぐアクセスできます。
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" verticalSpacing={42}>
        {works.map((work) => {
          const thumbnail = work.image?.[0] ? `${work.image[0].url}?w=900` : null;
          const displayYear = work.date
            ? new Date(work.date).getFullYear()
            : new Date(work.publishedAt).getFullYear();

          return (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <Box
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <AspectRatio ratio={16 / 10}>
                  <Box style={{ position: "relative", width: "100%", height: "100%" }}>
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={work.title}
                        fill
                        style={{ objectFit: "cover" }}
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
                          color: "#777",
                          backgroundColor: "#2C2E33",
                        }}
                      >
                        <Text fz="xs">No Image</Text>
                      </Box>
                    )}
                  </Box>
                </AspectRatio>

                <Box p="md">
                  <Badge variant="dot" color="gray" mb={8}>
                    {displayYear}
                  </Badge>
                  <Text fz={{ base: "lg", md: "xl" }} fw={400} style={{ letterSpacing: "0.03em" }}>
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
