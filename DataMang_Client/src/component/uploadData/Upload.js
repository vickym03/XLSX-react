import React, { useState } from "react";
import "./Upload.css";
import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SendIcon from "@mui/icons-material/Send";
import * as XLSX from "xlsx";
import MapData from "../map/MapData";
import { Verified } from "@mui/icons-material";

function Upload() {
  const [excelFile, setExcelFile] = useState(undefined);
  const [excelFileError, setExcelFileError] = useState();

  // submit
  const [excelData, setExcelData] = useState();
  const [showdata, setShowdata] = useState(false);
  const [showupload, setShowupload] = useState(true);

  // ALERT DATA
  const [alertEmpty, setAlertEmpty] = useState("");

  //valid rows of file
  const [rowValid, setrowValid] = useState(" ");
  const Save = () => {
    if (excelData !== undefined && excelData.length > 0) {
      setShowdata(true);
      setShowupload(false);
    }
  };

  const handleBack = () => {
    setExcelData(undefined);
    setShowdata(false);
    setShowupload(true);
    setAlertEmpty("");
    setrowValid("");
    //console.log("data", excelData.length)
  };

  const Delete = (e) => {
    e.preventDefault();

    console.log("e", e);
    // window.location.reload();
  };

  const checkName = (name) => {
    console.log("cheackName", name);
    const acceptOnly = ["xlsx", "xlx"];
    return acceptOnly.includes(name.split(".").pop().toLowerCase());
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const file = e.target.files[0];
      // console.log(selectedFile.type);
      if (checkName(file.name)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          console.log("e", e);
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types !");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // console.log({alertEmpty})
      if (data.length === 0) setAlertEmpty("Error in file uploaded");
      else setAlertEmpty(" ");
      //check for rows..........
      data.forEach((val) => {
        console.log("ForEach", val);
        let dkey = Object.keys(val);
        console.log("dkey", dkey);
        if (
          (dkey[0] === "Name" &&
            dkey[1] === "Class" &&
            dkey[2] === "Age" &&
            dkey[3] === "Attendance") ||
          (dkey[0] === "" && dkey[1] === "" && dkey[2] === "" && dkey[3] === "")
        ) {
          // save function
          Save(); //original place
          console.log(true);

          setExcelData(data);
        } else {
          console.error("error", val);
          setExcelData(0);
          setrowValid("Error");
        }
      });
      console.log("data", data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div id="mainbody">
      {showupload && (
        <div id="body">
          <div className="container ">
            <div className="col-lg-10 ">
              <div id="card">
                <h2 className="mt-2">Select the file from here</h2>
                {/* <CloudUploadOutlinedIcon
                    color="primary"
                    style={{ fontSize: 100 }}
                  /> */}

                <form
                  className="form-group"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/2716/premium/2716054.png?token=exp=1654058658~hmac=c539445a4feaf8c406dcaae63bb70432 "
                    height={100}
                    width={100}
                    alt="no pic"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="file"
                    className="form-control"
                    name="uplife"
                    accept="xlsx, xls"
                    multiple={false}
                    onChange={handleFile}
                    required
                  />
                  {excelFileError && (
                    <div className=" text-danger mt-1" id="errornoti">
                      {excelFileError}
                    </div>
                  )}
                  <div className=" text-danger mt-1" id="errornoti">
                    {alertEmpty}
                  </div>
                  <div className=" text-danger mt-1" id="errornoti">
                    {rowValid}
                  </div>
                  <br />
                  <div direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<CancelOutlinedIcon />}
                      style={{ margin: 10 }}
                      onClick={Delete}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showdata && (
        <MapData
          data={excelData !== undefined && excelData}
          cancel={handleBack}
        />
      )}
    </div>
  );
}
export default Upload;
