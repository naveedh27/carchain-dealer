import React, { Component } from 'react';
import { Form, Button, Message, Input,Dropdown, Segment, Header, Label, Loader, Dimmer, TransitionablePortal } from 'semantic-ui-react';
import axios from 'axios';

var util = require('../util/Util');
var user = util.user;
var url = util.endpoint;

class AddCar extends Component {


    constructor(props) {
        super(props);


       this.state = {
            vehicleId: 'ADDR66',
            chasisNo: '5565551444',
            engineNo: '12234547',
            maker: 'HONDA',
            mafYear: '01/05/2015',
            purchaseDate: '05/05/2015',
            regNo: '',
            price: 580,
            seatCapacity: '5',
            bodyType: 'STEEL',
            vin: '4587713',
            color: 'RED',
            model: 'ACCENT',
            vehicleClass: 'A+',
            custName: 'Dealer',
            phone: '996588774',
            emailId: 'yohan@gmail.com',
            country: 'INDIA',
            stateN: 'TN',
            city: 'CHENNAI',
            street: 'GN ST.',
            id: 'Dealer',
            loading: false,
            errMsg: '',
            showPopup: false,
            popuMsg: ''
        }
    }



    addCar = async () => {
        var formData = "{            \"$class\": \"org.acme.carchain.newCarMarketPlace\",  \"recordId\": \" \",          \"customer_name\": \"" + this.state.custName + "\",            \"contact_no\": \"" + this.state.phone + "\",    \"date\": \"" + new Date().toISOString() + "\",               \"emailId\": \"" + this.state.emailId + "\",  \"owner\": \"" + this.state.custName + "\",          \"address\": {              \"$class\": \"org.acme.carchain.address\",              \"country\": \"" + this.state.country + "\",              \"state\": \"" + this.state.stateN + "\",              \"city\": \"" + this.state.city + "\",              \"street\": \"" + this.state.street + "\"        },            \"UniqueVehicleId\": \"" + this.state.vehicleId + "\",            \"RegistrationNumber\": \"New " + this.state.regNo + "\",    \"price\": " + this.state.price + ",        \"ChasisNumber\": \"" + this.state.chasisNo + "\",            \"EngineNumber\": \"" + this.state.engineNo + "\",            \"ManufacturingYear\": \"" + new Date(this.state.mafYear).toISOString() + "\",            \"purchaseDate\": \"" + new Date(this.state.purchaseDate).toISOString() + "\",            \"color\": \"" + this.state.color + "\",            \"model\": \"" + this.state.model + "\",            \"SeatingCapacity\": \"" + this.state.seatCapacity + "\",            \"TypeofBody\": \"" + this.state.bodyType + "\",            \"MakerName\": \"" + this.state.maker + "\",     \"flag\": \"NEW CAR\",            \"VehicleClass\": \"" + this.state.vehicleClass + "\"}";
        try {

            var headers = {
                'Content-Type': 'application/json'
            }
            this.setState({ loading: true, errMsg: false });

            axios.post(url.url + 'newCarMarketPlace', JSON.parse(formData), headers)
                .then((response) => {
                    this.setState({ loading: false, showPopup: true, popuMsg: 'Data Added to Blockchain' });
                    setTimeout(this.hideSuccessMsg, 1500);
                }).catch((err) => {
                    console.log(err)
                    this.setState({ loading: false, errMsg: true, showPopup: true, popuMsg: 'Error Adding to Blockchain' });
                    setTimeout(this.hideSuccessMsg, 1500);
                });

        } catch (e) {
            console.log(e)
        }


    }

    hideSuccessMsg = () => {
        this.setState({ showPopup: false });
    }

    handleChange = (e, { value }) => this.setState({ maker : value })


    render() {

        let countryOptions = [{ key: 'Tesla', value: 'Tesla', text: 'Tesla' },
        { key: 'BMW', value: 'BMW', text: 'BMW' },
        { key: 'Honda', value: 'Honda', text: 'Honda' },
        { key: 'Hyundai', value: 'Hyundai', text: 'Hyundai' },
        { key: 'Volvo', value: 'Volvo', text: 'Volvo' },
        { key: 'Benz', value: 'Benz', text: 'Benz' },
        { key: 'Jeep', value: 'Jeep', text: 'Jeep' },
        { key: 'Mahindra', value: 'Mahindra', text: 'Mahindra' },
        { key: 'Nissan', value: 'Nissan', text: 'Nissan' },
        { key: 'Kia', value: 'Kia', text: 'Kia' },
        { key: 'Mitsubishi', value: 'Mitsubishi', text: 'Mitsubishi' },
        { key: 'Fiat', value: 'Fiat', text: 'Fiat' },
        { key: 'Datsun', value: 'Datsun', text: 'Datsun' },
        { key: 'Skoda', value: 'Skoda', text: 'Skoda' },
        { key: 'Tata', value: 'Tata', text: 'Tata' },
        { key: 'Volkswagen', value: 'Volkswagen', text: 'Volkswagen' },
        { key: 'Renault', value: 'Renault', text: 'Renault' }];

        return (
            <div style={{ marginLeft: `20px`, marginRight: `20px`, marginBottom: `20px` }}>
                <Segment>
                    <Dimmer active={this.state.loading}>
                        <Loader size='huge'>Adding Data to Blockchain</Loader>
                    </Dimmer>
                    <TransitionablePortal open={this.state.showPopup}>
                        <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                            <Header color={this.state.errMsg == true ? 'red' : 'green'}>{this.state.popuMsg}</Header>
                        </Segment>
                    </TransitionablePortal>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>

                        <Segment>
                            <Header as='h1'>Vehicle Details</Header>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Vehicle ID</label>
                                    <Input
                                        value={this.state.vehicleId}
                                        placeholder='Vehicle ID'
                                        onChange={(event) => { this.setState({ vehicleId: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Chasis No</label>
                                    <Input
                                        value={this.state.chasisNo}
                                        placeholder='Chasis No'
                                        onChange={(event) => { this.setState({ chasisNo: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Engine No</label>
                                    <Input
                                        value={this.state.engineNo}
                                        placeholder='Engine No'
                                        onChange={(event) => { this.setState({ engineNo: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Brand</label>
                                    <Dropdown placeholder='Search Brand'
                                        fluid
                                        selection
                                        options={countryOptions}
                                        onChange={this.handleChange}
                                    />
                                    {/* <Input
                                        value={this.state.maker}
                                        placeholder='Maker Name'
                                        onChange={(event) => { this.setState({ maker: event.target.value }) }}
                                    /> */}
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Manufacturing Year</label>
                                    <Input
                                        value={this.state.mafYear}
                                        type='date'
                                        placeholder='Manufacturing Date'
                                        onChange={(event) => { this.setState({ mafYear: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Purchase Date</label>
                                    <Input

                                        value={this.state.purchaseDate}
                                        placeholder='Purchase Date'
                                        type='date'
                                        onChange={(event) => { this.setState({ purchaseDate: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>

                            {/* <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Registration No</label>
                                    <Input
                                        value={this.state.regNo}
                                        placeholder='Registration No'
                                        onChange={(event) => { this.setState({ regNo: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group> */}

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Seating Capacity</label>
                                    <Input
                                        value={this.state.seatCapacity}
                                        placeholder='Seating Capacity'
                                        onChange={(event) => { this.setState({ seatCapacity: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Type of Body</label>
                                    <Input
                                        value={this.state.bodyType}
                                        placeholder='Type of Body'
                                        onChange={(event) => { this.setState({ bodyType: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Color</label>
                                    <Input
                                        value={this.state.color}
                                        placeholder='Color'
                                        onChange={(event) => { this.setState({ color: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Model</label>
                                    <Input
                                        value={this.state.model}
                                        placeholder='Model'
                                        onChange={(event) => { this.setState({ model: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>VIN No</label>
                                    <Input
                                        value={this.state.vin}
                                        placeholder='VIN No'
                                        onChange={(event) => { this.setState({ vin: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Vehicle Class</label>
                                    <Input
                                        value={this.state.vehicleClass}
                                        placeholder='Vehicle Class'
                                        onChange={(event) => { this.setState({ vehicleClass: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Price </label>
                                    <Input labelPosition='right'
                                        type='number'
                                        placeholder='Amount'
                                        onChange={(event) => { this.setState({ price: event.target.value }) }}
                                        value={this.state.price}>
                                        <Label basic>₹</Label>
                                        <input />
                                        <Label>.00</Label>
                                    </Input>
                                </Form.Field>
                            </Form.Group>
                        </Segment>

                        <Segment>
                            <Header as='h1'>Dealer Details</Header>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Customer Name</label>
                                    <Input
                                        value={this.state.custName}
                                        placeholder='Customer Name'
                                        onChange={(event) => { this.setState({ custName: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone</label>
                                    <Input
                                        value={this.state.phone}
                                        placeholder='Phone'
                                        onChange={(event) => { this.setState({ phone: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Email ID</label>
                                    <Input
                                        value={this.state.emailId}
                                        placeholder='Email ID'
                                        onChange={(event) => { this.setState({ emailId: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Country</label>
                                    <Input
                                        value={this.state.country}
                                        placeholder='Country'
                                        onChange={(event) => { this.setState({ country: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>State</label>
                                    <Input
                                        value={this.state.stateN}
                                        placeholder='State'
                                        onChange={(event) => { this.setState({ stateN: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>City</label>
                                    <Input
                                        value={this.state.city}
                                        placeholder='City'
                                        onChange={(event) => { this.setState({ city: event.target.value }) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Street</label>
                                    <Input
                                        value={this.state.street}
                                        placeholder='Street'
                                        onChange={(event) => { this.setState({ street: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <label>Id</label>
                                    <Input
                                        value={this.state.id}
                                        placeholder='Id'
                                        onChange={(event) => { this.setState({ id: event.target.value }) }}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Segment>

                        <Button primary
                            loading={this.state.loading}
                            onClick={this.addCar.bind(this)}
                            content="Submit"
                        />
                        <Message
                            error
                            header='oops! Error in adding data'
                            content={this.state.errMsg}
                        />

                    </Form>
                </Segment>
            </div>
        );
    }
}

export default AddCar; 