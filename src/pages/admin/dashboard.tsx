import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import Seo from "../../types/seo";
import DashboardTable from "../../components/dashboard/table.components";

export default function DashboardScreen() {
  const [news, setNews] = useState<Seo[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get("/seo").then((res) => {
      setNews(res.data);
    });
  }, []);

  return (
    <>
      <Container>
        {news ? (
          <DashboardTable
            key={new Date().getTime()}
            child={loading ? <LinearProgress /> : null}
            news={news}
            onUpdate={() => {
              setLoading(true);

              axios
                .get("/seo")
                .then((e) => {
                  setNews(e.data);
                })
                .catch((e) => {})
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
