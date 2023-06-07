import AuthLayout from 'Layouts/AuthLayout'
import GeneralLayout from 'Layouts/GeneralLayout'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { MYFAVOURITES } from 'graphql/query'
import { ReactLoader } from 'components'
import { ImagePrefix, display_image, configSettings } from 'constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ADD_FAVOURITE } from 'graphql/mutation'
import client from 'graphql/apollo-client'
import { useTranslation } from 'react-i18next'
import { createString } from '../../utils/helper'
import styles from './saved.module.css'
import { RootStateI } from 'redux/reducer'
//import { notification } from "utils/notification";re designed

export default function Saved() {
  const { t } = useTranslation()
  const [isloading, setisloading] = useState(true)
  const [saved, setsaved] = useState<any>([])
  const dispatch = useDispatch()
  const router = useRouter()
  const favSelector = useSelector((state: any) => state.saved)
  const [device, setDevice] = useState<any>()
  const [isMobile, setIsMobile] = useState(false)
  //const [buttonloader, setbuttonloader] = useState(false)
  //const [btnId, setBtnId] = useState('')

  const { data, loading } = useQuery(MYFAVOURITES)
  useEffect(() => {
    setisloading(loading)
    if (data) {
      setsaved(data.favorites)
    }
  }, [data, loading])

  useEffect(() => {
    setDevice(require('current-device').default)
  }, [])

  useEffect(() => {
    device != undefined && setIsMobile(device.mobile() || device.ipad())
  }, [device])

  const goToDetailsPage = (id: string) => {
    router.push('/vehicles/' + id)
  }

  const remove_favorite = async (id: string) => {
    try {
     // setBtnId(id)
     // setbuttonloader(true)
      const options = {
        mutation: ADD_FAVOURITE,
        variables: {
          vehicle: id,
        },
      }
      const data = await client.mutate(options)
      if (data) {
        const index = favSelector.favorites.indexOf(id)

        let new_arr = []
        if (index > -1) {
          new_arr = favSelector.favorites.filter((c: any) => c !== id)
          dispatch({
            type: favtypes.ADD_FAVORITE,
            payload: {
              favorites: new_arr,
            },
          })

          const instance = saved.find((c: any) => c.id === id)
          if (instance) {
            let new_saved = []
            new_saved = saved.filter((c: any) => c.id !== id)
            setsaved(new_saved)
          }
        }
      }
      //setbuttonloader(false)
      //notification('success', '',"");

    } catch (error) {
     // setbuttonloader(false)
    }
  }
  return (
    <div style={{ backgroundColor: '#F6F7FB' }}>
      <AuthLayout authenticate={true}>
        <GeneralLayout title={'User Favorites'} description="User Favorites">
          <div className={styles.saved_wrapper}>
            <h1 className={styles.title}>Favorites</h1>
            {isloading ? (
              <ReactLoader loading={isloading}></ReactLoader>
            ) : (
              <div className={styles.content_wrapper}>
                {saved.length ? (
                  <div className={styles.grid_card_wrapper}>
                    {saved.map((itm: any, key: any) => (
                      <div key={'favorites' + key}>
                        <NewVehicleCard
                          itm={itm}
                          remove_favorite={remove_favorite}
                          goToDetailsPage={goToDetailsPage}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.para}>
                    <img
                      src={'/assets/fav/nofav.svg'}
                      alt="no fav"
                      width={isMobile ? '200px' : '393px'}
                    />
                    <p className={styles.para1} style={{ marginTop: '46px' }}>
                      Your wishlist is empty!
                    </p>
                    <p
                      className={styles.para1}
                      style={{
                        fontWeight: 'normal',
                        marginTop: '5px',
                        fontSize: '16px',
                      }}
                    >
                      Explore more and shortlist some items.
                    </p>
                    <div
                      className={styles.button}
                      onClick={() => router.push('/rent-a-car')}
                    >
                      {t('Rent Now')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </GeneralLayout>
      </AuthLayout>
    </div>
  )
}

export const NewVehicleCard = ({
  itm,
  remove_favorite,
  goToDetailsPage,
}: any) => {
  const countrySelector = useSelector((state: RootStateI) => state.country)

  const { t } = useTranslation()
  let bookingType = ''
  if (itm.transfer_package) {
    bookingType = itm.transfer_package?.type
  }
  const sortingByPrice = (packages: any = []) => {
    return packages
      .filter((itm: any) => itm.active)
      .sort((a: any, b: any) => a.price - b.price)
  }
  const displayPrice = (price: any) => {
    price = price * (1 + configSettings.vat)
    return price
      .toLocaleString(undefined, { maximumFractionDigits: 2 })
      .replace(/\.[0-9]+$/, '')
  }
  return (
    <div className={styles.card}>
      <img
        className={styles.thumb}
        src={display_image(ImagePrefix + itm.thumb)}
        style={{ cursor: 'pointer' }}
        onClick={() => goToDetailsPage(itm.id)}
      />
      <img
        src={'/assets/icons/Liked.svg'}
        style={{
          float: 'right',
          cursor: 'pointer',
          width: '32px',
          position: 'absolute',
          top: 12,
          right: 12,
        }}
        onClick={() => {
          remove_favorite(itm.id)
        }}
      />
      <h4 className={styles.vehicle_name}>
      {itm?.brand?.name && !itm?.attributes?.Name &&
                                            createString([itm?.brand?.name, itm?.model?.name]) 
                                          }
                                          {itm?.brand?.name && itm?.attributes?.Name &&
                                            createString([itm?.brand?.name, itm?.model?.name])
                                          }
                                          {!itm?.brand?.name && itm?.attributes?.Name &&
                                            itm?.attributes?.Name.length > 30 ? `${itm?.attributes?.Name.substring(0,30)}...` : itm?.attributes?.Name
                                          }
        {/* {createString([
          itm.brand.name,
          itm.model?.name,
          itm?.attributes?.Year?.value || '',
        ])} */}
      </h4>

      <p style={{paddingLeft: 10}}>
                                          {itm?.brand?.name && itm?.attributes?.Name &&
                                            `(${itm?.attributes?.Name})`
                                          }
        {/* {createString([
          itm.brand.name,
          itm.model?.name,
          itm?.attributes?.Year?.value || '',
        ])} */}
      </p>
            <div
        className={styles.prices_warpper}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {bookingType === 'HOURLY' ||
        bookingType === 'HOURLY_TRANSFER' ||
        bookingType === 'HOURLY_PACKAGE' ? (
          <></>
        ) : (
          bookingType !== 'TRANSFER' &&
          bookingType !== 'PACKAGE' && (
            <></>
          )
        )}
        {(bookingType === 'PACKAGE' || bookingType === 'HOURLY_PACKAGE') &&
        sortingByPrice(itm?.transfer_package?.package).length ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 'inherit',
              justifyContent: 'space-between',
            }}
          >
            <div>{t('Package Rate Starting From')}</div>

            <div className={styles.pricing}>
              <span className={styles.highlightPrice}>
                {displayPrice(
                  sortingByPrice(itm?.transfer_package?.package)[0].price
                )}
              </span>
              <span className={styles.aed}>
                {countrySelector?.data?.currency?.toUpperCase() || 'AED'}
              </span>
            </div>
          </div>
        ) : null}
        {(bookingType === 'TRANSFER' || bookingType === 'HOURLY_TRANSFER') &&
        sortingByPrice(itm?.transfer_package?.transfer).length ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 'inherit',
              justifyContent: 'space-between',
            }}
          >
            <div>{t('Transfer Rate Starting From')}</div>
            <div className={styles.pricing}>
              <span className={styles.highlightPrice}>
                {displayPrice(
                  sortingByPrice(itm?.transfer_package?.transfer)[0].price
                )}
              </span>
              <span className={styles.aed}>
                {countrySelector?.data?.currency?.toUpperCase() || 'AED'}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
