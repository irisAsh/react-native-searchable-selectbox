import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default class Selectbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      listData: props.listData,
      text: props.text,
    };
  }

  render() {
    const { 
      boxHeight,
      boxWidth,
      boxBorderColor,
      boxBorderWidth,
      listColumn,
      onSelected,
      selectedColor,
    } = this.props;

    const boxStyle = {
      borderColor: boxBorderColor,
      borderWidth: boxBorderWidth,
      height: boxHeight,
      width: boxWidth,
    };

    const listStyle = {
      backgroundColor: 'white',
      borderColor: boxBorderColor,
      borderWidth: boxBorderWidth,
      height: boxHeight * listColumn,
      position: 'absolute',
      top: boxHeight + boxBorderWidth * 2,
      width: boxWidth,
      zIndex: -100,
    };

    const itemContainerStyle = {
      flex: 1,
      justifyContent: 'center',
      height: boxHeight,
    };

    const selectedStyle = {
      backgroundColor: selectedColor,
    };

    return (
      <View style={{ zIndex: 100 }}>
        <TextInput
          style={[boxStyle]}
          onFocus={() => this.showList()}
          onChangeText={text => {
            this.setState({
              listData: this.searchItem(text),
            });
          }}

          value={this.state.text}
        />
        <ScrollView style={[this.state.isShown ? {} : { display: 'none' }, listStyle]}>
          { this.state.listData.map(item => {
              return (
                <TouchableOpacity
                  style={[itemContainerStyle, this.isSelected(item) && selectedStyle]}
                  key={item}
                  onPress={() => {
                    this.setState({
                      text: item,
                    });
                    this.hideList();
                    onSelected();
                  }}
                >
                  <View>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }

  isSelected = (item) => {
    return item === this.state.text;
  }

  showList = () => {
    this.setState({isShown: true});
  }

  hideList = () => {
    this.setState({isShown: false});
  }

  searchItem = text => {
    let items = this.props.listData;
    const reg = new RegExp(`.*${text}.*`);
    if (!!text) {
      items = items.filter(item => reg.test(item));
    }
    return items
  }
}

Selectbox.defaultProps = {
  boxHeight: 40,
  boxWidth: 300,
  boxBorderColor: 'gray',
  boxBorderWidth: 1,
  listColumn: 4,
  listData: [],
  onSelected: () => {},
  selectedColor: '#ffd6e9',
  text: null,
}
