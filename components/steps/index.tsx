import React from 'react'
// import { Step } from 'semantic-ui-react'
import {Stepper,Typography} from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { isMobile } from 'react-device-detect';

type ISteps = {
    stepNumber: number,
    steps: { title: string, description: string, active?: boolean, completed?: boolean }[]
}



export default function Steps({ steps, stepNumber }: ISteps) {
    return (
        <div id="steps__">
            <Stepper alternativeLabel activeStep={stepNumber-1}>
        {steps.map((val, index) => {
            
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            labelProps.optional = (
                <Typography style={{position: 'absolute', top: -25, left: isMobile ? 35 : 78, color: "#000", fontWeight: "bold"}}>{val.title}</Typography>
            );
        
          return (
            <Step key={index} {...stepProps}>
            {/* <StepLabel>{val.title}</StepLabel> */}
            <StepLabel {...labelProps}>{val.description}</StepLabel>
          </Step>
          )
             
        }
        )}
      </Stepper>
            {/* <Step.Group ordered>
                {
                    steps.map((val: any, key:number) => {
                        return (
                            <Step completed={val.completed} active={val.active} key={'---steps'+key}>
                                <Step.Content>
                                    <Step.Title>{val.title}</Step.Title>
                                    <Step.Description>{val.description}</Step.Description>
                                </Step.Content>
                            </Step>
                        )
                    })
                }
            </Step.Group> */}

        </div>
    )
}
