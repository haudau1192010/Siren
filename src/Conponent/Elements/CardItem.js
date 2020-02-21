import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Clipboard
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import call from 'react-native-phone-call'
import Toast, { DURATION } from 'react-native-easy-toast'
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

  playSound(soundmp3, index) {
    this.props.onPlaySound(soundmp3, index)
  }

  toastText(phone) {
    Clipboard.setString(phone);
    this.refs.toast.show('Phone number has been saved', 500, () => {
      // something you want to do at close
    });
  }

  onPressBtnVolume(sound, isPlaymp3, isShowBtnClose, id, phone, tittle, img) {
    if (!isPlaymp3)
      isShowBtnClose ? this.props.onPressEdit(id, phone, tittle, img) : this.playSound(sound, id)
    else {
      this.props.onPressMute(id)
    }
  }


  render() {
    const {
      img,
      phone,
      tittle,
      isAdd = false,
      onPress = () => { },
      sound,
      isPlaymp3 = false,
      propStyle,
      isShowBtnClose = false,
      index
    } = this.props
    const pen = isShowBtnClose ? Img.iconPenYellow : Img.iconVolum
    const imageVolume = !isPlaymp3 ? pen : Img.iconVolumeMute
    return isAdd ? <TouchableOpacity
      style={[style.cardBody, { padding: 54 }, propStyle]}
      onPress={onPress}>
      <Image source={Img.iconAdd} />
    </TouchableOpacity> :
      <View style={[style.cardBody, propStyle]} >
        {isShowBtnClose ? <TouchableOpacity
          style={style.btnClose}
          onPress={() => this.props.onPressClose(index)}
        >
          <Image source={Img.iconClose} />
        </TouchableOpacity> : null}
        <Image style={style.image} source={img ? img : Img.imgTest} />
        <Text
          style={style.tittle}
          ellipsizeMode='tail'
          numberOfLines={1}
        >
          {tittle}
        </Text>
        <Text
          style={style.subTittle}
          ellipsizeMode='tail'
          numberOfLines={1}
        >
          {`Phone ${phone}`}
        </Text>
        <View style={style.viewButton}>
          <TouchableOpacity
            style={[style.button, { alignSelf: 'flex-start' }]}
            onPress={() => this.phoneCall(phone)}
          >
            <Image source={Img.iconCall} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, { alignSelf: 'flex-end' }]}
            onPress={() => {
              this.onPressBtnVolume(sound, isPlaymp3, isShowBtnClose, index, phone, tittle, img)
            }}
          >
            <Image source={imageVolume} />
          </TouchableOpacity>
        </View>
        <Toast
          ref="toast"
          position='top'
        />
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
  },
  btnClose: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})