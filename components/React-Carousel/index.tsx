import React from 'react'
import Carousel, { consts } from 'react-elastic-carousel'

export default function ReactCarousel({ children, ...rest }: any) {
  const myArrow = ({ type, onClick, isEdge }: any) => {
    type === consts.PREV
    const pointer =
      type === consts.PREV ? (
        <img
          style={{ width: 44, height: 44,marginRight:10,cursor:"pointer",position:"absolute",marginLeft:-50}}
          className="carousel_right_left_arrow"
          src={isEdge ? "/assets/icons/left-arrow-fadeout.svg" : "/assets/icons/left-arrow.svg"}
          onMouseOver={(e) =>
           !isEdge && (e.currentTarget.src = '/assets/icons/left-arrow-color.svg')
          }
          onMouseOut={(e) =>
            !isEdge &&   (e.currentTarget.src = '/assets/icons/left-arrow.svg')
          }
          
        />
      ) : (
        <img
          style={{ width: 44, height: 44,marginLeft:10 ,cursor:"pointer",position:"absolute"}}
          className="carousel_right_right_arrow"
          src={isEdge ? "/assets/icons/right-arrow-fadeout.svg" : "/assets/icons/right-arrow.svg"}
          onMouseOver={(e) =>
            !isEdge &&  (e.currentTarget.src = '/assets/icons/right-arrow-color.svg')
          }
          onMouseOut={(e) =>
            !isEdge &&  (e.currentTarget.src = '/assets/icons/right-arrow.svg')
          }
        />
      )
    return <div onClick={onClick} style={{alignSelf:"center"}}>{pointer}</div>
  }
  return (
    <>
      <Carousel {...rest} renderArrow={myArrow}>
        {children}
      </Carousel>
    </>
  )
}
