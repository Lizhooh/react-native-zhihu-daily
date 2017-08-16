import {
    NativeModules,
    LayoutAnimation,
} from 'react-native';

/**
 * 在 android 上需要开启布局动画
 */
export const layoutAnimate = {
    open() {
        const _ = NativeModules.UIManager.setLayoutAnimationEnabledExperimental;
        _ && _(true);
    },
    /**
     * 启动基本的布局动画
     * @param{Number} duration 动画持续时间
     * @param{String} easing 动画缓冲类型
     */
    start(duration = 240, easing = 'easeInEaseOut') {
        LayoutAnimation.configureNext({
            duration: duration,
            create: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types[easing],
            },
        });
    }
};
