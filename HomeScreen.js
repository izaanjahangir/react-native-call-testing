import React, {Component} from 'react';
import {SafeAreaView, View, StatusBar, Text, Button} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

class App extends Component {
  state = {
    isCalling: false,
  };

  componentDidMount() {
    JitsiMeet.endCall();
  }

  startCall = () => {
    this.setState({isCalling: true}, () => {
      const url = 'https://meet.jit.si/izaan-meeting';
      JitsiMeet.audioCall(url);
    });
  };

  onConferenceTerminated = nativeEvent => {
    console.log('onConferenceTerminated');
    JitsiMeet.endCall();
    this.setState({isCalling: false});
    /* Conference terminated event */
  };

  onConferenceJoined(nativeEvent) {
    console.log('onConferenceJoined');
    /* Conference joined event */
  }

  onConferenceWillJoin(nativeEvent) {
    console.log('onConferenceWillJoin');

    /* Conference will join event */
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isCalling ? (
          <JitsiMeetView
            onConferenceTerminated={this.onConferenceTerminated}
            onConferenceJoined={this.onConferenceJoined}
            onConferenceWillJoin={this.onConferenceWillJoin}
            style={{flex: 1, height: '100%', width: '100%'}}
          />
        ) : (
          <View>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
              <View>
                <Text>Home</Text>
                <Button onPress={this.startCall} title="Start call" />
              </View>
            </SafeAreaView>
          </View>
        )}
      </View>
    );
  }
}

export default App;
