import axios from "axios";
import React, { Fragment, useState } from "react";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBinary, setFileBinary] = useState(null);
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = function (e) {
      setFileBinary(e.target.result);
      console.log(e.target.result);
    };
  };
  const fileUploadHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID {{HafezHammamy}}");

    var formdata = new FormData();
    formdata.append("image", fileBinary);

    console.log(formdata);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <Fragment>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}> Upload </button>
    </Fragment>
  );
};

export default Uploader;
