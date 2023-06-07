import React, { useState, useEffect } from 'react'
import GeneralLayout from 'Layouts/GeneralLayout'

export default function CustomNotAuthorized() {
  const [device, setDevice] = useState<any>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setDevice(require('current-device').default)
  }, [])
  useEffect(() => {
    device != undefined && setIsMobile(device.mobile() || device.ipad())
  }, [device])

  return (
    <div style={{ backgroundColor: '#F6F7FB',height:"100vh" }}>
      <GeneralLayout>
        <div
          style={{
            background: '#FFFFFF',
            maxWidth: '1400px',
            margin: '0 auto',
            marginTop: '5%',
            borderRadius: '10px',
            textAlign: 'center',
            padding:"30px"
          }}
        >
          <img
            src={'/assets/fav/not_granted.svg'}
            alt="no fav"
            width={isMobile ? '200px' : '393px'}
          />
          <h4
            style={{
              fontSize: '26px',
              fontWeight: 700,
            }}
          >
            Unauthorized
          </h4>
        </div>
      </GeneralLayout>
    </div>
  )
}
