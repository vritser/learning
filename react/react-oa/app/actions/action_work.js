import { WORK_PERMISSION_CREATE, WORK_APPROVER_CHOOSE, WORK_SUBMIT, WORK_INST_DETAIL } from '../constants';
import axios from 'axios';

export const showWorkItemDetail = (workType) => ({
    type: WORK_PERMISSION_CREATE,
    showItemDetail: true,
    workType,
});

export const closeWorkItemDetail = () => ({
    type: WORK_PERMISSION_CREATE,
    showItemDetail: false,
})

export const chooseApprover = approver => ({
    type: WORK_APPROVER_CHOOSE,
    approver
})

export const submit = data => (dispatch, getState) => {
    axios.post('/work/submit', { data })
        .then(res => {

        })
}
const handleSubmit = data => ({
    type: WORK_SUBMIT,
    data
})

export const getInstDetail = () => dispatch => {
    axios.get('/work/detail')
        .then(res => {
            dispatch(handleInst(res.data))
        })
}
const handleInst = data => ({
    type: WORK_INST_DETAIL,
    data
})