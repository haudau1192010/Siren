import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import call from 'react-native-phone-call'
import Img from '../../commons/images'

const widthCard = ((Dimensions.get('window').width - 65) / 2)

export default class CardItem extends Component {
  constructor(props) {
    super(props)

  }

  phoneCall(phoneCall) {
    const args = {
      number: phoneCall,
      prompt: false
    }

    call(args).catch(console.error)
  }

  playSound(soundmp3) {
    this.props.onPlaySound(soundmp3)
  }


  render() {
    const {
      img,
      phone,
      tittle,
      isAdd = false,
      onPress = () => { },
      sound,
      propStyle
    } = this.props
    return isAdd ? <TouchableOpacity style={[style.cardBody, { padding: 54 }, propStyle]} onPress={onPress}>
      <Image source={Img.iconAdd} />
    </TouchableOpacity> :
      <View style={[style.cardBody, propStyle]} >
        <Image style={style.image} source={img ? img : Img.imgTest} />
        <Text style={style.tittle}>{tittle}</Text>
        <Text style={style.subTittle}>{`Phone ${phone}`}</Text>
        <View style={style.viewButton}>
          <TouchableOpacity
            style={[style.button, { alignSelf: 'flex-start' }]}
            onPress={() => this.phoneCall(phone)}
          >
            <Image source={Img.iconCall} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, { alignSelf: 'flex-end' }]}
            onPress={() => this.playSound(sound)}
          >
            <Image source={Img.iconVolum} />
          </TouchableOpacity>
        </View>
      </View >
  }
}

const style = ScaledSheet.create({
  cardBody: {
    marginTop: 15,
    width: `${widthCard}@ms`,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: '64@s',
    height: '64@s',
    borderRadius: '64@s'
  },
  tittle: {
    marginTop: 15,
    fontSize: '14@ms0.3',
    fontFamily: 'OpenSans-Bold',
    color: 'black'
  },
  subTittle: {
    marginTop: 10,
    fontSize: '8@ms0.3',
    fontFamily: 'OpenSans-Bold',
    color: '#A8A8A8'
  },
  button: {
    width: '46@s',
    height: '46@s',
    borderRadius: '23@s',
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
  },
  viewButton: {
    width: `${widthCard - 25}@s`,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  }
})