import React, { Component } from 'react';
import { Constants } from 'expo'
import {
    Container,
    Button,
    Form,
    Item as FormItem,
    Input,
    Label,
    Icon,
    Item,
    View
} from 'native-base';
import { Text } from 'react-native';
import { StyleSheet, Alert } from 'react-native';
import firebase from '../../config';
import Modal from "react-native-modal";
import {Spinner } from 'native-base';


export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'pepe@gmail.com',
            password: 'hola123',
            isModalVisibleSpinner: false
        };
        this.SignUp = this.SignUp.bind(this);
    }

    LogIn(email, password) {
        this.setState({
            isModalVisibleSpinner: !this.state.isModalVisibleSpinner
        }, () => {  
        });
        try {
            
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        isModalVisibleSpinner: !this.state.isModalVisibleSpinner
                    }, () => {  
                        console.log('Success')
                        this.props.navigation.navigate('Map')
                    });
                   
                })
        } catch (error) {
            console.log(error.toString(error));
        }
    };

    SignUp(email, password) {
        this.setState({
            isModalVisibleSpinner: !this.state.isModalVisibleSpinner
        }, () => {  
        });
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    alert('Registro completo')
                    this.setState({
                        isModalVisibleSpinner: !this.state.isModalVisibleSpinner
                    }, () => {  
                        console.log('Success')
                        this.props.navigation.navigate('Map')
                    });
                   
                }).catch(()=> {
                    this.setState({
                        isModalVisibleSpinner: !this.state.isModalVisibleSpinner
                    }, () => {  
                        alert('Credenciales incorrectas')
                    });
                    
                })
        } catch (error) {
            console.log(error.toString(error));
        }
    };

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Icon name='eye' />
                        <Label>Email</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={email => this.setState({ email })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Icon name='eye' />
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>
                    <Button full rounded success style={{ marginTop: 20 }} onPress={() => this.LogIn(this.state.email, this.state.password)}>
                        <Text>Login</Text>
                    </Button>
                    <Button full rounded success style={{ marginTop: 20 }} onPress={() =>  this.props.navigation.navigate('SignUp') }>
                        <Text>Signup</Text>
                    </Button>
                </Form>
                <Modal style={styles.containerSpinner} isVisible={this.state.isModalVisibleSpinner}>
                    <View style={styles.contentSpinner}>
                        <Spinner color='red' />
                    </View>
                </Modal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    icon: {
        fontSize: 20
    },containerSpinner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius:10,
		width: 350, 
		height:280
	  },
	  contentSpinner: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		width:200,
		height:200,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	  }
})