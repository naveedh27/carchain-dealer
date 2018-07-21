import React, { Component } from 'react';
import { Form, Button, Message, Input, Segment, Header, Loader, Dimmer,TransitionablePortal } from 'semantic-ui-react';
import axios from 'axios';

class AddCar extends Component {
    state = {
        vehicleId: 'fsf',
        chasisNo: 'sdfs',
        engineNo: 'sdfgsdf',
        maker: 'bvncvb',
        mafYear: '',
        purchaseDate: '',
        regNo: '',
        seatCapacity: 'gh',
        bodyType: 'gf',
        vin: 'fg',
        color: 'fgtr',
        model: 'rt',
        vehicleClass: 'rttr',
        custName: '5rtty',
        phone: 'trg',
        emailId: 'fghdfg',
        country: 'fghd',
        stateN: 'fghdf',
        city: 'fghfg',
        street: 'ffgf',
        id: 'vbnc',
        loading: false,
        errMsg: '',
        showPopup : false,
        popuMsg : ''
    }

    addCar = async () => {
        var formData = "{            \"$class\": \"org.acme.carchain.dealerRequest\",            \"customer_name\": \"" + this.state.custName + "\",            \"Phone\": \"" + this.state.phone + "\",            \"emailId\": \"" + this.state.emailId + "\",            \"address\": {              \"$class\": \"org.acme.carchain.address\",              \"country\": \"" + this.state.country + "\",              \"state\": \"" + this.state.stateN + "\",              \"city\": \"" + this.state.city + "\",              \"street\": \"" + this.state.street + "\",              \"id\": \"" + this.state.id + "\"            },            \"UniqueVehicleId\": \"" + this.state.vehicleId + "\",            \"RegistrationNumber\": \"New " + this.state.regNo + "\",            \"ChasisNumber\": \"" + this.state.chasisNo + "\",            \"EngineNumber\": \"" + this.state.engineNo + "\",            \"ManufacturingYear\": \"" + new Date(this.state.mafYear).toISOString() + "\",            \"purchaseDate\": \"" + new Date(this.state.purchaseDate).toISOString() + "\",            \"color\": \"" + this.state.color + "\",            \"model\": \"" + this.state.model + "\",            \"SeatingCapacity\": \"" + this.state.seatCapacity + "\",            \"TypeofBody\": \"" + this.state.bodyType + "\",            \"MakerName\": \"" + this.state.maker + "\",            \"VehicleClass\": \"" + this.state.vehicleClass + "\"}";
        try {

            var headers = {
                'Content-Type': 'application/json'
            }
            this.setState({ loading: true,errMsg : false });
            axios.post('http://localhost:3010/api/org.acme.carchain.dealerRequest', JSON.parse(formData), headers)
                .then((response) => {
                    this.setState({ loading: false,showPopup : true,popuMsg : 'Data Added to Blockchain' });
                    setTimeout(this.hideSuccessMsg, 1500);
                }).catch((err) => {
                    this.setState({ loading: false, errMsg: true,showPopup : true,popuMsg : 'Error Adding to Blockchain' });
                    setTimeout(this.hideSuccessMsg, 1500);
                });

        } catch (e) {
            console.log(e)
        }


    }

    hideSuccessMsg = () => {
        this.setState({showPopup : false});
    }
    

    render() {
        return (
            <div style={{ marginLeft: `20px`, marginRight: `20px`, marginBottom: `20px` }}>
                <Segment>
                    <Dimmer active={this.state.loading}>
                        <Loader size='huge'>Adding Data to Blockchain</Loader>
                    </Dimmer>
                    <TransitionablePortal open={this.state.showPopup}>
                        <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                            <Header color={this.state.errMsg==true?'red':'green'}>{this.state.popuMsg}</Header>
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
                                    <label>Maker Name</label>
                                    <Input
                                        value={this.state.maker}
                                        placeholder='Maker Name'
                                        onChange={(event) => { this.setState({ maker: event.target.value }) }}
                                    />
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
                        </Segment>

                        <Segment>
                            <Header as='h1'>Customer Details</Header>
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