import moment from 'moment';

moment.defineLocale('zh-cn', {
    weekdays: '星期日|星期一|星期二|星期三|星期四|星期五|星期六'.split('|'),
});

// 对时间进行格式化
export const getSectionName = (_date) => {
    if (moment(Date.now()).format('MM月DD日') === moment(_date, 'YYYYMMDD').format('MM月DD日')) {
        return '今日热闻';
    }
    else {
        return moment(_date, 'YYYYMMDD').locale('zh-cn').format('MM月DD日 dddd');
    }
};


// 大于 1000 时，显示 k
export const displayK = (value) => {
    if (value > 1000 && (value += '')) {
        value = value.substr(0, value.length - 2);
        return (value / 10).toFixed(1) + 'k';
    }
    return value;
};
