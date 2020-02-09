import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Img from '../../commons/images'

export default class BtnTopItem extends Component {
  render() {
    const {
      img,
      onPress = () => { }
    } = this.props
    return (
      <TouchableOpacity style={style.btn} onPress={() => onPress}>
        <Image source={img} />
      </TouchableOpacity>
    )
  }
}

const style = ScaledSheet.create({
  btn: {
    width: '50@ms',
    height: '50@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})