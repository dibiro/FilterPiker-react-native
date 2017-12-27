import React, { Component } from "react";
import { 
  Platform,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  ToastAndroid
} from "react-native";

import FilterPiker from './components/FilterPiker';

const items = [
  {
    key:1,
    label:'hola'
  },
  {
    key:2,
    label:'como'
  },
  {
    key:3,
    label:'estas'
  },
  {
    key:4,
    label:'tu'
  },
  {
    key:5,
    label:'hoy'
  },
  {
    key:6,
    label:'mañana'
  },
  {
    key:7,
    label:'ayer'
  },
  {
    key:8,
    label:'quien'
  },
  {
    key:9,
    label:'es'
  },
  {
    key:10,
    label:'ese'
  },
  {
    key:11,
    label:'tipo'
  },
  {
    key:12,
    label:'que'
  },
  {
    key:13,
    label:'nos'
  },
  {
    key:14,
    label:'esta'
  },
  {
    key:15,
    label:'mirando'
  },
  {
    key:16,
    label:'?'
  },
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "key1"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
  render() {
    return (
      <View>
        <FilterPiker items={items} onPiker={(piker)=>{alert('has elegido '+piker.label);}} />
        <FilterPiker items={items} placeholderPiker='Elige uno' />
        <FilterPiker />
        <FilterPiker Disable={true} placeholderPiker='No Funciono' />
      </View>
    );
  }
}


export default App

