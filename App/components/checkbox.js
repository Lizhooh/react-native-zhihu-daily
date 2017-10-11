import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity as Touch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CheckBox extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            active: this.props.initCheck || false,
        }
    }

    render() {
        const { color = '#fff', size = 24, shadow = false, onChange, style } = this.props;
        const { active } = this.state;

        return (
            <Touch
                style={[{ padding: 5 }, style]}
                activeOpacity={0.75}
                onPress={e => {
                    this.setState({ active: !active });
                    onChange && onChange(!active);
                } }
                >
                <Icon
                    name={active ? 'check-box' : 'check-box-outline-blank'}
                    size={size}
                    color={color}
                    style={shadow && $.shadow}
                    />
            </Touch>
        );
    }
}

const $ = StyleSheet.create({
    shadow: {
        textShadowColor: 'rgba(1, 1, 1, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 6,
    },
})

