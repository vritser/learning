import { MSG_SEND, MSG_RECEIVED, MSG_DETAIL, MSG_CURR } from '../constants';

const initState = {
    // 消息列表
    msglist: [],
    // 当前选中联系人
    curr: null,
    // 消息记录
    detail: { who: {}, list: [] }
}

const msg = (state = initState, action) => {
    switch (action.type) {
        case MSG_SEND:
            return state;
        case MSG_CURR:
            return {...state, curr: action.curr }
        case MSG_RECEIVED:
            let newList = {};
            let msglist = [...state.msglist, action.msg];
            msglist.map(item => {
                newList[JSON.stringify(item.from._id)] = item;
            })
            msglist = Object.keys(newList).map(prop => newList[prop])
            return {...state, msglist };
        case MSG_DETAIL:
            // let currDetail = state.curr._id;
            // let newDetail = {};
            // let detail = [...state.detail, ...action.msgs];
            // newDetail[currDetail] = {};
            // detail.map(item => {
            //     newDetail[currDetail][JSON.stringify(item)] = item;
            // })
            // detail = Object.keys(newDetail[currDetail]).map(prop => newDetail[currDetail][prop])
            let newDetail = {};
            let detail = {};
            if (action.who.left === state.detail.who.left || action.who.right === state.detail.who.right) {
                detail = { who: action.who, list: [...state.detail.list, ...action.msgs] };
            } else {
                detail = { who: action.who, list: [...action.msgs] }
            }

            detail.list.map(item => {
                newDetail[JSON.stringify(item)] = item;
            })
            detail.list = Object.keys(newDetail).map(prop => newDetail[prop])
            return {...state, detail }
        default:
            return state;
    }
}

export default msg;



