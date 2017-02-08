import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity as Touch,
} from 'react-native';

const data = [
    { img: '', title: '今天天气很好1', id: 1 },
    { img: '', title: '今天天气很好2', id: 2 },
    { img: '', title: '今天天气很好3', id: 3 },
    { img: '', title: '今天天气很好4', id: 4 },
    { img: '', title: '今天天气很好5', id: 5 },
];


// 轮播图，幻灯片
export default class Slide extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contanter}>
                <ScrollView
                    ref="scrollView"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={!true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    horizontal={true}
                    pagingEnabled={true}
                    onScrollBeginDrag={null}
                    onScrollEndDrag={(event) => {
                        let offset = event.nativeEvent.contentOffset;
                        let width = this.props.width, x = this.state.x;

                        // this.setState({
                        //     x: Math.floor(offset.x / width) * width
                        // }, () => this.timingStart());
                    } }
                    >{
                        data.map((item, index) => {
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{uri: 'http://a.hiphotos.baidu.com/image/pic/item/8601a18b87d6277f1ee195d42c381f30e824fc6f.jpg'}}
                                    style={{ height: 200, width: 200 }}
                                    />
                            </View>
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanter: {
        flex: 1,
    },
});

