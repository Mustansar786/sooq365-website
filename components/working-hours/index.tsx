import { ReactTimeSlider } from 'components';
import React, { useState, useEffect } from 'react';
import { Divider, Button } from 'semantic-ui-react';
import scss from './working-hours.module.scss';
import CustomWorkingHours, { IDATE } from './custom-working-hours'
import { useMutation } from '@apollo/client';
import { UPDATE_WORKING_HOURS } from 'graphql/mutation';
import { notification } from 'utils/notification';
import { useTranslation } from 'react-i18next';
import { ReactSwitch } from 'components';

interface IDAY {
    day_name: string, start: string, end: string, holiday: boolean, id: number
}

interface IWorkingHours {
    week_working_hours: IDAY[],
    custom_working_hours: IDATE[],
    working_24: boolean
}
export default function WorkingHours({ week_working_hours, custom_working_hours, working_24 }: IWorkingHours) {

    const [timeline, setTimeline] = useState<IDAY[]>([]);
    const [customtimeline, setcustomTimeline] = useState<IDATE[]>([]);
    const [active, setactive] = useState(false)
    const [loading, setloading] = useState(false)
    const { t } = useTranslation();

    // ----------------------------------------------------QUERIES----------------------------------------------------
    const [updateWorkingHours] = useMutation(UPDATE_WORKING_HOURS, {
        onError: (err) => {
            notification('danger', 'Working Hours Update Error', err?.message,);
            setloading(false);
        },
        onCompleted: async () => {
            notification('success', 'Working Hours', "Updated Successfully",);
            setloading(false);
        }
    });
    // ----------------------------------------------------QUERIES----------------------------------------------------

    useEffect(() => {
        setTimeline([])
        if (week_working_hours.length > 0) {
            for (let index = 0; index < week_working_hours.length; index++) {
                const item = week_working_hours[index];
                setTimeline((prevState) => [...prevState, { day_name: item.day_name, start: item.start, end: item.end, holiday: item.holiday, id: index + 1 }])
            }
        } else {
            const weekDays = ['Monday', 'Tuesday', "Wednesday", "Thursday", 'Friday', 'Satureday', 'Sunday'];
            for (let index = 0; index < 7; index++) {
                setTimeline((prevState) => [...prevState, { day_name: weekDays[index], start: "9:00 AM", end: "6:00 PM", holiday: false, id: index + 1 }])
            }
        }

    }, [week_working_hours])

    useEffect(() => {
        setactive(working_24)
    }, [working_24])

    const timeChangeHandler = (time: { start: string, end: string }, targetDay: IDAY) => {
        setTimeline((prevState): IDAY[] => {
            return (
                prevState.map((day: IDAY) => {
                    if (day.day_name === targetDay.day_name) {
                        return { ...day, start: time.start, end: time.end }
                    } else {
                        return day
                    }
                })
            )
        })
    }

    const onchangeCheckbox = (i: number) => () => {
        const __timeline = [...timeline];
        __timeline[i].holiday = !__timeline[i].holiday;
        setTimeline([...__timeline])
    }


    const customworkingHours = (args: IDATE[]) => {
        setcustomTimeline([...args])
    }

    const save = () => {
        setloading(true)
        const __timeLine = timeline.map((val: IDAY) => {
            return {
                day_name: val.day_name,
                start: val.start,
                end: val.end,
                holiday: val.holiday,
            }
        })
        const __customtimeLine = customtimeline.map((val: IDATE) => {
            return {
                day_name: val.day_name,
                start: val.start,
                end: val.end,
                holiday: val.holiday,
                date: val.date
            }
        })


        updateWorkingHours({
            variables: {
                data: {
                    week_working_hours: __timeLine,
                    custom_working_hours: __customtimeLine,
                    working_24:active
                }
            }
        })

    }

    return (
        <div>
            {/* <h3 className={scss.w_label}>{t("Working Hours")}</h3> */}

            <div className={scss.filter_heading}>
                <div className={scss.title_heading}>
                    <h3>{t('Working hours are 24/7?')}</h3>
                    {
                        active ?
                            <p>{t('You are a rentals hero, delivers any time any day')}</p>
                            :
                            <p>{t('You are a rentals hero, delivers any time any day')}</p>
                    }
                </div>
                <div>
                    <ReactSwitch onColor="#56C3C5" offColor="#fff" offHandleColor='#D9D9D9' 
                    // width={50} 
                    // height={20}
                    uncheckedIcon={false} checkedIcon={false} handleChange={() => setactive(!active)} checked={active}  />
                </div>
            </div>
            <span className="separator"></span>
            {
                active ?
                    null :
                    <>
                        {
                            timeline.map((day, i) => {
                                return (
                                    <div key={i} className={scss.timeLineContainer}>
                                        <div className={scss.day}>
                                            <div>
                                            {day.day_name} 
                                            {/* {day.holiday === true ? `(${t("Holiday")})` : null} */}
                                            </div>
                                            <div>
                                            <ReactSwitch onColor="#56C3C5" offColor="#fff" offHandleColor='#D9D9D9' 
                    width={45} 
                    height={20} 
                    uncheckedIcon={false} checkedIcon={false} checked={day.holiday} handleChange={onchangeCheckbox(i)}   />
                    <span style={{position: "relative", left: 15, bottom : 10}}>{day.holiday?"Open":"Closed"}</span>
                                            </div>
                                            <div style={{width: "60%", textAlign: "center"}}>
                                        {day.holiday === true && 
                                        <>
                                        <span className={scss.center}>{day.start} - {day.end}</span>
                                        <ReactTimeSlider
                                            disabled={day.holiday}
                                            draggableTrack={true}
                                            start={day.start}
                                            format={24}
                                            end={day.end}
                                            name={day.day_name}
                                            onChange={(time: any) => timeChangeHandler(time, day)}
                                            value={day.start}
                                        />
                                        </>
                                        }
                                        </div>
                                            
                                            {/* <span><Checkbox toggle checked={day.holiday} onChange={onchangeCheckbox(i)} label={day.holiday?"OPen":"Closed"}  /></span> */}
                                        </div>
                                        
                                       
                                    </div>
                                )
                            })
                        }
                        <Divider />
                        <CustomWorkingHours setParentcustomworkingHours={customworkingHours} custom_working_hours={custom_working_hours} />
                        <Divider />
                    </>
            }
            <div className={scss.save_button}>
                <Button content={t("Update")} style={{width: "35%", fontSize: 16, borderRadius: 10}} color='teal' size='small' onClick={save} loading={loading} />
            </div>
        </div>
    )
}
