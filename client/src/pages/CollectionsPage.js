import React, { useState } from "react";
import { ModalCreate } from "../components/ModalCreate";

// arrayBufferToBase64(buffer) {
//     var binary = '';
//     var bytes = [].slice.call(new Uint8Array(buffer));
//     bytes.forEach((b) => binary += String.fromCharCode(b));
//     return window.btoa(binary);
// };

export const CollectionsPage = () => {
    const [image, setImage] = useState('')
    // const onFileChangeHandler = (event) => {
    //     setImage({[event.target.name]: event.target.files[0]})
    //     console.log('uuu' , event.target.files[0])}

        const downloadImage = async ()  => {
            try {
            const data = await fetch( '/api/collection/stats', 'POST', {image})
           console.log(data)
          
            } catch (e) {
              console.log(e.message);
            }
          }
return (
<div>

<ModalCreate className='modalBtn' />
<form action="/stats" enctype="multipart/form-data" method="post">
  <div class="form-group">
    <input type="file" class="form-control-file" name="uploaded_file"/>
    <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers" />
    <input type="submit" value="Get me the stats!" class="btn btn-default" onClick={downloadImage} />            
  </div>
</form>
</div> )
}