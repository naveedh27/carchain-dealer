import React, { Component } from 'react';
import { Card, Item, Segment, Image, Icon, Table, Popup, Button, Header, Grid, Dimmer, Loader, TransitionablePortal, Container, Divider } from 'semantic-ui-react';
import axios from 'axios';

var util = require('../util/Util');
var user = util.user;
var url = util.endpoint;


class Market extends Component {



  constructor(props) {
    super(props);
    this.state = {
      allElement: '',
      loading: false,
      showPopup: false,
      popuMsg: '',
      errMsg: false
    };
    this.getAllCarsListed();
  }

  calculateAge = (birthday) => { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  purchaseRequest = async (recordId, customerId, price) => {

    var formData = "{  \"$class\": \"org.acme.carchain.purchaseRequest\", " +
      "\"recordId\": \"" + recordId + "\",  \"customerId\": \"" + customerId + "\",  \"price\": " + price + "}"
    var headers = {
      'Content-Type': 'application/json'
    }

    //this.setState({ errMsg: false, popuMsg: 'Purchase Request Raised' });
    // try {
    //   let response = await Axios.post('http://localhost:3010/api/org.acme.carchain.purchaseRequest', JSON.parse(formData), headers);
    //   console.log(response);
    // } catch (e) {
    //   this.setState({ errMsg: true, popuMsg: 'Error in Purchase Request' });
    // }

    axios.post(url.url + 'org.acme.carchain.purchaseRequest', JSON.parse(formData), headers)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, showPopup: true, popuMsg: 'Purchase Request Initiated' });
        setTimeout(this.hideSuccessMsg, 1500);
      }).catch((err) => {
        console.log(err);
        this.setState({ loading: false, errMsg: true, showPopup: true, popuMsg: 'Error in Purchase Request' });
        setTimeout(this.hideSuccessMsg, 1500);
      });


    setTimeout(this.hideSuccessMsg, 1500);

  }

  hideSuccessMsg = () => {
    this.setState({ showPopup: false });
  }

  getAllCarsListed = async () => {

    let listOfSellCars = await axios.get(url.url + 'queries/getAllNewCARndOldCarFromMarketPlace?flag=NEW CAR');


    var actList = listOfSellCars.data;

    console.log(actList);

    let elements = ''

    if (actList.length == 1) {

      elements = (
        <Card color= {actList[0].color} >
          <Image size='big' src={require('../assets/images/' + actList[0].MakerName + '.png')} />
          <Card.Content>
            <Card.Header as='a'>{actList[0].MakerName + " - " + actList[0].model}</Card.Header>
            <Card.Meta>
              <span style={{ color: actList[0].color }} className='date'>Colored : {actList[0].color}</span> ◘ <span style={{ color: `black` }} >Seated For : {actList[0].SeatingCapacity} </span>
            </Card.Meta>
            <Card.Description>
              <span>
                Manufactured • {new Date(actList[0].ManufacturingYear).getFullYear()} • Body  •  {actList[0].TypeofBody}
              </span>
              <Divider />
              <span>
                Vehicle Class • {actList[0].VehicleClass}
              </span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Segment.Group horizontal>
              <Segment>
                <Header as='h4' style={{marginTop:`8px`}}>
                  Buy @  ₹. {actList[0].price}</Header>
              </Segment>
              <Segment>
                <Popup
                  trigger={<Button floated='right' secondary content='More Details' />}
                  position='left center'
                  inverted >
                  <Grid divided columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        Contact Name :
                    </Grid.Column>
                      <Grid.Column>
                        {actList[0].customer_name}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        Mobile Number :
                    </Grid.Column>
                      <Grid.Column>
                        {actList[0].contact_no}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Popup>
              </Segment>
            </Segment.Group>
          </Card.Content>
        </Card>
        // <Card fluid key={actList[0].UniqueVehicleId + " " + actList[0].recordId}>
        //   <Card.Content>
        //     <Segment vertical>
        //       <Item>
        //         {/* <Item.Image size='tiny' src={require('../assets/images/volvo.png')} /> */}
        //         <Item.Content >
        //           <Item.Header as='a'><h2>{actList[0].MakerName + " - " + actList[0].model + "   " + actList[0].TypeofBody}</h2></Item.Header>
        //           <Item.Description>
        //             <Table basic='very'>
        //               <Table.Body>
        //                 <Table.Row>
        //                   <Table.Cell >Registration Number </Table.Cell>
        //                   <Table.Cell>{actList[0].RegistrationNumber}</Table.Cell>
        //                   <Table.Cell>Vehicle Class </Table.Cell>
        //                   <Table.Cell>{actList[0].VehicleClass}</Table.Cell>
        //                 </Table.Row>
        //                 <Table.Row>
        //                   <Table.Cell>Color </Table.Cell>
        //                   <Table.Cell>{actList[0].color}</Table.Cell>
        //                   <Table.Cell>Seating Capacity  </Table.Cell>
        //                   <Table.Cell>{actList[0].SeatingCapacity}</Table.Cell>
        //                 </Table.Row>
        //                 <Table.Row>
        //                   <Table.Cell>Owned For (In Years) </Table.Cell>
        //                   <Table.Cell>{this.calculateAge(new Date(actList[0].purchaseDate))} Years</Table.Cell>
        //                   <Table.Cell>Manufactured year </Table.Cell>
        //                   <Table.Cell>{new Date(actList[0].ManufacturingYear).getFullYear()}</Table.Cell>
        //                 </Table.Row>
        //                 <Table.Row>
        //                   <Table.Cell>Price </Table.Cell>
        //                   <Table.Cell>₹. {actList[0].price} </Table.Cell>
        //                   <Table.Cell>Purchase year </Table.Cell>
        //                   <Table.Cell>{new Date(actList[0].purchaseDate).getFullYear()}</Table.Cell>
        //                 </Table.Row>
        //               </Table.Body>
        //             </Table>
        //           </Item.Description>
        //         </Item.Content>
        //       </Item>
        //       <Popup
        //         trigger={<Button floated='right' secondary content='More Details' />}
        //         position='left center'
        //         inverted >
        //         <Grid divided columns='equal'>
        //           <Grid.Row>
        //             <Grid.Column>
        //               Contact Name :
        //             </Grid.Column>
        //             <Grid.Column>
        //               {actList[0].customer_name}
        //             </Grid.Column>
        //           </Grid.Row>
        //           <Grid.Row>
        //             <Grid.Column>
        //               Mobile Number :
        //             </Grid.Column>
        //             <Grid.Column>
        //               {actList[0].contact_no}
        //             </Grid.Column>
        //           </Grid.Row>
        //         </Grid>
        //       </Popup>
        //     </Segment>
        //   </Card.Content>
        // </Card>
      );

    } else {
      elements = actList.map((element) => {


        return (
          <Card color={element.color}>
            <Image size='big' src={require('../assets/images/' + element.MakerName + '.png')} />
            <Card.Content>
              <Card.Header as='a'>{element.MakerName + " - " + element.model}</Card.Header>
              <Card.Meta>
                <span style={{ color: element.color }} className='date'>Colored : {element.color}</span> ◘ <span style={{ color: `black` }} >Seated For : {element.SeatingCapacity} </span>
              </Card.Meta>
              <Card.Description>
                <span>
                  Manufactured • {new Date(element.ManufacturingYear).getFullYear()} • Body  •  {element.TypeofBody}
                </span>
                <Divider />
                <span>
                  Vehicle Class • {element.VehicleClass}
                </span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Segment.Group horizontal>
              <Segment>
                <Header as='h4' style={{marginTop:`8px`}}>
                  Buy @  ₹. {element.price}</Header>
              </Segment>
              <Segment>
                <Popup
                  trigger={<Button floated='right' secondary content='More Details' />}
                  position='left center'
                  inverted >
                  <Grid divided columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        Contact Name :
                    </Grid.Column>
                      <Grid.Column>
                        {element.customer_name}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        Mobile Number :
                    </Grid.Column>
                      <Grid.Column>
                        {element.contact_no}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Popup>
              </Segment>
            </Segment.Group>
            </Card.Content>
          </Card>
        );

        // return (
        //   // <Card fluid key={element.UniqueVehicleId + " " + element.recordId}>
        //   //   <Card.Content>
        //   //<Segment key={element.UniqueVehicleId + " " + element.recordId} vertical>
        //     <Item>
        //       <Item.Image circular size='small' src={require('../assets/images/volvo.png')} />
        //       <Item.Content >
        //         <Item.Header as='a'><h2>{element.MakerName + " - " + element.model + "   " + element.TypeofBody}</h2></Item.Header>
        //         <Item.Description>
        //           <Table inverted>
        //             <Table.Body>
        //               <Table.Row>
        //                 <Table.Cell >Registration Number </Table.Cell>
        //                 <Table.Cell>{element.RegistrationNumber}</Table.Cell>
        //                 <Table.Cell>Vehicle Class </Table.Cell>
        //                 <Table.Cell>{element.VehicleClass}</Table.Cell>
        //               </Table.Row>
        //               <Table.Row>
        //                 <Table.Cell>Color </Table.Cell>
        //                 <Table.Cell>{element.color}</Table.Cell>
        //                 <Table.Cell>Seating Capacity  </Table.Cell>
        //                 <Table.Cell>{element.SeatingCapacity}</Table.Cell>
        //               </Table.Row>
        //               <Table.Row>
        //                 <Table.Cell>Owned For (In Years) </Table.Cell>
        //                 <Table.Cell>{this.calculateAge(new Date(element.purchaseDate))} Years</Table.Cell>
        //                 <Table.Cell>Manufactured year </Table.Cell>
        //                 <Table.Cell>{new Date(element.ManufacturingYear).getFullYear()}</Table.Cell>
        //               </Table.Row>
        //               <Table.Row>
        //                 <Table.Cell>Price </Table.Cell>
        //                 <Table.Cell>₹. {element.price} </Table.Cell>
        //                 <Table.Cell>Purchase year </Table.Cell>
        //                 <Table.Cell>{new Date(element.purchaseDate).getFullYear()}</Table.Cell>
        //               </Table.Row>
        //             </Table.Body>
        //           </Table>
        //         </Item.Description>
        //         <Item.Extra>
        //           <span></span>
        //           <Popup
        //             trigger={<Button floated='right' secondary content='More Details' />}
        //             position='left center'
        //             inverted >
        //             <Grid divided columns='equal'>
        //               <Grid.Row>
        //                 <Grid.Column>
        //                   Contact Name :
        //               </Grid.Column>
        //                 <Grid.Column>
        //                   {element.customer_name}
        //                 </Grid.Column>
        //               </Grid.Row>
        //               <Grid.Row>
        //                 <Grid.Column>
        //                   Mobile Number :
        //               </Grid.Column>
        //                 <Grid.Column>
        //                   {element.contact_no}
        //                 </Grid.Column>
        //               </Grid.Row>
        //             </Grid>
        //           </Popup>
        //         </Item.Extra>
        //       </Item.Content>

        //     </Item>

        //   //</Segment>
        // );

      });
    }



    if (elements.length <= 1) {
      elements = <Card fluid color='red' header='No Available Cars' />
    }

    this.setState({ allElement: elements });

  }



  render() {
    return (
      <div>
        <Dimmer active={this.state.loading}>
          <Loader size='huge'>Sending Purchase Request</Loader>
        </Dimmer>
        <TransitionablePortal open={this.state.showPopup}>
          <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
            <Header color={this.state.errMsg == true ? 'red' : 'green'}>{this.state.popuMsg}</Header>
          </Segment>
        </TransitionablePortal>
        <Card.Group itemsPerRow={3}>
          {this.state.allElement}
        </Card.Group>
      </div>
    );
  }
}

export default Market; 