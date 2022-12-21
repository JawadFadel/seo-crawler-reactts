import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import moment, { Moment } from "moment";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import {
  Autocomplete,
  Backdrop,
  Button,
  Drawer,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import PageView from "@mui/icons-material/Pageview";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  DashboardStyledModal,
  DrawerDashboardStyled,
} from "../../style/dashboard.style";
import Seo from "../../types/seo";

export default function DashboardModal(props: {
  news: Seo;
  onClose: () => void;
}) {
  const [image, setImage] = useState<string>();
  const [data, setData] = useState<Seo>();

  return (
    <Modal onClose={() => props.onClose} open={true}>
      <Container
        maxWidth="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <DashboardStyledModal>
          <Box
            sx={{
              backgroundColor: "white",
              maxHeight: "98vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <IconButton onClick={props.onClose}>
                <Close />
              </IconButton>

              <div
                style={{ display: "flex", columnGap: 10, alignItems: "center" }}
              >
                <Typography
                  variant="h4"
                  fontSize={23}
                  fontWeight={"bold"}
                  color="black"
                >
                  {props.news.publisher}
                </Typography>
                <Avatar
                  src={props.news.logo ? props.news.logo : ""}
                  alt={props.news.title!}
                />
              </div>
            </div>
            <h1 dir="auto">{props.news.title}</h1>
            {image === "loading" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <img
                src={API + "/seo/image/" + props.news.image!}
                alt={props.news.title!}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            )}
            <div dir="auto">
              <h5>Author: {props.news.author} </h5>
              <h5>
                Publish Date:{" "}
                {moment(props.news.date).format("DD-MMM-yy hh:mm a")}{" "}
              </h5>
              <h5>Publisher: {props.news.publisher} </h5>
              <h5>Author: {props.news.author} </h5>
              <h5>
                {" "}
                Feed RSS:{" "}
                <a href={props.news.feed} target={"_blank"}>
                  {props.news.feed}
                </a>{" "}
              </h5>
              <h5>Keywords: {props.news.keywords} </h5>
              <h5>Topics: {props.news.topics} </h5>
              <h5>Address Country: {props.news.addressCountry} </h5>
              <h5>Address Locality: {props.news.addressLocality} </h5>
              <h5>Language: {props.news.lang?.toUpperCase()} </h5>
              <h5>Street Address: {props.news.streetAddress} </h5>
              <h5>Is Video: {props.news.video ? "true" : "false"} </h5>
            </div>
            <hr />

            <p dir="auto" style={{ margin: "15px 0px" }}>
              {props.news.description}{" "}
              <a
                href={props.news.url!}
                target={"_blank"}
                style={{ color: "blue", fontSize: 16 }}
              >
                Read More
              </a>
            </p>
          </Box>
        </DashboardStyledModal>
      </Container>
    </Modal>
  );
}
const NewsType: Seo = {
  logo: "",
  image: "",
  title: "",
  description: "",
  date: new Date(),
  lang: "",
  author: "",
  country: "",
  keywords: "",
  topics: "",
  publisher: "",
  url: "",
  video: "",
  addressCountry: "",
  addressLocality: "",
  postalCode: "",
  feed: "",
  streetAddress: "",
};
import { API } from "../../assets/source";
export function AddDashboardModal({
  news,
  onClose,
}: {
  news?: Seo;
  onClose: (e?: boolean) => void;
}) {
  const [modal, setModal] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<Seo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [date, setDate] = useState<Moment>();

  return (
    <Drawer open>
      {load && <LinearProgress />}
      <DrawerDashboardStyled
        onSubmit={(e) => {
          e.preventDefault();
          setLoad(true);
          setError(false);

          const form = new FormData(e.currentTarget);
          var seo: Seo = {};
          form.forEach((v, k) => {
            seo[`${k as keyof Seo}`] = v as any;
          });
          seo.url = data?.url;
          seo.image = data?.image;
          seo.logo = data?.logo;
          seo.lang = lang.filter((res) => res.name === seo.lang)[0].code;
          seo.country = countries.filter(
            (res) => res.label === seo.country
          )[0].code;
          (seo as any).date = new Date(seo.date!).toISOString();
          axios
            .post("/seo", seo)
            .then((res) => {
              setLoad(false);
              onClose(true);
            })
            .catch((e) => {
              setError(true);
              setLoad(false);
            });
        }}
      >
        {modal}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load && data !== undefined}
        >
          <CircularProgress />
        </Backdrop>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <h1>
            Add Meta
            {data && (
              <IconButton
                size="small"
                color="info"
                onClick={() =>
                  setModal([
                    <DashboardModal
                      onClose={() => setModal([])}
                      key={Date.now() + ""}
                      news={data!}
                    />,
                  ])
                }
              >
                <PageView fontSize="small" />
              </IconButton>
            )}
          </h1>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </div>{" "}
        <form
          onChange={(e) => {
            e.preventDefault();
            setError(false);
            const url = new FormData(e.currentTarget).get("url-data");
            if (url === null || url === "") {
              setData(undefined);
              return;
            }
            setLoading(true);

            setData(undefined);

            axios
              .patch("seo/" + url)
              .then((res) => {
                setData(res.data);
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                setError(true);
              });
          }}
          style={{ display: "flex" }}
        >
          <TextField
            name="url-data"
            disabled={loading}
            required
            placeholder="URL"
            label="URL"
            fullWidth
            size="small"
          />
        </form>
        {error && (
          <div>
            <h5 style={{ margin: 3 }}>Please try again</h5>
          </div>
        )}
        {loading ? (
          <div
            style={{ display: "flex", margin: 15, justifyContent: "center" }}
          >
            <CircularProgress size={20} />
          </div>
        ) : (
          <></>
        )}
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 20,
              marginTop: 20,
            }}
          >
            {Object.keys(NewsType)
              .sort((a, b) => (a > b ? 0 : 1))
              .map((res) =>
                res === "lang" ? (
                  <Autocomplete
                    id="country-select-demo"
                    fullWidth
                    options={lang}
                    autoHighlight
                    defaultValue={
                      lang.filter(
                        (ress) =>
                          ress.code === data["lang"]?.toLocaleLowerCase()
                      ).length > 0
                        ? lang.filter(
                            (ress) =>
                              ress.code === data["lang"]?.toLocaleLowerCase()
                          )[0]
                        : undefined
                    }
                    size="small"
                    getOptionLabel={(option) => option.name}
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
                        required
                        name="lang"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                ) : res === "country" ? (
                  <Autocomplete
                    id="country-select-demo"
                    fullWidth
                    options={countries}
                    autoHighlight
                    size="small"
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option.label} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a country"
                        required
                        name="country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                ) : res === "date" ? (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField {...props} name={res} required />
                      )}
                      label="Publish Date"
                      value={date ? date : moment(data[res])}
                      onChange={(e) => {
                        setDate(e!);
                      }}
                    />
                  </LocalizationProvider>
                ) : res === "image" ? (
                  <img
                    loading="eager"
                    data-src={data["logo"]!}
                    src={API + "/seo/image/" + data[res]!}
                    alt={data["title"]!}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                ) : res === "logo" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      columnGap: 5,
                    }}
                  >
                    <Typography variant="h5">{data["publisher"]}</Typography>

                    <Avatar
                      style={{ width: 56, height: 56 }}
                      src={data[res] ? data[res]! : ""}
                      alt={data["title"]!}
                    />
                  </div>
                ) : res === "url" ? (
                  <></>
                ) : (
                  <TextField
                    required={[
                      "lang",
                      "title",
                      "publisher",
                      "description",
                    ].includes(res)}
                    contentEditable={false}
                    defaultValue={data[`${res}` as keyof Seo]}
                    style={{ color: "black" }}
                    placeholder={res.toLocaleUpperCase()}
                    label={res.toLocaleUpperCase()}
                    fullWidth
                    size="small"
                    multiline
                    minRows={1}
                    maxRows={3}
                    key={res}
                    name={res}
                  />
                )
              )}
          </div>
        )}
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              columnGap: 5,
              marginTop: 15,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disableElevation
              color="info"
            >
              Add
            </Button>
            <Button variant="outlined" onClick={() => onClose()}>
              Cancel
            </Button>
          </div>
        )}
      </DrawerDashboardStyled>
    </Drawer>
  );
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countries: readonly CountryType[] = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan, Republic of China",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];

export var lang = [
  { code: "aa", name: "Afar" },
  { code: "ab", name: "Abkhazian" },
  { code: "ae", name: "Avestan" },
  { code: "af", name: "Afrikaans" },
  { code: "ak", name: "Akan" },
  { code: "am", name: "Amharic" },
  { code: "an", name: "Aragonese" },
  { code: "ar", name: "Arabic" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avaric" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "ba", name: "Bashkir" },
  { code: "be", name: "Belarusian" },
  { code: "bg", name: "Bulgarian" },
  { code: "bh", name: "Bihari languages" },
  { code: "bi", name: "Bislama" },
  { code: "bm", name: "Bambara" },
  { code: "bn", name: "Bengali" },
  { code: "bo", name: "Tibetan" },
  { code: "br", name: "Breton" },
  { code: "bs", name: "Bosnian" },
  { code: "ca", name: "Catalan; Valencian" },
  { code: "ce", name: "Chechen" },
  { code: "ch", name: "Chamorro" },
  { code: "co", name: "Corsican" },
  { code: "cr", name: "Cree" },
  { code: "cs", name: "Czech" },
  {
    code: "cu",
    name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
  },
  { code: "cv", name: "Chuvash" },
  { code: "cy", name: "Welsh" },
  { code: "da", name: "Danish" },
  { code: "de", name: "German" },
  { code: "dv", name: "Divehi; Dhivehi; Maldivian" },
  { code: "dz", name: "Dzongkha" },
  { code: "ee", name: "Ewe" },
  { code: "el", name: "Greek, Modern (1453-)" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "es", name: "Spanish; Castilian" },
  { code: "et", name: "Estonian" },
  { code: "eu", name: "Basque" },
  { code: "fa", name: "Persian" },
  { code: "ff", name: "Fulah" },
  { code: "fi", name: "Finnish" },
  { code: "fj", name: "Fijian" },
  { code: "fo", name: "Faroese" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Western Frisian" },
  { code: "ga", name: "Irish" },
  { code: "gd", name: "Gaelic; Scomttish Gaelic" },
  { code: "gl", name: "Galician" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "gv", name: "Manx" },
  { code: "ha", name: "Hausa" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "ho", name: "Hiri Motu" },
  { code: "hr", name: "Croatian" },
  { code: "ht", name: "Haitian; Haitian Creole" },
  { code: "hu", name: "Hungarian" },
  { code: "hy", name: "Armenian" },
  { code: "hz", name: "Herero" },
  {
    code: "ia",
    name: "Interlingua (International Auxiliary Language Association)",
  },
  { code: "id", name: "Indonesian" },
  { code: "ie", name: "Interlingue; Occidental" },
  { code: "ig", name: "Igbo" },
  { code: "ii", name: "Sichuan Yi; Nuosu" },
  { code: "ik", name: "Inupiaq" },
  { code: "io", name: "Ido" },
  { code: "is", name: "Icelandic" },
  { code: "it", name: "Italian" },
  { code: "iu", name: "Inuktitut" },
  { code: "ja", name: "Japanese" },
  { code: "jv", name: "Javanese" },
  { code: "ka", name: "Georgian" },
  { code: "kg", name: "Kongo" },
  { code: "ki", name: "Kikuyu; Gikuyu" },
  { code: "kj", name: "Kuanyama; Kwanyama" },
  { code: "kk", name: "Kazakh" },
  { code: "kl", name: "Kalaallisut; Greenlandic" },
  { code: "km", name: "Central Khmer" },
  { code: "kn", name: "Kannada" },
  { code: "ko", name: "Korean" },
  { code: "kr", name: "Kanuri" },
  { code: "ks", name: "Kashmiri" },
  { code: "ku", name: "Kurdish" },
  { code: "kv", name: "Komi" },
  { code: "kw", name: "Cornish" },
  { code: "ky", name: "Kirghiz; Kyrgyz" },
  { code: "la", name: "Latin" },
  { code: "lb", name: "Luxembourgish; Letzeburgesch" },
  { code: "lg", name: "Ganda" },
  { code: "li", name: "Limburgan; Limburger; Limburgish" },
  { code: "ln", name: "Lingala" },
  { code: "lo", name: "Lao" },
  { code: "lt", name: "Lithuanian" },
  { code: "lu", name: "Luba-Katanga" },
  { code: "lv", name: "Latvian" },
  { code: "mg", name: "Malagasy" },
  { code: "mh", name: "Marshallese" },
  { code: "mi", name: "Maori" },
  { code: "mk", name: "Macedonian" },
  { code: "ml", name: "Malayalam" },
  { code: "mn", name: "Mongolian" },
  { code: "mr", name: "Marathi" },
  { code: "ms", name: "Malay" },
  { code: "mt", name: "Maltese" },
  { code: "my", name: "Burmese" },
  { code: "na", name: "Nauru" },
  {
    code: "nb",
    name: "Bokmål, Norwegian; Norwegian Bokmål",
  },
  { code: "nd", name: "Ndebele, North; North Ndebele" },
  { code: "ne", name: "Nepali" },
  { code: "ng", name: "Ndonga" },
  { code: "nl", name: "Dutch; Flemish" },
  { code: "nn", name: "Norwegian Nynorsk; Nynorsk, Norwegian" },
  { code: "no", name: "Norwegian" },
  { code: "nr", name: "Ndebele, South; South Ndebele" },
  { code: "nv", name: "Navajo; Navaho" },
  { code: "ny", name: "Chichewa; Chewa; Nyanja" },
  { code: "oc", name: "Occitan (post 1500)" },
  { code: "oj", name: "Ojibwa" },
  { code: "om", name: "Oromo" },
  { code: "or", name: "Oriya" },
  { code: "os", name: "Ossetian; Ossetic" },
  { code: "pa", name: "Panjabi; Punjabi" },
  { code: "pi", name: "Pali" },
  { code: "pl", name: "Polish" },
  { code: "ps", name: "Pushto; Pashto" },
  { code: "pt", name: "Portuguese" },
  { code: "qu", name: "Quechua" },
  { code: "rm", name: "Romansh" },
  { code: "rn", name: "Rundi" },
  { code: "ro", name: "Romanian; Moldavian; Moldovan" },
  { code: "ru", name: "Russian" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "sa", name: "Sanskrit" },
  { code: "sc", name: "Sardinian" },
  { code: "sd", name: "Sindhi" },
  { code: "se", name: "Northern Sami" },
  { code: "sg", name: "Sango" },
  { code: "si", name: "Sinhala; Sinhalese" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "sm", name: "Samoan" },
  { code: "sn", name: "Shona" },
  { code: "so", name: "Somali" },
  { code: "sq", name: "Albanian" },
  { code: "sr", name: "Serbian" },
  { code: "ss", name: "Swati" },
  { code: "st", name: "Sotho, Southern" },
  { code: "su", name: "Sundanese" },
  { code: "sv", name: "Swedish" },
  { code: "sw", name: "Swahili" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "tg", name: "Tajik" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "tk", name: "Turkmen" },
  { code: "tl", name: "Tagalog" },
  { code: "tn", name: "Tswana" },
  { code: "to", name: "Tonga (Tonga Islands)" },
  { code: "tr", name: "Turkish" },
  { code: "ts", name: "Tsonga" },
  { code: "tt", name: "Tatar" },
  { code: "tw", name: "Twi" },
  { code: "ty", name: "Tahitian" },
  { code: "ug", name: "Uighur; Uyghur" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vi", name: "Vietnamese" },
  { code: "vo", name: "Volapük" },
  { code: "wa", name: "Walloon" },
  { code: "wo", name: "Wolof" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "za", name: "Zhuang; Chuang" },
  { code: "zh", name: "Chinese" },
  { code: "zu", name: "Zulu" },
];
