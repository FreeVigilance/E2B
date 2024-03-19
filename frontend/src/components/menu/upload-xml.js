// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { displaySelector, setUploadedFile } from "@src/features/display/slice";
// import axios from "axios";

// export const UploadXml = () => {
//     const dispatch = useDispatch();

//     const { uploadedFile } = useSelector(displaySelector);

//     const handleFileChange = (e) => {
//         if (e.target.files) {
//             dispatch(setUploadedFile(e.target.files[0]));
//         }
//     };
  
//     const handleUploadClick = () => {
//         console.log(uploadedFile);
//         if (!uploadedFile) {
//             return;
//         }
//         axios.get(uploadedFile, {
//             "Content-Type": "application/xml; charset=utf-8"
//          })
//          .then((response) => {
//             console.log('Your xml file as string', response.data);
//          });
  
//         // var rawFile = new XMLHttpRequest();
//         // rawFile.open("GET", uploadedFile, false);
//         // console.log(rawFile);
//         // rawFile.onreadystatechange = () => {
//         //     console.log(rawFile)
//         //     if (rawFile.readyState === 4) {
//         //         console.log("!")
//         //         if (rawFile.status === 200 || rawFile.status == 0) {
//         //             console.log("!!")
//         //             var xmlasstring = rawFile.responseText;
//         //             console.log('Your xml file as string', xmlasstring)
//         //         }
//         //     }
//         // }
//         // axios.get(uploadedFile, {
//         //     "Content-Type": "application/xml; charset=utf-8"
//         // })
//         // .then((response) => {
//         //     console.log('Your xml file as string', response.data);
//         // });
//     };
  
//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
    
//             <div>{uploadedFile && `${uploadedFile.name}`}</div>
    
//             <button onClick={handleUploadClick}>Upload</button>
//         </div>
//     );
//   }
