import React from 'react';
import {grey400} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import WizardFormFourthPage from './WizardFormFourthPage'

import request from 'utils/request';
import { browserHistory } from 'react-router'

export default class AddMerchant extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };
  handleSubmit = (values) => request('/Merchants', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  })
    .then(    browserHistory.push('/merchant'))
  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <WizardFormFirstPage onSubmit={this.handleNext}/>;
      case 1:
        return <WizardFormSecondPage previousPage={this.handlePrev} onSubmit={this.handleNext}/>;
      case 2:
        return<WizardFormThirdPage previousPage={this.handlePrev}  onSubmit={this.handleNext}/>;
      case 3:
        return<WizardFormFourthPage previousPage={this.handlePrev}  onSubmit={this.handleSubmit}/>;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    return (
      <PageBase title="Form Page"
                navigation="Application / Form Page">

        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper linear={false} activeStep={stepIndex}>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0})}>
                第一部分
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
                第二部分
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
                第三部分
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 3})}>
                第四部分
              </StepButton>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                <div>{this.getStepContent(stepIndex)}</div>

              </div>
            )}
          </div>
        </div>
      </PageBase>
    );
  };
}

