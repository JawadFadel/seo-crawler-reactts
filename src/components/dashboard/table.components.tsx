import AddOutlined from "@mui/icons-material/AddOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import DashboardModal, { AddDashboardModal } from "./modal.components";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import Seo from "../../types/seo";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => (
      <Avatar
        alt={params.row.title!}
        src={params.row.logo ? params.row.logo : ""}
        title={params.row.title!}
      />
    ),
  },

  {
    field: "publisher",
    headerName: "Publisher",
    width: 150,
    maxWidth: 250,
  },

  {
    field: "title",
    headerName: "Title",
    minWidth: 400,
    maxWidth: 600,
    renderCell: (params) => <p dir="auto">{params.row.title}</p>,
  },
  {
    field: "description",
    headerName: "Description",
    renderCell: (params) => <p dir="auto">{params.row.description}</p>,
    minWidth: 400,
    maxWidth: 600,
  },
  {
    field: "topics",
    headerName: "Topics",
    width: 120,
  },
  {
    field: "country",
    headerName: "Country",
    width: 160,
    maxWidth: 230,
  },
  {
    field: "date",
    headerName: "Date",
    width: 160,
    maxWidth: 230,

    valueGetter: (params) =>
      moment(params.row.date).format("DD-MM-yyy hh:mm a"),
  },
  {
    field: "lang",
    headerName: "Lang",
    width: 60,
  },
  {
    field: "keywords",
    headerName: "Keywords",
    width: 260,
  },

  {
    renderCell: (params) => (
      <a
        rel="noreferrer"
        style={{ color: "blueviolet" }}
        href={params.row.url!}
        target={"_blank"}
      >
        {params.row.url}
      </a>
    ),
    field: "url",
    headerName: "URL",
    width: 100,
    maxWidth: 230,
  },

  {
    renderCell: (params) => (
      <a
        rel="noreferrer"
        style={{ color: "blueviolet" }}
        href={params.row.image!}
        target={"_blank"}
      >
        {params.row.image}
      </a>
    ),
    field: "image",
    headerName: "Image",
    width: 100,
    maxWidth: 230,
  },

  {
    renderCell: (params) => (
      <a
        rel="noreferrer"
        style={{ color: "blueviolet" }}
        href={params.row.video!}
        target={"_blank"}
      >
        {params.row.video}
      </a>
    ),
    field: "video",
    headerName: "Video",
    width: 100,
    maxWidth: 230,
  },
];

export default function DashboardTable(props: {
  news: Seo[];
  child: any;
  onUpdate: () => void;
}) {
  const [modal, setModal] = useState<any>([]);
  const [select, setSelect] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {modal}
      {loading && <LinearProgress />}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Table</h1>

        <div>
          <IconButton
            color="inherit"
            onClick={async () => {
              setLoading(true);
              for await (var item of select) {
                await axios.delete("/seo/" + item);
              }

              setLoading(false);
              setSelect([]);
              if (select.length === 0) {
                return;
              }
              props.onUpdate();
            }}
          >
            <DeleteOutlined />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => {
              setModal([
                <AddDashboardModal
                  onClose={(e) => {
                    if (e) {
                      props.onUpdate();
                    }
                    setModal([]);
                  }}
                  news={undefined}
                />,
              ]);
            }}
          >
            <AddOutlined />
          </IconButton>
        </div>
      </div>
      {props.child}
      <DataGrid
        rows={props.news}
        columns={columns}
        rowsPerPageOptions={[1000]}
        checkboxSelection
        onSelectionModelChange={(e) => {
          setSelect(e);
        }}
        onRowDoubleClick={(e) => {
          setModal(() => [
            <DashboardModal
              onClose={() => setModal([])}
              news={e.row}
              key={Date.now()}
            />,
          ]);
        }}
      />
    </Box>
  );
}
