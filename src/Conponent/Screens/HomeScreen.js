import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native'
import BtnTopItem from '../Elements/BtnTopItem'
import CardItem from '../Elements/CardItem'
import Img from '../../commons/images'

const a = [
  {
    img: Img.iconPolice,
    tittle: 'Police',
    phone: 113
  },
  {
    img: Img.iconAmbumlance,
    tittle: 'Ambulance',
    phone: 114
  },
  {
    img: Img.iconFire,
    tittle: 'Fire',
    phone: 115
  }
]


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  returnError(name, phone, avatar) {
    this.setState(state => {
      const list = state.data.push({
        img: avatar,
        tittle: name,
        phone: phone
      })
      return list
    })
  }

  componentDidMount() {
    this.state.data = a
    this.setState({ ...this.state.data })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50 }}>
          <BtnTopItem img={Img.iconComment} />
          <BtnTopItem img={Img.iconStar} />
          <BtnTopItem img={Img.iconSetting} />
        </View>
        <ScrollView
          style={{ flex: 1, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              this.state.data.map((a, i) =>
                <CardItem key={i} {...a} />
              )
            }
            < CardItem isAdd={true} onPress={() => this.props.navigation.navigate("AddCard", { returnError: this.returnError.bind(this) })} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

