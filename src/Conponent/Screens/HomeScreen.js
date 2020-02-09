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

const data = [
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

const HomeScreen = () => {
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
            data.map((a, i) =>
              <CardItem key={i} {...a} />
            )
          }
          < CardItem isAdd={true} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

