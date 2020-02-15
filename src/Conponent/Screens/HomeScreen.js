import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native'
import Modal from "react-native-modal"
import Mailer from 'react-native-mail'
import { ScaledSheet } from 'react-native-size-matters'
import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'
import BtnTopItem from '../Elements/BtnTopItem'
import CardItem from '../Elements/CardItem'
import Img from '../../commons/images'
import Media from '../../commons/media'

const { width } = Dimensions.get("window")
const widthCard = ((Dimensions.get('window').width - 65) / 2)

const a = [
  {
    img: Img.iconPolice,
    tittle: 'Police',
    phone: "113",
    sound: Media.PoliceSirenSound
  },
  {
    img: Img.iconAmbumlance,
    tittle: 'Ambulance',
    phone: "114",
    sound: Media.AmbulanceSirenSound
  },
  {
    img: Img.iconFire,
    tittle: 'Fire',
    phone: "115",
    sound: Media.FireSirenSound
  }
]


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isModalVisible: false,
      value: 1
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  async returnError(name, phone, avatar) {
    this.state.data.push({
      img: avatar,
      tittle: name,
      phone: phone
    })
    await AsyncStorage.setItem("ListItem", JSON.stringify(this.state.data)).then(() => {
      this.setState({ ...this.state.data })
    })
  }

  playSound(soundmp3) {
    Sound.setCategory('Playback');

    const sound = new Sound(soundmp3, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error)
      }
      sound.setVolume(this.state.value)
      sound.play()
    })
  }

  async handleVolume() {
    await AsyncStorage.setItem("ONVOLUME", this.state.value)
    this.setState({ isModalVisible: false })
  }

  handleEmail() {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
        ],
        { cancelable: true }
      )
    });
  }

  componentDidMount() {
    return Promise.all([
      AsyncStorage.getItem("ListItem"),
      AsyncStorage.getItem('ONVOLUME')
    ]).then(([
      ListItem,
      Volume
    ]) => {
      this.state.data = ListItem ? JSON.parse(ListItem) : a
      this.setState({ ...this.state.data })
      this.state.value = Volume ? JSON.parse(Volume) : 1
    })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={async () => {
            await AsyncStorage.setItem("ONVOLUME", JSON.stringify(this.state.value))
            this.setState({ isModalVisible: false })
          }}
        >
          <View style={style.modalView}>
            <Image
              style={{ marginLeft: 15 }}
              source={Img.iconVolume}
            />
            <Slider
              value={this.state.value}
              style={{ width: width - 150 }}
              thumbTintColor='#0098FF'
              maximumTrackTintColor='white'
              minimumTrackTintColor='black'
              onValueChange={value => this.setState({ value })}
            />
            <Text style={style.textValue}>
              {Math.round(this.state.value * 100)}
            </Text>
          </View>
        </Modal>
        <View style={style.topView}>
          <BtnTopItem img={Img.iconComment} onPress={this.handleEmail} />
          <BtnTopItem img={Img.iconStar} />
          <BtnTopItem img={Img.iconSetting} onPress={this.toggleModal} />
        </View>
        <ScrollView
          style={{ marginTop: 15, marginLeft: 3 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.container}>
            {
              this.state.data.map((a, i) => {
                return [<CardItem
                  key={i} {...a}
                  onPlaySound={(soundmp3) => this.playSound(soundmp3)}
                  propStyle={{
                    marginLeft: (i + 1) % 2 == 0 ? 15 : null,
                    marginTop: i == 0 || i == 1 ? 0 : 15
                  }}
                />,
                i == this.state.data.length - 1 ? [<CardItem
                  propStyle={(i + 2) % 2 == 0 ? { marginLeft: 15, } : null}
                  key={i + 1}
                  isAdd={true}
                  onPress={() => this.props.navigation.navigate("AddCard", { returnError: this.returnError.bind(this) })}
                />, <View style={{ width: widthCard + 15 }} />] : null]
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const style = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 10
  },
  topView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50
  },
  modalView: {
    width: width - 30,
    paddingVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textValue: {
    fontSize: '16@ms0.3',
    fontFamily: 'OpenSans-Bold',
    color: 'black',
    marginRight: 15
  }
})
