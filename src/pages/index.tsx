import { Box, Card, Container, TextField, Typography } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from "react";
import SEO from "../types/seo";
import axios from "axios";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Moment } from "moment";
import Autocomplete from "@mui/material/Autocomplete";
import { countries, lang } from "../assets/source";
import moment from "moment";
import IndexCardComponent from "../components/index/card.component";

export default function BasicMasonry() {
  const [seo, setSeo] = useState<SEO[]>();
  useEffect(() => {
    axios.get<SEO[]>("/seo").then((res) => {
      setSeo(res.data);
    });

    return () => {};
  }, []);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState<{
    start: undefined | Moment;
    end: undefined | Moment;
  }>({
    start: undefined,
    end: undefined,
  });

  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <>
      <Card style={{ margin: 15, padding: 10 }} variant="outlined">
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Filter Data
        </Typography>
        <div
          style={{
            display: "flex",
            columnGap: 5,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid key={1} item xs={12} sm={6} md={4} lg={2}>
              <TextField
                label="Search"
                placeholder="search..."
                size="small"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid key={2} item xs={12} sm={6} md={4} lg={2}>
              <TextField
                label="Publisher"
                placeholder="search..."
                size="small"
                fullWidth
                onChange={(e) => setPublisher(e.target.value)}
              />
            </Grid>
            <Grid key={3} item xs={12} sm={6} md={4} lg={2}>
              <Autocomplete
                fullWidth
                onSelect={(e) => {
                  setCountry((e.target as any).value);
                }}
                size="small"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.code}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width={20}
                      height={20}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt={option.label}
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      "aria-autocomplete": "none",
                      autoComplete: "new-password-adsadasdsa", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid key={4} item xs={12} sm={6} md={4} lg={2}>
              <Autocomplete
                size="small"
                fullWidth
                onSelect={(e) => {
                  setLanguage((e.target as any).value);
                }}
                options={lang}
                autoHighlight
                getOptionLabel={(option) => option.code}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a Language"
                    inputProps={{
                      ...params.inputProps,
                      "aria-autocomplete": "none",
                      autoComplete: "new-password-sa", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid key={6} item xs={12} sm={6} md={4} lg={2}>
                <DatePicker
                  label="From"
                  value={date.start}
                  onChange={(newValue) => {
                    setDate((prev) => ({ ...prev, start: newValue! }));
                  }}
                  renderInput={(params) => (
                    <TextField size="small" fullWidth {...(params as any)} />
                  )}
                />
              </Grid>
              <Grid key={5} item xs={12} sm={6} md={4} lg={2}>
                <DatePicker
                  label="To"
                  value={date.end}
                  onChange={(newValue) => {
                    setDate((prev) => ({ ...prev, end: newValue! }));
                  }}
                  renderInput={(params) => (
                    <TextField size="small" fullWidth {...(params as any)} />
                  )}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </div>
      </Card>

      <Container>
        {seo ? (
          <ResponsiveMasonry columnsCountBreakPoints={breakpointColumnsObj}>
            <Masonry>
              {seo
                .filter(
                  (res) =>
                    (search === "" || search === undefined
                      ? true
                      : res
                          .title!.toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase()) ||
                        res
                          .description!.toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())) &&
                    (language === "" || language === undefined
                      ? true
                      : res
                          .lang!.toLocaleLowerCase()
                          .includes(language.toLocaleLowerCase())) &&
                    (country === "" || country === undefined
                      ? true
                      : res
                          .country!.toLocaleLowerCase()
                          .startsWith(country.toLocaleLowerCase())) &&
                    (publisher === "" || publisher === undefined
                      ? true
                      : res
                          .publisher!.toLocaleLowerCase()
                          .includes(publisher.toLocaleLowerCase())) &&
                    (date.start
                      ? moment(res.date).startOf("day").toDate() >=
                        date.start.startOf("day").toDate()
                      : true) &&
                    (date.end
                      ? moment(res.date).startOf("day").toDate() <=
                        date.end.startOf("day").toDate()
                      : true)
                )
                .map((res) => (
                  <IndexCardComponent news={res} key={res.id} />
                ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </>
  );
}
const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
  400: 1,
};
