import { EndPoints } from '@/utils/Axios/EndPoints';
import { DELETE, GET, PATCH, POST, Uploadfiles } from '@/utils/Axios/Axios';
import { Toaster } from '@/components/Toast';

export const TYPES = {
    VIDEOVIEW: 'VIDEOVIEW',
    VIDEOVIEW_REQUEST: 'VIDEOVIEW_REQUEST',
    VIDEOVIEW_ERROR: 'VIDEOVIEW_ERROR',
    VIDEOVIEW_SUCCESS: 'VIDEOVIEW_SUCCESS',
    VIDEOCOMMENTS: 'VIDEOCOMMENTS',
    VIDEOCOMMENTS_REQUEST: 'VIDEOCOMMENTS_REQUEST',
    VIDEOCOMMENTS_ERROR: 'VIDEOCOMMENTS_ERROR',
    VIDEOCOMMENTS_SUCCESS: 'VIDEOCOMMENTS_SUCCESS',
    DELETEVIDEO: 'DELETEVIDEO',
    DELETEVIDEO_REQUEST: 'DELETEVIDEO_REQUEST',
    DELETEVIDEO_ERROR: 'DELETEVIDEO_ERROR',
    DELETEVIDEO_SUCCESS: 'DELETEVIDEO_SUCCESS',
};

const VideoViewRequest = () => ({
    type: TYPES.VIDEOVIEW_REQUEST,
    payload: null,
});

const VideoViewSuccess = () => ({
    type: TYPES.VIDEOVIEW_SUCCESS,
    payload: null,
});

const VideoViewError = (error) => ({
    type: TYPES.VIDEOVIEW_ERROR,
    payload: { error },
});
const VideoCommentsRequest = () => ({
    type: TYPES.VIDEOCOMMENTS_REQUEST,
    payload: null,
});

const VideoCommentsSuccess = () => ({
    type: TYPES.VIDEOCOMMENTS_SUCCESS,
    payload: null,
});

const VideoCommentsError = (error) => ({
    type: TYPES.VIDEOCOMMENTS_ERROR,
    payload: { error },
});
const DeleteVideoRequest = () => ({
    type: TYPES.DELETEVIDEO_REQUEST,
    payload: null,
});

const DeleteVideoSuccess = () => ({
    type: TYPES.DELETEVIDEO_SUCCESS,
    payload: null,
});

const DeleteVideoError = (error) => ({
    type: TYPES.DELETEVIDEO_ERROR,
    payload: { error },
});

export const VideoView = (id) => async (dispatch) => {
    dispatch(VideoViewRequest());
    try {
        const { endpoint, header } = EndPoints.viewCountUpdate

        const status = await GET(endpoint, header, { id });
        const { res, error } = status
        // console.log(status);
        if (error) dispatch(VideoViewError(error?.message));
        else dispatch(VideoViewSuccess());
    } catch (error) {
        dispatch(VideoViewError([error.toString()]));
    }
};
export const GetVideoComments = (vid, setVideoComments) => async (dispatch) => {
    dispatch(VideoCommentsRequest());
    try {
        const { endpoint, header } = EndPoints.getVideoComments

        const status = await GET(endpoint, header, { vid });
        const { res, error } = status
        // console.log(status);
        if (error) dispatch(VideoCommentsError(error?.message));
        else {
            dispatch(VideoCommentsSuccess());
            //  console.log(res.data);
            setVideoComments(res?.data?.comments)
        }
    } catch (error) {
        dispatch(VideoCommentsError([error.toString()]));
    }
};
export const PostVideoComments = (data, callBack) => async (dispatch) => {
    dispatch(VideoCommentsRequest());
    try {
        const { endpoint, header } = EndPoints.createComment

        const status = await POST(endpoint, data, header);
        const { res, error } = status
        // console.log(status);
        if (error) dispatch(VideoCommentsError(error?.message));
        else {
            dispatch(VideoCommentsSuccess());
            //  console.log(res.data);
            callBack(res?.data)
        }
    } catch (error) {
        dispatch(VideoCommentsError([error.toString()]));
    }
};
export const DeleteVideo = (vid, callBack) => async (dispatch) => {
    dispatch(DeleteVideoRequest());
    try {
        const { endpoint, header } = EndPoints.deleteVideo

        const status = await DELETE(endpoint, header, { vid });
        const { res, error } = status
        // console.log(status);
        if (error) {
            dispatch(DeleteVideoError(error?.message));
        }
        else {
            dispatch(DeleteVideoSuccess());
            console.log({ res: res.data },'dsfdg');
            callBack(res?.data)
        }
    } catch (error) {
        dispatch(DeleteVideoError([error.toString()]));
    }
};

export const ClearErrorVideo = () => async (dispatch) => {
    dispatch(VideoViewError(""));
    dispatch(VideoCommentsError(""));
};

