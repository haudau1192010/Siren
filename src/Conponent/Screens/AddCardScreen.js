import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { ScaledSheet } from 'react-native-size-matters'
import ImagePicker from 'react-native-image-picker'
import Img from '../../commons/images'

export default class AddCardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      phone: null,
      avatar: null
    }
  }

  showImagePicker() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            onPress={() => {
              this.props.route.params.returnError(this.state.name, this.state.phone, this.state.avatar)
              this.props.navigation.goBack()
            }}
          >
            <Text style={style.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={style.viewAvatar}>
          <Image source={Img.iconBgAvatar} />
          <View style={style.viewInAvatar}>
            <Image style={style.avatar} resizeMode="stretch" source={this.state.avatar ? this.state.avatar : Img.imgTest} />
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
          style={{ marginTop: 30 }}
          label={'Phone'}
          iconClass={FontAwesomeIcon}
          iconName={'phone'}
          iconColor={'#f95a25'}
          iconSize={24}
          iconWidth={40}
          inputPadding={16}
          onChangeText={(text) => { this.setState({ phone: text }) }}
          inputStyle={{ keyboardType: 'numeric' }}
        />
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
  }
})
