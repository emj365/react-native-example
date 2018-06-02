/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import JPushModule from 'jpush-react-native'
console.log(JPushModule)

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

// prettier-ignore
type Props = {};

export default class App extends Component<Props> {
  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener()
    JPushModule.removeReceiveNotificationListener()
  }

  componentDidMount() {
    // JPushModule.initPush()

    if (Platform.OS === 'ios') {
      // JPushModule.setBadge(0)
      JPushModule.getBadge(console.log)
      JPushModule.sendLocalNotification({
        id: 1,
        title: 'local notification',
        content: 'test content',
        extra: { key1: 'value1', key2: 'value2' },
        fireTime: new Date().getTime() + 5000
      })
    } else {
      JPushModule.notifyJSDidLoad(console.log)
      JPushModule.sendLocalNotification({
        buildId: 1,
        id: 1,
        title: 'local notification',
        content: 'test content',
        extra: { key1: 'value1', key2: 'value2' },
        fireTime: new Date().getTime() + 5000
      })
    }

    JPushModule.addReceiveOpenNotificationListener(map => {
      console.log('Opening notification!')
      //自定义点击通知后打开某个 Activity，比如跳转到 pushActivity
      // this.props.navigator.jumpTo({name: "pushActivity"})
    })

    JPushModule.addReceiveNotificationListener(map => {
      console.log('alertContent: ' + map.alertContent)
      console.log('extras: ' + map.extras)
      // var extra = JSON.parse(map.extras);
      // console.log(extra.key + ": " + extra.value);
    })

    JPushModule.addReceiveCustomMsgListener(map => {
      console.log('alertContent: ' + map.alertContent)
      console.log('extras: ' + map.extras)
      // var extra = JSON.parse(map.extras);
      // console.log(extra.key + ": " + extra.value);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
