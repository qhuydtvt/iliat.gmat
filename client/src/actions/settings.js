export const AXIOS_CONFIGS = {
    validateStatus: function (status) {
        return status < 500;
    },
    withCredentials: true
};