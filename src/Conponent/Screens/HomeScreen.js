import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  Dimensions,
  Image,
  TouchableOpacity
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
    sound: Media.PoliceSirenSound,
    isPlaymp3: false
  },
  {
    img: Img.iconAmbumlance,
    tittle: 'Ambulance',
    phone: "114",
    sound: Media.AmbulanceSirenSound,
    isPlaymp3: false
  },
  {
    img: Img.iconFire,
    tittle: 'Fire',
    phone: "115",
    sound: Media.FireSirenSound,
    isPlaymp3: false
  }
]

let idx = 0

let sound = null


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isModalVisible: false,
      isModalRateVisible: false,
      isModalRemoveVisible: false,
      value: 1
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleModalRate = () => {
    this.setState({ isModalRateVisible: !this.state.isModalRateVisible });
  };

  toggleModalRemoveRate = () => {
    this.setState({ isModalRemoveVisible: !this.state.isModalRemoveVisible });
  };

  async returnError(name, phone, avatar, id, isEdit) {
    if (isEdit) {
      this.state.data[id].img = avatar
      this.state.data[id].tittle = name
      this.state.data[id].phone = phone
    } else {
      this.state.data.push({
        img: avatar,
        tittle: name,
        phone: phone,
        isPlaymp3: false
      })
    }
    await AsyncStorage.setItem("ListItem", JSON.stringify(this.state.data)).then(() => {
      this.setState({ ...this.state.data })
    })
  }

  playSound(soundmp3, index) {
    if (sound) {
      sound.stop()
    }
    sound = new Sound(soundmp3, Sound.MAIN_BUNDLE, (error) => {

      if (error) {
        console.log(error)
      }
      sound.setVolume(this.state.value)
      console.log(index)
      this.state.data.map((i) => i.isPlaymp3 = false)
      this.state.data[index].isPlaymp3 = true
      this.setState({ ...this.state.data })
      sound.play()
    })
  }

  onRemove(i) {
    idx = i
    this.setState({ isModalRemoveVisible: true })
  }

  async handleVolume() {
    await AsyncStorage.setItem("ONVOLUME", this.state.value)
    this.setState({ isModalVisible: false })
  }

  handleEmail() {
    Mailer.mail({
      subject: 'Need help',
      recipients: ['werewolf.contacts@gmail.com'],
      ccRecipients: ['werewolf.contacts@gmail.com'],
      bccRecipients: ['werewolf.contacts@gmail.com'],
      body: 'Hi. ',
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

    const nav = this.props.navigation

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

        <Modal
          isVisible={this.state.isModalRemoveVisible}
          onBackdropPress={async () => {
            this.setState({ isModalRemoveVisible: false })
          }}
        >
          <View style={[style.modalView,
          { paddingVertical: 0, borderRadius: 15, flexDirection: 'column' }]}>
            <Image style={{ marginTop: 20 }} source={Img.iconBin} />
            <Text style={style.tittleRate}>
              Delete Contact
            </Text>
            <Text style={style.subTittleRate}>
              Delete a contact will permanently remove it from  your list contact
            </Text>
            <View style={style.viewBtnRate}>
              <TouchableOpacity
                style={style.buttonRateLater}
                onPress={() => this.toggleModalRemoveRate()}>
                <Text
                  style={style.textRateBottom}
                >
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.buttonRateLater, {
                  backgroundColor: '#0098FF', borderWidth: 0, marginLeft: 40, paddingHorizontal: 35
                }]}
                onPress={async () => {
                  this.state.data.splice(idx, 1)
                  await AsyncStorage.setItem("ListItem", JSON.stringify(this.state.data)).then(() => {
                    this.setState({ ...this.state.data, isModalRemoveVisible: false })
                  })
                }}
              >
                <Text style={[style.textRateBottom,
                {
                  color: 'white', fontFamily: 'OpenSans-Bold'
                }]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isModalRateVisible}
          onBackdropPress={async () => {
            this.setState({ isModalRateVisible: false })
          }}
        >
          <View style={[style.modalView,
          { paddingVertical: 0, borderRadius: 15, flexDirection: 'column' }]}>
            <Image style={{ marginTop: 20 }} source={Img.iconPopupRate} />
            <Text style={style.tittleRate}>
              Like using Siren App?
            </Text>
            <Text style={style.subTittleRate}>
              Recommend us to others by rating us on Google Play
            </Text>
            <View style={style.viewBtnRate}>
              <TouchableOpacity
                style={style.buttonRateLater}
                onPress={() => this.toggleModalRate()}>
                <Text
                  style={style.textRateBottom}
                >
                  Later
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[style.buttonRateLater, {
                backgroundColor: '#0098FF', borderWidth: 0, marginLeft: 40, paddingHorizontal: 35
              }]}>
                <Text style={[style.textRateBottom,
                {
                  color: 'white', fontFamily: 'OpenSans-Bold'
                }]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={style.topView}>
          <BtnTopItem img={Img.iconComment} onPress={this.handleEmail} />
          <BtnTopItem img={Img.iconStar} onPress={this.toggleModalRate} />
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
                  onPlaySound={(soundmp3, id) => this.playSound(soundmp3, id)}
                  propStyle={{
                    marginLeft: (i + 1) % 2 == 0 ? 15 : 0,
                    marginTop: i == 0 || i == 1 ? 0 : 15
                  }}
                  isShowBtnClose={i > 2 ? true : false}
                  index={i}
                  onPressClose={(i) => this.onRemove(i)}
                  onPressMute={(index) => {
                    if (sound) {
                      sound.stop()
                      this.state.data[index].isPlaymp3 = false
                      this.setState({ ...this.state.data })
                    }
                  }}
                  onPressEdit={(id, phone, name, img) => {
                    nav.navigate("AddCard", {
                      id: id, phone: phone, name: name, img: img, isEdit: true, returnError: this.returnError.bind(this)
                    })
                  }}
                />,
                i == this.state.data.length - 1 ? [<CardItem
                  propStyle={(i + 2) % 2 == 0 ? { marginLeft: 15, } : null}
                  key={i + 1}
                  isAdd={true}
                  onPress={() => nav.navigate("AddCard", { returnError: this.returnError.bind(this) })}
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
    alignItems: 'center',
    paddingBottom: 30
  },
  textValue: {
    fontSize: '16@ms0.3',
    fontFamily: 'OpenSans-Bold',
    color: 'black',
    marginRight: 15
  },
  tittleRate: {
    marginTop: 18,
    fontSize: '20@ms0.3',
    color: '#0098FF',
    fontFamily: 'OpenSans-Bold'
  },
  subTittleRate: {
    marginTop: 20,
    fontSize: '12@ms0.3',
    color: '#8E8E8E',
    textAlign: 'center',
    paddingHorizontal: 40,
    fontFamily: 'OpenSans-Semibold'
  },
  viewBtnRate: {
    paddingHorizontal: 20,
    flexDirection: 'row', marginTop: 30
  },
  buttonRateLater: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 10
  },
  textRateBottom: {
    fontSize: '16@ms0.3',
    color: '#606060',
    fontFamily: 'OpenSans-Regular',
  }
})
