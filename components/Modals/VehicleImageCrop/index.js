import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import ImageCropper from "components/ImageCropper"

const VehicleImageCropping=({vehicleImagesRef,handleImageCropped})=> {
    const [showModal,setShowModal]=useState(false);
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [croppedFile,setCroppedFile]=useState(undefined)
    const [imageName,setImageName]=useState(undefined)
    const [maxWidth]=useState(0)

    // const findSizeOfTheImage=(image)=>{
    //     return new Promise((res,rej)=>{
    //         var _URL = window.URL || window.webkitURL;
    //         var file, img;
    //         if ((file = image)) {
    //             img = new Image();
    //             var objectUrl = _URL.createObjectURL(file);
    //             img.onload = function () {
    //                 res({width:this.width,height:this.height})
    //                 _URL.revokeObjectURL(objectUrl);
    //             };
    //             img.src = objectUrl;
    //         }
    //     })
    // }
    const onChangeImages =async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            //********  find size of the image ******/
            //const imageSize=await findSizeOfTheImage(e.target.files[0])
             //setMaxWidth(imageSize?.width||0)
            //************************************* */

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              const image = reader.result;
              setShowModal(true)
              setImageName(e.target.files[0].name)
              setImageToCrop(image);
            });
      
            reader.readAsDataURL(e.target.files[0]);
          }
          return
         
     }
     const handleSubmit=()=>{
        if (croppedImage&&croppedFile) {
            const requiredData= [{
                    name: imageName,
                    key: croppedImage,
                    value: croppedFile,
                    delete: false
                }]
                handleImageCropped(requiredData)
                setShowModal(false)
        }
     }
    return (
        <>
        {!showModal?
          <input type="file" onChange={onChangeImages} multiple={false} accept=".png, .jpg, .jpeg" name={"vehile_images"} ref={el => vehicleImagesRef.current = el} style={{ display: "none" }} />
         :
        <Modal
           size='small'
            //closeIcon
           onOpen={() =>setShowModal(true)}
            open={showModal}
        >
            <Modal.Content >
            <ImageCropper
               imageToCrop={imageToCrop}
               onImageCropped={(croppedImage) =>{
                    setCroppedImage(croppedImage.croppedImageUrl)
                  setCroppedFile(croppedImage.croppedImageFile)
                    }}
                imageName={imageName}
                maxWidth={maxWidth}
        />
            </Modal.Content>
            <Modal.Actions>
        <Button color='black' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          content="Okay"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
        />
      </Modal.Actions>
        </Modal>
        }
        </>
    )
};

export default VehicleImageCropping;