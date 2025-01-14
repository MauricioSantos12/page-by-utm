import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUrl = window.location.href;
        const haveUtm = window.location.href.includes("utm") ? true : false;
        const response = await fetch(
          "https://agente-ai-backend.onrender.com/api/creator-html",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatHistory: [],
              message: haveUtm
                ? currentUrl
                : "https://www.some.com/something-else/?utm_topic=Utel&utm_typeLp=femsa",
              utm: true,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && result.responseModel) {
          setData(result.responseModel);
        }
      } catch (error) {
        setData(null);
      }
    };

    fetchData();
  }, []);

  const RenderCards = () => {
    return (
      <Card
        sx={{
          width: 245,
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            width: 245,
            m: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            flexDirection: "column",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton animation="wave" height={20} width="80%" />
          <Skeleton animation="wave" height={20} width="80%" />
          <Skeleton animation="wave" height={20} width="80%" />
        </CardContent>
      </Card>
    );
  };

  const RenderSkeleton = () => {
    return (
      <Box
        component="section"
        sx={{
          p: 5,
          height: "auto",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          height={"auto"}
          gap={2}
        >
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"auto"}
          gap={2}
        >
          <Skeleton variant="rounded" width={"30%"} height={40} />
          <Skeleton variant="rounded" width={"70%"} height={40} />
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"auto"}
          gap={2}
        >
          <Skeleton variant="rounded" width={"70%"} height={40} />
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"auto"}
          gap={2}
        >
          <Skeleton variant="rounded" width={"30%"} height={40} />
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          height={"auto"}
          justifyContent={{
            base: "center",
            md: "flex-start",
          }}
        >
          <Box
            display={"flex"}
            width={"100%"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            height={"auto"}
            justifyContent={{
              base: "center",
              md: "flex-start",
            }}
          >
            {Array(3)
              .fill(null)
              .map((item, index) => (
                <RenderCards key={index} />
              ))}
          </Box>
          <Box
            display={"flex"}
            width={"100%"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            height={"auto"}
            justifyContent={{
              base: "center",
              md: "flex-start",
            }}
            ml={{
              base: "auto",
              md: 15,
            }}
          >
            {Array(2)
              .fill(null)
              .map((item, index) => (
                <RenderCards key={index} />
              ))}
          </Box>
        </Box>
      </Box>
    );
  };

  return data ? (
    <div
      dangerouslySetInnerHTML={{ __html: data }}
      style={{ margin: 0, padding: 0 }}
    />
  ) : (
    <RenderSkeleton />
  );
}

export default App;
