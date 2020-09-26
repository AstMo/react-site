import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import classes from './Contacts.css';
import { ContactsForm } from './Contacts.css';
import Input from 'C:/Users/pomidariya/Desktop/learning/react-site/src/UI/Input/Input'

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default class Contacts extends Component {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMassage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMassage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
        }
    }
}

    enterHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault()
    }
    validateControl (value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }
    onChangeHandler = (event, controlName) => {
        console.log('${controlName}: ', event.target.value)

        const formControls = { ... this.state.formControls}
        const control = { ...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control
        this.setState({
            formControls
        })
    }

   renderInputs() {
      return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName]
        return (
            <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={true}
            errorMassage={control.errorMassage}
            onChange={event => this.onChangeHandler(event, controlName)}
            />
        )
      })
   }
    render() {
        return (
            <Container style={{ width: '500px'}} className={classes.Contacts}>
                <h1 className="text-center"> Contact us </h1>
                <Form onSubmit={this.submitHandler} className = { classes.ContactsForm}>
                {this.renderInputs()}
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Yes, I now that I am banana"/>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary" onClick={this.enterHandler}>
                    Войти
                    </button>

                    
                     {/* <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control placeholder="Enter email, cute banana" />
                        <Form.Text>
                            We will alwas love you, little banana! \*O*
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Yes, I now that I am banana"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button> */}
                </Form>
            </Container>
        )
    }
}