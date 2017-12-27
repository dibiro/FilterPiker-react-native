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


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

class FilterPiker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "key1",
      textpiker: "",
      piker: {label:'',key:0},
      items: props.items,
      items2: props.items,
      visible:false,
    };
    this.onPiker = this.onPiker.bind(this)
    this.filter = this.filter.bind(this)
  }
  onPiker(piker){
    this.setState(
      {
        piker:piker,
        visible:false,
      }
    )
    this.props.onPiker(piker)
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
  filter(text){
    this.setState({textfilter: text});
    if (isBlank(text)) {
      this.setState({items: this.state.items2});
    }else{
      var  items = this.state.items2
      items = items.filter(function (item) { 
        return item.label.toUpperCase().indexOf(text.toUpperCase()) > -1 
      })
      this.setState({items: items});
    }
    
  }
  render() {
    return (
      <TouchableOpacity
        onPress={()=>{
         if (!this.props.Disable) {
          this.setState({visible:true})
         }
       }} 

      >
        <Modal
          animationType="slide"
          transparent={this.props.Transparent}
          visible={this.state.visible}
          onRequestClose={() => {console.log("Modal has been closed.")}}
        >
          <View 
            style={this.props.modalHeader} 
          >
            <TextInput 
              style={this.props.textInputStyle} 
              underlineColorAndroid='rgba(0, 0, 0, 0)' 
              placeholder={this.props.placeholderFilter} 
              placeholderTextColor={this.props.placeholderTextColor}
              onChangeText={ (text) => this.filter(text) }
              value={this.state.textfilter}
            />
          </View>
          <ScrollView 
            style={[this.props.modalContain, {marginTop: 50}]} 
          >
          { 
            this.state.items &&
            this.state.items.map(
              (item, index) => (
                <TouchableOpacity 
                  key={'item'+item.key}
                  style={[this.props.listStyle, {backgroundColor: this.state.piker.key==item.key ? this.props.selectColor : 'white' }]}
                  onPress={()=>{ this.onPiker(item)}} 
                >
                  <Text
                    style={this.props.listTextStyle}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            )
          }
          {
            this.state.items.length == 0 &&
            <View 
              style={this.props.listStyle}
            >
              <Text style={{fontSize: 20}} >
                {this.props.textEmpty}
              </Text>
            </View>

          }
          </ScrollView>
          <TouchableOpacity
            style={this.props.modalFooter} 

           onPress={()=>{ this.setState({visible:false})}} >
            <Text
              style={{fontSize: 20, marginBottom: 10}}
            >{this.props.textCancel}</Text>
          </TouchableOpacity>
        </Modal>
        <TextInput 
          style={this.props.textInputStyle}
          underlineColorAndroid='rgba(0, 0, 0, 0)' 
          placeholder={this.props.placeholderPiker} 
          placeholderTextColor={this.props.placeholderTextColor}
          value={this.state.piker.label}
          editable={false}
        />
      </TouchableOpacity>
    );
  }
}

FilterPiker.defaultProps = {
  placeholderFilter:'Filter',
  placeholderPiker:'Piker Element',
  selectColor: 'green',
  textCancel:'Cancel',
  placeholderTextColor:'black',
  Transparent: false,
  textEmpty:'No Element',
  items:[],
  backgroundColor: 'rgba(52, 52, 52, 0.8)',
  Disable:false,
  onPiker: piker => {
    console.log(piker)
  },
  listStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 35,
    paddingLeft: 10,
    borderColor: 'black',
    marginTop: 2,
    borderTopWidth: 2,
  },
  listTextStyle:{
    fontSize: 20,
  },
  textInputStyle:{
    width: '100%',
  },
  modalFooter:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor:'white',
    borderColor: 'black',
    borderTopWidth: 5,
  },
  modalHeader:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    borderColor: 'black',
    borderBottomWidth: 5,
  }
};

export default FilterPiker
