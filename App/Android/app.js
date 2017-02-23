import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    Easing,
    InteractionManager,
} from 'react-native';

import Nav from './component/nav';
import Api from '../Server/api';

import logo from './img/c.png';

const window = Dimensions.get('window');

// ## 启动图
export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: false,
            loadImage: false,
            loadNav: false,
            creatives: null,

            imageScale: new Animated.Value(1),
        };

        this.setTimeout = setTimeout.bind(this);

        this.request.appStart();
    }

    request = {
        appStart: () => {
            Api.appStart.get().then(result => {

                this.setState({
                    loadImage: true,
                    creatives: result.creatives[0],
                })

                Animated.timing(this.state.imageScale, {
                    toValue: 1.3,
                    duration: 5000,
                    delay: 1000,
                    easing: Easing.linear,
                }).start();

                this.stateTimes();
            });
        },
    };

    stateTimes = () => {
        this.setTimeout(_ => {
            this.setState({
                loadNav: true,
            });
        }, 0);

        this.setTimeout(_ => {
            this.setState({
                start: true,
            });
        }, 5000);
    };

    render() {
        const ani = {
            transform: [
                { scaleX: this.state.imageScale },
                { scaleY: this.state.imageScale },
            ],
        };

        return (
            <View style={styles.contanter}>

                <View style={{ flex: 1 }}>{
                    this.state.loadNav &&
                    <Nav style={styles.nav} />
                }</View>

                {
                    !this.state.start &&
                    <View style={{ flex: 0.000001 }}>{
                        this.state.loadImage &&
                        <View style={styles.start}>
                            <Animated.View style={ani}>
                                <Image
                                    source={{ uri: this.state.creatives.url }}
                                    style={styles.image}
                                    />
                            </Animated.View>
                            <Text style={styles.text}>
                                <Image source={logo} style={styles.logo} />
                                知乎日报
                            </Text>
                        </View>
                    }</View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
    nav: {
        flex: 1,
        backgroundColor: '#fff',
    },
    start: {
        width: window.width,
        height: window.height,
        position: 'absolute',
        left: 0, right: 0,
        top: -window.height + 25,
    },
    image: {
        width: window.width,
        height: window.height,
    },
    text: {
        position: 'absolute',
        left: 0, right: 0,
        bottom: 60,
        color: '#fff',
        fontSize: 32,
        textAlign: 'center',
        textShadowOffset: {
            width: 1,
            height: 3,
        },
        textShadowRadius: 5,
        textShadowColor: 'rgba(1, 1, 1, 0.3)',
    },
    logo: {
        width: 100,
        height: 100,
    }
});