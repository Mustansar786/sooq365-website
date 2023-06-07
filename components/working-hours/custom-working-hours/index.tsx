
import { ReactTimeSlider } from 'components';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import scss from '../working-hours.module.scss';
import cx from 'classnames';
import moment from 'moment';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactCalendar from 'components/ReactCalendar';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';

export interface IDATE {
    day_name: string, date: Date, start: string, end: string, holiday: boolean, id: number
}

interface ICustomWorkingHours {
    setParentcustomworkingHours:(args:IDATE[])=>void,
    custom_working_hours:IDATE[]
}

export default function CustomWorkingHours({setParentcustomworkingHours, custom_working_hours} :ICustomWorkingHours) {

    const [customTimeline, setCustomTimeline] = useState<IDATE[]>([]);
    const [showCalendar, setshowCalendar] = useState<{ index: number | undefined }>({ index: undefined })
    const { t } = useTranslation();



    useEffect(() => {
        setParentcustomworkingHours(customTimeline)
    }, [customTimeline])

    useEffect(() => {
        setCustomTimeline([]);
        if (custom_working_hours.length > 0) {
            for (let index = 0; index < custom_working_hours.length; index++) {
                const item = custom_working_hours[index];
                setCustomTimeline((prevState) => [...prevState, { day_name: item.day_name, date: new Date(item.date), start: item.start, end: item.end, holiday: item.holiday, id: index + 1 }])
            }
        }
    }, [])

    const onchangeCheckbox = (i: number) => () => {
        const __timeline = [...customTimeline];
        __timeline[i].holiday = !__timeline[i].holiday;
        setCustomTimeline([...__timeline])
    }

    const timeChangeHandler = (time: { start: string, end: string }, targetDay: IDATE) => {
        setCustomTimeline((prevState): IDATE[] => {
            return (
                prevState.map((day: IDATE) => {
                    if (day.id === targetDay.id) {
                        return { ...day, start: time.start, end: time.end }
                    } else {
                        return day
                    }
                })
            )
        })
    }

    const addCustomDay = () => {
        const __timeline = [...customTimeline];
        const customDay = { day_name: moment(new Date()).format('dddd'), start: "9:00 AM", end: "6:00 PM", date: new Date(), holiday: false, id: __timeline.length }
        __timeline.push(customDay);
        setCustomTimeline([...__timeline])
    }

    const removeCustomDay = (i: number) => () => {
        const __timeline = [...customTimeline];
        __timeline.splice(i, 1);
        setCustomTimeline([...__timeline])
    }

    const selectCustomDate = (i: number) => (date: Date) => {
        const __timeline = [...customTimeline];
        __timeline[i].date = new Date(date);
        __timeline[i].day_name = moment(new Date(date)).format('dddd');
        setCustomTimeline([...__timeline])
        setshowCalendar({ index: undefined}); //to hide set undefine
    }

    const showCalendarFunction =(i:number) =>()=>{
        setshowCalendar({ index: i})//to show set index
    }

    const hideCalendarFunction =()=>{
        setshowCalendar({index:undefined})//to hide set undefine
    }


    return (
        <div>
            <p style={{fontWeight: "bold", fontSize:18,paddingLeft:15}}>{t("Custom Working Hours")}</p>
            

            {
                customTimeline.length > 0 ?
                    customTimeline.map((day, i) => {
                        return (
                            <>
                            <div style={{ display: "flex", paddingLeft:15 }} >
                                <span style={{ display: "flex", alignItems: "center"}}>
                                <p style={{fontWeight: "bold", fontSize:16}}>Add Public Holidays</p>
                                        {i + 1 === customTimeline.length ? <Button style={{marginLeft: 15}} basic icon={"add circle"} color='teal' size='small' onClick={addCustomDay} /> : null}
                                        <Button basic icon={"minus circle"} color='teal' size='small' onClick={removeCustomDay(i)} />
                                </span>
                                 </div>
                                        <Link style={{color: "#56C3C5", paddingLeft:15, cursor: "pointer"}} onClick={showCalendarFunction(i)} >Choose a date</Link>
                                <div key={i} className={scss.timeLineContainer}>

                                    <div className={scss.day}>
                                        <div>
                                        <span>{day.day_name}<b> ({moment(day.date).format('MM-DD-YYYY')})</b> {day.holiday === true ? `(${t("Holiday")})` : null}</span>
                                        </div>
                                        <div>
                                        <span><Checkbox toggle checked={day.holiday} onChange={onchangeCheckbox(i)} label={day.holiday?"ON":"OFF"}  /></span>
                                        </div>
                                        <div style={{width: "60%", textAlign: "center"}}>
                                        {day.holiday === true &&
                                        <>
                                        <span className={scss.center}> {day.start} - {day.end}</span>
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
                                        
                                    </div>

                                </div>
                                <div className={scss.calendar}>
                                    <OutsideClickHandler
                                        onOutsideClick={hideCalendarFunction}
                                    >
                                        <span onClick={hideCalendarFunction} className={cx({ [scss.calender_close_icon]: i===showCalendar.index , [scss.calender_close_icon_hide]: i!==showCalendar.index })}>
                                            <Icon name='close' color="red" />
                                        </span>

                                        <ReactCalendar
                                            className={cx({ [scss.calendar_100]: i === showCalendar.index, [scss.hide_calendar]: i !== showCalendar.index })}
                                            value={day.date}
                                            onChange={selectCustomDate(i)}
                                        />
                                    </OutsideClickHandler>
                                </div>


                            </>
                        )
                    })
                    :
                    <span style={{ display: "flex", alignItems: "center",paddingLeft:15 }}><p style={{fontWeight: "bold", fontSize:16}}>{t("Add Public Holidays")}</p><Icon onClick={addCustomDay} name="add circle" size="big" color="teal" className="no_record" /> </span>
            }
        </div>
    )
}
