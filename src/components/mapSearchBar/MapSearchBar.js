import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    FlatList,
    Alert,
} from 'react-native';
import LocationItem from "./LocationItem";

const WIDTH = Dimensions.get('window').width;

export default class MapSearchBar extends Component{

    constructor(props){
        super(props);
        this.state = { lugares : this.props.places, lugaresBack : this.props.places, showLocationItem:false, textInputValue:"" }
        this.hiddeLocationItem= this.hiddeLocationItem.bind(this);
        this.filterResults= this.filterResults.bind(this);
    }

    componentWillReceiveProps(someProp) {
        this.setState( { lugares : someProp.places, lugaresBack : someProp.places})
    }
    filterResults(event = {}) {    
        if(event != ""){
            var filteredList = this.state.lugaresBack.filter(function (place) {
                return place.name.toUpperCase().includes(event.toUpperCase())
            });
            this.setState({
                lugares : filteredList,
                showLocationItem: true,
                textInputValue: event
            });
        } else {
            this.setState({
                lugares : this.state.lugaresBack,
                showLocationItem: false,
                textInputValue: event
            });
        }   
    };

    hiddeLocationItem(name){
        this.setState({
            showLocationItem: false,
            textInputValue: name
        });
    }

    render(){
        return(
            <View style={{position : 'absolute', top : 10}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: (WIDTH-40), height: 10}}>

                    </View>
                    <View style={{width: (WIDTH-40), height: 50, backgroundColor: 'skyblue'}}>
                        <View style={styles.container}>
                            <View style={styles.leftCol}>
                                <Text style={{fontSize : 8}}>{'\u25A0'}</Text>
                            </View>
                            <View style={styles.centerCol}>
                                <TextInput  style={{fontSize : 21, color : '#545454'}} 
                                            placeholder="¿A dónde quieres ir?"
                                            value={this.state.textInputValue}
                                            onChangeText={this.filterResults}
                                            />
                            </View>
                            <View style={styles.rightCol}></View>
                        </View>
                    </View>
                    { this.state.showLocationItem && 
                    <View style={{width: (WIDTH-40), height: 50, paddingTop : 20}}>
                        <View style={styles.resultList}>
                            <FlatList
                                data={this.state.lugares}
                                renderItem={({ item }) => <LocationItem hiddeLocationItem={this.hiddeLocationItem}  place={item} changeMapLocationFocus={this.props.changeMapLocationFocus}/>}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        zIndex : 9,
        position : 'absolute',
        flexDirection : 'row',
        width : (WIDTH-40),
        height : 50,
        borderRadius : 3,
        backgroundColor : 'white',
        alignItems : 'center',
        shadowColor : '#000000',
        elevation : 7,
        shadowRadius : 5,
        shadowOpacity : 0.5
    },
    leftCol : {
        flex : 1,
        alignItems : 'center'
    },
    centerCol : {
        flex : 4
    },
    rightCol : {
        flex : 1,
        borderLeftWidth : 1,
        borderColor : '#ededed'
    },
    resultList : {
        width: (WIDTH-40),
        height: 200,
        backgroundColor: 'white',
        borderColor : 'black',
        zIndex : 9,
        borderRadius : 3,
        shadowColor : '#000000',
        elevation : 7,
        shadowRadius : 5,
        shadowOpacity : 0.5
    }
 })