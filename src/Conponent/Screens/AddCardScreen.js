import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fumi } from 'react-native-textinput-effects';
import { ScaledSheet } from 'react-native-size-matters'
import ImagePicker from 'react-native-image-picker'
import Img from '../../commons/images'

export default class AddCardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      phone: "",
      avatar: null,
      isShowTxtErr: false
    }
  }

  showImagePicker() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatar: source,
        });
      }
    });
  }

  onBtnSave() {
    let index = 0
    let isEdit = false
    const pro = this.props.route.params
    if (this.state.name.trim() && this.state.phone.trim()) {

      if (pro.isEdit && pro.id) {
        index = pro.id
        isEdit = pro.isEdit
      }
      pro.returnError(this.state.name, this.state.phone, this.state.avatar, index, isEdit)
      this.props.navigation.goBack()
    } else {
      this.setState({ isShowTxtErr: true })
    }
  }

  componentDidMount() {
    const rou = this.props.route.params
    this.state.name = rou.name ? rou.name : ""
    this.state.phone = rou.phone ? rou.name : ""
    this.state.avatar = rou.img ? rou.img : ""
    this.setState({ ...this.state.name, ...this.state.phone, ...this.state.avatar })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}
          >
            <TouchableOpacity
              style={style.btnBack}
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Image source={Img.iconBack} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.btnSave}
              onPress={() => this.onBtnSave()}
            >
              <Text style={style.textSave}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={style.viewAvatar}>
            <Image source={Img.iconBgAvatar} />
            <View style={style.viewInAvatar}>
              <Image
                style={style.avatar}
                resizeMode="cover"
                source={this.state.avatar ? this.state.avatar : Img.imgTest}
              />
              <TouchableOpacity
                style={style.pen}
                onPress={() => this.showImagePicker()}
              >
                <Image source={Img.iconPen} />
              </TouchableOpacity>
            </View>
          </View>
          <Fumi
            value={this.state.name}
            style={{ marginTop: 30 }}
            label={'Name'}
            iconClass={FontAwesomeIcon}
            iconName={'edit'}
            iconColor={'#f95a25'}
            iconSize={24}
            iconWidth={40}
            inputPadding={16}
            onChangeText={(text) => { this.setState({ name: text }) }}
          />
          <Fumi
            value={this.state.phone}
            style={{ marginTop: 30, marginBottom: 10 }}
            label={'Phone'}
            iconClass={FontAwesomeIcon}
            iconName={'phone'}
            iconColor={'#f95a25'}
            iconSize={24}
            iconWidth={40}
            inputPadding={16}
            onChangeText={(text) => { this.setState({ phone: text }) }}
            isNumberic={true}
          />
          {this.state.isShowTxtErr && <Text style={style.textErr}>
            *Name or Phone is not null
          </Text>}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const style = ScaledSheet.create({
  btnBack: {
    marginTop: "5@ms",
    marginLeft: "15@ms"
  },
  viewAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInAvatar: {
    position: 'absolute',
    alignItems: 'center',
  },
  pen: {
    backgroundColor: 'white',
    position: 'absolute',
    right: "2@ms",
    bottom: "2@ms",
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: "15@ms"
  },
  avatar: {
    width: "106@ms",
    height: "106@ms",
    borderRadius: "53@ms"
  },
  btnSave: {
    borderWidth: "2@ms",
    borderRadius: 10,
    borderColor: "#0098FF",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: "15@ms",
    paddingVertical: "10@ms",
    alignSelf: "flex-end",
    marginRight: "15@ms",
    marginTop: "5@ms"
  },
  textSave: {
    fontSize: "14@ms0.3",
    fontFamily: 'OpenSans-Bold',
    color: "#0098FF"
  },
  textErr: {
    marginTop: 10,
    marginLeft: 35,
    color: '#FF0000',
    fontSize: "11@ms0.3",
    fontFamily: 'OpenSans-Bold',
  }
})
