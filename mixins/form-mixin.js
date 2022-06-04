import {isEmpty, isEqual, omit, pick} from 'lodash';

export default {
    data() {
        return {
            isLoading: false,
            apiValidationErrors: {}
        };
    },
    methods: {
        /* extract API server validation errors and assigns them to local mixin data */
        setApiValidation(serverErrors, refs = null) {
            serverErrors = Object.entries(serverErrors)
            this.apiValidationErrors = serverErrors.reduce(
                (accumulator, errorObject) => {
                    if (typeof errorObject[1].length === 0)
                        return false;

                    const errorFieldName = errorObject[0];
                    const errorDetail = errorObject[1];
                    return {
                        ...accumulator,
                        [errorFieldName]: errorDetail
                    };
                },
                {}
            );
        },

        unsetApiValidationErrors() {
            this.apiValidationErrors = {}
        }
    }
};
