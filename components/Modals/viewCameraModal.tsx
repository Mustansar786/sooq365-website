import React,{useState} from 'react';
import { Modal } from "semantic-ui-react";
import Webcam from 'react-webcam';

const WebCameraModal=({show,setShow,size="tiny",setNewProfile}:any)=>{
    // const videoConstraints:any = {
    //     width:"100%",
    //     height: 400,
    //     facingMode: "user"
    //   };
      const [captureImg,setCaptureImg]:any=useState("")
      const [blobCapture,setBlobCapture]:any=useState("")
      const webcamRef:any = React.useRef(null);
      const capture = React.useCallback(
        async() => {
          const imageSrc = webcamRef.current.getScreenshot();
          const base64Response = await fetch(imageSrc);
          const blob = await base64Response.blob();
          setCaptureImg(imageSrc)
          setBlobCapture(blob)
        },
        [webcamRef]
      );
    return(
        <Modal
        size={size}
        open={show}
        closeIcon
        onClose={() => setShow(false)}
        >
        <Modal.Content>
       {!captureImg? <Webcam
    //    onUserMedia={(med)=>{
    //        console.log("my media camera here",med)
    //    }}
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
         width={"100%"}
        // videoConstraints={videoConstraints}
      />:  <img src={captureImg} style={{
        width:"100%",
        height:"100%"
        }}/>}
        <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
                className="center"
              >
                <button
                  style={{
                    fontSize: '18px',
                    color: '#EA4335',
                    border: '0.6px solid #EA4335',
                    borderRadius: '10px',
                    width: '45%',
                    padding: '10px',
                    background: "#ffffff"
                  }}
                 onClick={()=>{
                    setCaptureImg("")
                 }}
                >
                  Retake
                </button>

                <button
                onClick={()=>{
                  if(captureImg){
                  setNewProfile(blobCapture)
                  setShow(false)
                  }else{
                  capture()
                  }
                }}
                  style={{
                    background: '#56C3C5',
                    fontSize: '18px',
                    color: '#FFFFFF',
                    border: '0.6px solid #56C3C5',
                    borderRadius: '10px',
                    width: '45%',
                    padding: '10px',
                  }}
                >
                 {captureImg?"Confirm":"Capture"}
                </button>
              </div>
            
        </Modal.Content>
       
      </Modal>
    )
}

export default WebCameraModal;