import { WORK_PERMISSION_CREATE, WORK_APPROVER_CHOOSE, WORK_SUBMIT, WORK_INST_DETAIL } from '../constants'

const initState = {
    showItemDetail: false,
    workType: '',
    choosed: [],
    instData: null,
}

const work = (state = initState, action) => {
    switch (action.type) {
        case WORK_PERMISSION_CREATE:
            return {...state, showItemDetail: action.showItemDetail, workType: action.workType };
        case WORK_APPROVER_CHOOSE:
            let choosed = state.choosed;
            let approver = choosed.filter(c => c._id == action.approver._id)[0];
            let i = choosed.indexOf(approver);
            if (i != -1) {
                choosed.splice(i, 1);
            } else {
                choosed = [...state.choosed, action.approver];
            }
            return {...state, choosed }
        case WORK_SUBMIT:
            console.log('data:', action.data);

            return {...state }
        case WORK_INST_DETAIL:
            return {...state, instData: action.data }
        default:
            return state;
    }
}

export default work;