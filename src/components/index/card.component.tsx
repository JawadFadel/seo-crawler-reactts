import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import SEO from "../../types/seo";
import { API } from "../../assets/source";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
export default function IndexCardComponent({ news }: { news: SEO }) {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: "auto", height: "auto", margin: 1 }}
    >
      <CardHeader
        style={{ alignItems: "start", padding: 5 }}
        avatar={
          <Avatar src={news.logo + ""} sx={{ width: 40, height: 40 }}>
            {news.publisher}
          </Avatar>
        }
        title={news.publisher}
        sx={{ fontSize: 13 }}
        subheader={
          <div>
            <Typography fontSize={13}>
              {moment(news.date).format("MMMM DD, yyyy hh:mm a")},{" "}
              {news.lang?.toUpperCase()}
            </Typography>
            <Typography fontSize={13}>{news.country}</Typography>
          </div>
        }
      />
      <CardActionArea
        onClick={() => {
          window.open(news.url?.toString(), "_blank")!.focus();
        }}
      >
        <CardMedia>
          <ImageFallback news={news} />
        </CardMedia>
      </CardActionArea>
      <CardContent style={{ overflow: "hidden", padding: 6 }} dir="auto">
        <Typography
          key={1}
          variant="h5"
          fontSize={18}
          fontFamily={news.lang === "ar" ? "arabic" : "roboto"}
        >
          {news.title}
        </Typography>
        <Typography
          fontFamily={news.lang === "ar" ? "arabic" : "roboto"}
          key={2}
          marginTop={1}
          variant="body2"
          color="text.secondary"
          fontSize={16}
        >
          {news.description}
        </Typography>
        {news.topics?.split(",").map((res) => (
          <Typography key={3} variant="caption" color={"blueviolet"}>
            {res}{" "}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <a
          href={news.url!}
          target={"_blank"}
          style={{ color: "blue", fontSize: 14, textDecoration: "none" }}
        >
          Read More
        </a>
      </CardActions>
    </Card>
  );
}
function ImageFallback({ news }: { news: SEO }) {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    setImage(news.image + "");
  }, []);
  return image === "loading" || !image ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <div className="c">
      <style>
        {`
        .c { position: relative; }
        .c img { display: block; }
        .c .ico { position: absolute; top:5px; right:5px; }
      `}
      </style>
      <Image src={news.image!} title={news.title!} />
      {news.video ? (
        news.video !== "" ? (
          <PlayCircleIcon
            style={{
              color: "#rgb(244 67 54)",
              fontSize: 50,
              background: "#f4433657",
              borderRadius: 60,
            }}
            className="ico"
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

const Image = memo(function Image(props: { src: string; title: string }) {
  return (
    <img
      style={{
        width: "100%",
        height: "180px",
        objectFit: "cover",
      }}
      src={API + "/seo/image/" + props.src}
      alt={props.title + ""}
      height={300}
      width={300}
    />
  );
});
