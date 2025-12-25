import Image from "next/image";
import {
  Container,
  Text,
  Box,
  Stack,
  Grid,
  GridCol,
  Title,
  Divider,
} from "@mantine/core";
import { getCVData } from "@/lib/microcms";

export const revalidate = 60;

export default async function CVPage() {
  const data = await getCVData();
  if (!data)
    return (
      <Container size="lg" py={120}>
        <Text ta="center" c="dimmed">
          No CV data found.
        </Text>
      </Container>
    );

  return (
    <Container size="lg" py={120}>
      <Grid gutter={60}>
        <GridCol span={{ base: 12, md: 5 }}>
          <Stack align="center" style={{ position: "sticky", top: 120 }}>
            <Box
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "280px",
                aspectRatio: "3/4",
                overflow: "hidden",
                borderRadius: "4px",
                backgroundColor: "#2C2E33",
              }}
            >
              {data.image ? (
                <Image
                  src={data.image.url}
                  alt={data.name}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "blur(3px)",
                  }}
                  priority
                />
              ) : (
                <Box
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text c="dimmed">No Image</Text>
                </Box>
              )}
            </Box>
            <Box mt="md" style={{ textAlign: "center" }}>
              <Title order={3} fw={400} style={{ letterSpacing: "0.1em" }}>
                {data.name}
              </Title>
              <Text
                c="dimmed"
                size="sm"
                mt={4}
                style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Choreographer / Artist
              </Text>
            </Box>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 7 }}>
          <Stack gap={50}>
            {data.bio && (
              <Box>
                <Text fz="lg" mb="md" style={{ letterSpacing: "0.05em" }}>
                  Profile
                </Text>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.8,
                    color: "#C1C2C5",
                    fontSize: "0.95rem",
                    textAlign: "justify",
                  }}
                >
                  {data.bio}
                </Text>
              </Box>
            )}
            <Divider color="dark.6" />
            {data.cv && (
              <Box>
                <Text fz="lg" mb="md" style={{ letterSpacing: "0.05em" }}>
                  CV
                </Text>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 2.0,
                    color: "#A6A7AB",
                    fontSize: "0.9rem",
                    fontFeatureSettings: '"palt"',
                  }}
                >
                  {data.cv}
                </Text>
              </Box>
            )}
            {data.link && (
              <Box>
                <Text fz="lg" mb="sm" style={{ letterSpacing: "0.05em" }}>
                  Links
                </Text>
                <div
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: "#C1C2C5",
                  }}
                  dangerouslySetInnerHTML={{ __html: data.link }}
                />
              </Box>
            )}
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
