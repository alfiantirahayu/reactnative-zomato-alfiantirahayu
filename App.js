import React, { Component } from 'react';
import {Header,View,Image,StyleSheet,Item,Text, Button, Content, Card, CardItem, Thumbnail, Body, Left, Right,TextInput} from 'native-base';

import axios from 'axios'

export default class App extends Component {
  constructor(){
    super()
    this.state = {isi_data: [], search : ""}
  }
 
  get = () => {
  var url = 'https://developers.zomato.com/api/v2.1/search?q=${this.state.search}'
  var config = {
  headers:{'user-key':'aaa4ddb16b9c010adde5a38697da478b'}
  };
    axios.get(url, config).then((ambilData)=>{
      this.setState({
        resto: ambilData.data.restaurants,
      })
    })
  }
  render() {
     const data = this.state.isi_data.map((x,index) => {

        var data_nama = x.restaurant.name;
        var data_kota = x.restaurant.location.city;
        var data_alamat = x.restaurant.location.address;
        var data_harga = (x.restaurant.average_cost_for_two/2);
        var data_gambar = x.restaurant.thumb;
     return(
                <Card key = {index} style = {{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: data_gambar}} />
                      <Body>
                        <Text>{data_nama}</Text>
                        <Text note>{data_kota}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Text>{data_harga}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image source = {{uri: data_gambar}} style = {{height: 200, width : 350, flex: 0}} />
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>{data_alamat}</Text>
                    </Left>
                  </CardItem>

                </Card>
        )
      })
      
      
    return (
      <View style={styles.container}>
        <Text style={styles.judul}>
          ZOMATO
        </Text>
        <Header searchBar rounded>
         <Item>
            <TextInput placeholder = "Cari Menu Makanan" style={styles.textInput}
           onChangeText={(x)=> {this.setState({search: x})}} value={this.state.form}/>
        </Item>
        </Header>
        
        <Header>
                <Button block onPress={()=> {this.get()}}>
                  <Text> LIHAT DAFTAR RESTO </Text>
                </Button>
        </Header> 
          
          
          <Text style={styles.text}>
          Daftar Nama Resto
          </Text>
          <Content>
                {data}
              </Content>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding:10,
    paddingTop:40,
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  textInput:
  {
    width: '100%',
    height: 40,
    textAlign:'center',
    borderWidth: 1,
    borderColor: '#FF9800',
    backgroundColor: '#fff',
  },
  text:
  {
    width: '100%',
    height: 40,
    fontWeight:'bold',
    textAlign:'center',
    borderWidth: 1,
    borderColor: '#FF9800',
    backgroundColor: '#ffcccc',
  },
  judul:
  {
    height: 40,
    textAlign:'center',
    fontSize: 30,
    fontWeight:'bold',
    backgroundColor: 'transparent',
  },
});
