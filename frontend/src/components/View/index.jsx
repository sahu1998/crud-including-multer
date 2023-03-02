import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button, Container } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useEffect } from "react";
import { deleteApiHandler, getApiHandler, serverUrl } from "../../apiHandler";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
export default function ContactTable() {
  const [contact, setContact] = useState([]);
  const history = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return params.api.getRowIndex(params.row._id) + 1;
      },
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        const image = params.row.image?.split("\\")[1];
        return (
          <Avatar
            alt={params.row.name}
            src={image && `${serverUrl}/user/${image}`}
            sx={{ width: 50, height: 50 }}
            variant="rounded"
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "age", headerName: "Age", width: 20 },
    { field: "contact", headerName: "Contact", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              deleteContact(params.row._id);
            }}
            endIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              updateContact(params.row._id);
            }}
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        );
      },
    },
  ];

  const updateContact = (id) => {
    console.log("updateContact: ", id);
    history(`/addContact?id=${id}`);
  };

  const deleteContact = async (id) => {
    const result = await deleteApiHandler(
      `/${id}?token=${localStorage.getItem("token")}`
    );
    if (result.data.status === 200) {
      console.log("delete result: ", result);
      getContact();
    } else {
      localStorage.clear();
      history("/signin");
    }
  };

  const getContact = async () => {
    handleToggle();
    const temp = await getApiHandler(
      `/?token=${localStorage.getItem("token")}`
    );
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.response);
    } else {
      localStorage.clear();
      history("/signin");
    }
    handleClose();
  };

  useEffect(() => {
    getContact();
  }, []);
  return (
    <MainLayout>
      {/* <Container> */}
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div
          style={{
            height: 600,
            width: "100%",
          }}
        >
          <DataGrid
            rows={contact}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row._id}
            density="comfortable"
            autoPageSize={true}
          />
        </div>
      )}
      {/* </Container> */}
    </MainLayout>
  );
}
