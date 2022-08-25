import { EndPoints } from '@/utils/Axios/EndPoints';
import { PATCH, POST, Uploadfiles } from '@/utils/Axios/Axios';
import { Toaster } from '@/components/Toast';

export const TYPES = {
    UPLOADVIDEO: 'UPLOADVIDEO',
    UPLOADVIDEO_REQUEST: 'UPLOADVIDEO_REQUEST',
    UPLOADVIDEO_ERROR: 'UPLOADVIDEO_ERROR',
    UPLOADVIDEO_SUCCESS: 'UPLOADVIDEO_SUCCESS',
    JUDGECOMPLAINT: 'JUDGECOMPLAINT',
    JUDGECOMPLAINT_REQUEST: 'JUDGECOMPLAINT_REQUEST',
    JUDGECOMPLAINT_ERROR: 'JUDGECOMPLAINT_ERROR',
    JUDGECOMPLAINT_SUCCESS: 'JUDGECOMPLAINT_SUCCESS',
    LAWYERCOMPLAINT: 'LAWYERCOMPLAINT',
    LAWYERCOMPLAINT_REQUEST: 'LAWYERCOMPLAINT_REQUEST',
    LAWYERCOMPLAINT_ERROR: 'LAWYERCOMPLAINT_ERROR',
    LAWYERCOMPLAINT_SUCCESS: 'JUDGECOMPLAINT_SUCCESS',
    EMERGENCYCONTACT: 'EMERGENCYCONTACT',
    EMERGENCYCONTACT_REQUEST: 'EMERGENCYCONTACT_REQUEST',
    EMERGENCYCONTACT_ERROR: 'EMERGENCYCONTACT_ERROR',
    EMERGENCYCONTACT_SUCCESS: 'EMERGENCYCONTACT_SUCCESS',
    VIDEOUPLOADDIRECT: 'VIDEOUPLOADDIRECT',
    VIDEOUPLOADDIRECT_REQUEST: 'VIDEOUPLOADDIRECT_REQUEST',
    VIDEOUPLOADDIRECT_ERROR: 'VIDEOUPLOADDIRECT_ERROR',
    VIDEOUPLOADDIRECT_SUCCESS: 'VIDEOUPLOADDIRECT_SUCCESS',
};

const UploadVideoRequest = () => ({
    type: TYPES.UPLOADVIDEO_REQUEST,
    payload: null,
});

const UploadVideoSuccess = () => ({
    type: TYPES.UPLOADVIDEO_SUCCESS,
    payload: null,
});

const UploadVideoError = (error) => ({
    type: TYPES.UPLOADVIDEO_ERROR,
    payload: { error },
});
const DirectVideoUploadRequest = () => ({
    type: TYPES.VIDEOUPLOADDIRECT_REQUEST,
    payload: null,
});

const DirectVideoUploadSuccess = () => ({
    type: TYPES.VIDEOUPLOADDIRECT_SUCCESS,
    payload: null,
});

const DirectVideoUploadError = (error) => ({
    type: TYPES.VIDEOUPLOADDIRECT_ERROR,
    payload: { error },
});


const EmergencyContactRequest = () => ({
    type: TYPES.EMERGENCYCONTACT_REQUEST,
    payload: null,
});

const EmergencyContactSuccess = () => ({
    type: TYPES.EMERGENCYCONTACT_SUCCESS,
    payload: null,
});

const EmergencyContactError = (error) => ({
    type: TYPES.EMERGENCYCONTACT_ERROR,
    payload: { error },
});
const JugeComplaintRequest = () => ({
    type: TYPES.JUDGECOMPLAINT_REQUEST,
    payload: null,
});

const JugeComplaintSuccess = () => ({
    type: TYPES.JUDGECOMPLAINT_SUCCESS,
    payload: null,
});

const JugeComplaintError = (error) => ({
    type: TYPES.JUDGECOMPLAINT_ERROR,
    payload: { error },
});
const LawyerComplaintRequest = () => ({
    type: TYPES.LAWYERCOMPLAINT_REQUEST,
    payload: null,
});

const LawyerComplaintSuccess = () => ({
    type: TYPES.LAWYERCOMPLAINT_SUCCESS,
    payload: null,
});

const LawyerComplaintError = (error) => ({
    type: TYPES.LAWYERCOMPLAINT_ERROR,
    payload: { error },
});


export const UplaodVideo = (body, callback, setUploadingPT) => async (dispatch) => {
    dispatch(UploadVideoRequest());
    try {
        const { endpoint, header } = EndPoints.uploadVideo
        const status = await Uploadfiles("POST", endpoint, body, header, setUploadingPT);
        const { res, error } = status
        console.log(status);
        if (res) {
            callback(res)
            dispatch(UploadVideoSuccess());
        } else {
            dispatch(UploadVideoError(error?.message));

        }
    } catch (error) {
        dispatch(UploadVideoError(error?.message));
    }
};
export const UplaodDirect = (type, body, callback, setUploadingPT) => async (dispatch) => {
    dispatch(DirectVideoUploadRequest());
    Toaster("Uploading Start...")
    try {
        const { endpoint, header } = EndPoints[type ? "uploadDirectVideo" : "uploadDirectAudio"]
        const status = await Uploadfiles("POST", endpoint, body, header, setUploadingPT);
        const { res, error } = status
        console.log(status);
        if (res) {
            callback({ res })
            Toaster(res.message)
            dispatch(DirectVideoUploadSuccess());
        } else {
            callback({ error })
            Toaster(error.message)
            dispatch(DirectVideoUploadError(error.message));

        }
        console.log('DirectUpload', { res });
    } catch (error) {
        callback({ error })
        dispatch(DirectVideoUploadError(error.message));
    }
};
export const CreateEmergencyContact = (body, callback) => async (dispatch) => {
    dispatch(EmergencyContactRequest());
    try {
        const { endpoint, header } = EndPoints.createEmergContact
        const status = await POST(endpoint, body, header);
        const { res, error } = status
        console.log(status);
        if (res) {
            callback(res)
            dispatch(EmergencyContactSuccess());
        } else {
            console.log(error);

            dispatch(EmergencyContactError(error.message));

        }
    } catch (error) {
        console.log(error);
        dispatch(EmergencyContactError(error.message));
    }
};
export const UpdateEmergencyContact = (body, callback) => async (dispatch) => {
    dispatch(EmergencyContactRequest());
    try {
        const { endpoint, header } = EndPoints.updateEmergContact
        const status = await PATCH(endpoint, body, header);
        const { res, error } = status
        console.log(status);
        if (res) {
            callback(res)
            dispatch(EmergencyContactSuccess());
        } else {
            console.log(error);
            dispatch(EmergencyContactError(error.message));

        }
    } catch (error) {
        console.log(error);

        dispatch(EmergencyContactError(error.message));
    }
};
export const createJudgeComplaint = (body, callback) => async (dispatch) => {
    dispatch(JugeComplaintRequest());
    try {
        const { endpoint, header } = EndPoints.createJudgeComplaint
        const status = await POST(endpoint, body, header);
        const { res, error } = status
        if (res) {
            callback(res)
            dispatch(JugeComplaintSuccess());
        } else {
            console.log(error);
            dispatch(JugeComplaintError(error.message));

        }
    } catch (error) {
        console.log(error);

        dispatch(JugeComplaintError(error.message));
    }
};
export const createLawyerComplaint = (body, callback) => async (dispatch) => {
    dispatch(LawyerComplaintRequest());
    try {
        const { endpoint, header } = EndPoints.createLawyerComplaint
        const status = await POST(endpoint, body, header);
        const { res, error } = status
        if (res) {
            callback(res)
            dispatch(LawyerComplaintSuccess());
        } else {
            console.log(error);
            dispatch(LawyerComplaintError(error.message));

        }
    } catch (error) {
        console.log(error);

        dispatch(LawyerComplaintError(error.message));
    }
};

export const ClearErrorUploadVideo = () => async (dispatch) => {
    dispatch(UploadVideoError(""));
    dispatch(EmergencyContactError(""));
    dispatch(JugeComplaintError(""));
    dispatch(LawyerComplaintError(""));


};

